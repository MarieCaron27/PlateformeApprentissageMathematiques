window.addEventListener('load', (event) => 
{
    event.preventDefault();

    const lastName = sessionStorage.getItem('lastName');
    const firstName = sessionStorage.getItem('firstName');
    
    if(lastName && firstName)
    {
        const scoresBody = document.getElementById("scoresBody");

        const errorScorePage = document.getElementById("errorScorePage");
            
        // Réinitialisation des messages d'erreur 
        errorScorePage.innerHTML = "";

        // Fonction pour générer les scores de l'utilisateur
        async function generateScores(url, donnees) 
        {
            try 
            {
                const response = await fetch(url, 
                {
                    method: "POST",
                    headers: 
                    { 
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify(donnees),
                });
                const data = await response.json();
                return data;
            } 
            catch (error) 
            {
                errorScorePage.innerHTML = 'Erreur de réseau:' + error;
            }
        }

        try 
        {
            generateScores("http://localhost/Projet_final/routes/scorePageProcess.php", 
            {
                lastName: lastName,
                firstName: firstName
            })
            .then(data => 
            {
                if (data.status === "success") 
                {
                    if (data.status === "success") 
                    {
                        scoresBody.innerHTML = '';
    
                        data.scores.forEach(score => 
                        {
                            const tr = document.createElement("tr");
    
                            const tdName = document.createElement("td");
                            tdName.innerHTML = score.firstName;
    
                            const tdScore = document.createElement("td");
                            tdScore.innerHTML = score.score;
    
                            const tdDate = document.createElement("td");
                            tdDate.innerHTML = formatDateTime(score.sessionDate);
    
                            // Ajouter les cellules à la ligne
                            tr.appendChild(tdName);
                            tr.appendChild(tdScore);
                            tr.appendChild(tdDate);
    
                            // Ajouter la ligne au tableau
                            scoresBody.appendChild(tr);
                        });
                    }
                }
                else if (data.status === "error") 
                {
                    errorScorePage.innerHTML = 'Erreur: ' + data.message;
                }
            })
            .catch(error => 
            {
                errorScorePage.innerHTML = 'Erreur: ' + error.message;
            });
                
        } 
        catch (error) 
        {
            errorScorePage.innerHTML = 'Erreur: ' + error.message;
        }

        function formatDateTime(dateString) 
        {
            const date = new Date(dateString);
        
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
        
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        }
    }
    else 
    {
        window.location.href = "index.php?error=account_required";
    }
});
    