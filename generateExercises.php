<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MathApplication</title>
    <link rel="stylesheet" href="./style/style.css">
</head>
<body>
    <main>
    
    <?php 
        include './annexes/headerConnecter.html'; 
    ?>

    <div id="welcomeUserMsg"></div>

    <div class="container">
        <h3>Choisi une opération à réaliser :</h3>
        <form id="exerciceForm" method="POST">
            <div class="operationList">
                <input type="radio" name="operationListItem" id="addition" value="addition">
                <label for="addition">Addition (+)</label>

                <input type="radio" name="operationListItem" id="soustraction" value="soustraction">
                <label for="soustraction">Soustraction (-)</label>

                <input type="radio" name="operationListItem" id="multiplication" value="multiplication">
                <label for="multiplication">Multiplication (x)</label>

                <input type="radio" name="operationListItem" id="division" value="division">
                <label for="division">Division (/)</label>

                <div id="errorOperationListItem" class="errorOperationListItem"></div>
            </div>

            <div class="number-input">
                <h3>Sur combien veux-tu que ton test soit ?</h3>
                <input type="number" name="totalScore" value="20" min="5" max="100" id="totalScore">
                <div id="errorTotalScore" class="errorTotalScore"></div>
            </div>

            <button type="submit" class="submit" id="submit">➔</button>
        </form>

        <form id="quiz-section" class="quiz-section" style="display:none;">
            <h2>Quiz</h2>
            
            <div class="quiz-content">
                <div id="questions-list" class="questions-list"></div>
                <div id="answers" class="answers"></div>
            </div>

            <button id="submit-quiz" type="button">Soumettre</button>
        </form>
       
        <div id="errorGenerateExercices" class="error"></div>
    </main>

    <?php 
        include './annexes/footer.html'; 
    ?>
    <script src="./scripts/generateExercises.js"></script>
</body>
</html>