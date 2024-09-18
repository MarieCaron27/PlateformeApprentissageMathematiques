window.addEventListener('load', () => 
{
    const lastName = sessionStorage.getItem('lastName');
    const firstName = sessionStorage.getItem('firstName');
    const welcomeUserMsg = document.getElementById("welcomeUserMsg");

    if (lastName && firstName) 
    {
        welcomeUserMsg.innerHTML = "Bienvenue" + "&nbsp;" + firstName + "&nbsp;" + lastName;

        document.getElementById('exerciceForm').addEventListener('submit', async (event) => 
        {
            event.preventDefault();

            let isValid = true;
            const operationListItem = document.querySelector('input[name="operationListItem"]:checked');
            const totalScore = parseInt(document.getElementById("totalScore").value.trim(), 10);
            const quizSection = document.getElementById('quiz-section');
            
            const errorOperationListItem = document.getElementById("errorOperationListItem");
            const errorTotalScore = document.getElementById("errorTotalScore");
            const errorGenerateExercices = document.getElementById("errorGenerateExercices");

            // Réinitialisation des messages d'erreur 
            errorOperationListItem.innerHTML = "";
            errorTotalScore.innerHTML = "";
            errorGenerateExercices.innerHTML = "";

            if (!operationListItem) 
            {
                errorOperationListItem.innerHTML = "Tu n'as pas sélectionné d'opérateur...";
                isValid = false;
            }

            if (!totalScore) 
            {
                errorTotalScore.innerHTML = "N'oublies pas de sélectionner ton score final...";
                isValid = false;
            }

            if (!isValid) 
            {
                return;
            }

            // Afficher la section quiz
            quizSection.style.display = 'flex';

            // Générer le quiz
            generateQuiz(operationListItem.value);

            const answers = document.getElementById('answers');
            answers.addEventListener('dragstart', (event) => 
            {
                event.dataTransfer.setData('text/plain', event.target.id);
            });

            const questionsList = document.getElementById('questions-list');
            questionsList.addEventListener('dragover', (event) => 
            {
                event.preventDefault();
            });

            questionsList.addEventListener('drop', (event) => 
            {
                event.preventDefault();
                const id = event.dataTransfer.getData('text/plain');
                const draggedElement = document.getElementById(id);

                if (event.target.tagName === 'INPUT' && event.target.type === 'text') 
                {
                    event.target.value = draggedElement.textContent;
                }
            });

            document.getElementById('submit-quiz').addEventListener('click', async () => 
            {
                let scoreToGo = calculateScore(totalScore);
                
                try 
                {
                    const response = await fetch("http://localhost/Projet_final/routes/generateExercisesProcess.php", {
                        method: "POST",
                        headers: 
                        {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify
                        ({
                            lastName: lastName,
                            firstName: firstName,
                            operationListItem: operationListItem.value,
                            totalScore: totalScore,
                            score: scoreToGo
                        })
                    });
            
                    const data = await response.json();
                    
                    if (data.status === "success") 
                    {
                        window.location.href = data.redirect;
                    } 
                    else 
                    {
                        errorGenerateExercices.innerHTML = 'Erreur: ' + data.message;
                    }
                } 
                catch (error) 
                {
                    errorGenerateExercices.innerHTML = 'Erreur: ' + error.message;
                }
            });
        });

        function generateQuiz(operation) 
        {
            const questionsDiv = document.getElementById('questions-list');
            const answersDiv = document.getElementById('answers');
            
            questionsDiv.innerHTML = "";
            answersDiv.innerHTML = "";
        
            let questions = [];
            let answers = [];
        
            for (let i = 0; i < 10; i++) 
            {
                let num1 = Math.floor(Math.random() * 50) + 1;
                let num2 = Math.floor(Math.random() * 50) + 1;
                let questionText = "";
                let correctAnswer = 0;
        
                switch (operation) 
                {
                    case 'addition':
                        questionText = `${num1} + ${num2}`;
                        correctAnswer = num1 + num2;
                        break;
        
                    case 'soustraction':
                        if (num1 > num2) 
                        {
                            questionText = `${num1} - ${num2}`;
                            correctAnswer = num1 - num2;
                        } 
                        else 
                        {
                            questionText = `${num2} - ${num1}`;
                            correctAnswer = num2 - num1;
                        }
                        break;
        
                    case 'multiplication':
                        questionText = `${num1} * ${num2}`;
                        correctAnswer = num1 * num2;
                        break;
        
                    case 'division':
                        if (num1 > num2) 
                        {
                            questionText = `${num1} / ${num2}`;
                            correctAnswer = (num1 / num2).toFixed(2);
                        } 
                        else 
                        {
                            questionText = `${num2} / ${num1}`;
                            correctAnswer = (num2 / num1).toFixed(2);
                        }
                        break;
                }
        
                questions.push({ questionText: questionText, correctAnswer: parseFloat(correctAnswer) });
                answers.push(parseFloat(correctAnswer));
        
                const questionElem = document.createElement('div');
                questionElem.className = 'question';
                questionElem.innerHTML = `
                    <p>${questionText} = ?</p>
                    <div class="dropzone" data-answer="${correctAnswer}" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
                    <input type="text" class="input-answer" placeholder="Fais glisser ta réponse ici" />`;
                questionsDiv.appendChild(questionElem);
        
            }
        
            // Mélanger les réponses avant de les afficher
            answers = shuffleArray(answers);
        
            // Générer des éléments de réponse draggables
            answers.forEach((answer, index) => 
            {
                const answerElem = document.createElement('div');
                answerElem.className = 'answer draggable';
                answerElem.setAttribute('draggable', 'true');
                answerElem.id = 'answer-' + index; // Assign unique ID
                answerElem.textContent = answer;
                answerElem.addEventListener('dragstart', dragStart);
                answersDiv.appendChild(answerElem);
            });
        }
        
        function dragStart(event) 
        {
            event.dataTransfer.setData('text/plain', event.target.id);
        }
        
        function shuffleArray(array) 
        {
            for (let i = array.length - 1; i > 0; i--) 
            {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            
            return array;
        }

        function calculateScore(totalScore) 
        {
            let score = 0;
            const questions = Array.from(document.querySelectorAll('.question'));
            const maxPointsPerQuestion = totalScore / 10;
        
            questions.forEach((questionElem) => 
            {
                const userAnswerElem = questionElem.querySelector('input');
                const userAnswer = parseFloat(userAnswerElem.value.trim());
                const correctAnswerElem = questionElem.querySelector('.dropzone');
                const correctAnswer = parseFloat(correctAnswerElem.getAttribute('data-answer').trim());
        
                if (userAnswer === correctAnswer) 
                {
                    score += maxPointsPerQuestion;
                }
            });
        
            return score;
        }        
    } 
    else 
    {
        window.location.href = "index.php?error=account_required";
    }
});
