document.getElementById('form_login').addEventListener('submit', async (event) => 
{
    event.preventDefault();

    // Récupération des valeurs
    const lastName = document.getElementById("lastNameSignIn").value.trim();
    const firstName = document.getElementById("firstNameSignIn").value.trim();

    const errorLastNameSignIn = document.getElementById("errorLastNameSignIn");
    const errorFirstNameSignIn = document.getElementById("errorFirstNameSignIn");
    const errorUserSignedIn = document.getElementById("errorUserSignedIn");

    let isValid = true

    //Réinitialisation des messages d'erreurs
    errorLastNameSignIn.innerHTML = "";
    errorFirstNameSignIn.innerHTML = "";
    errorUserSignedIn.innerHTML = "";

    // Validation des données
    if (!lastName) 
    {
        errorLastNameSignIn.innerHTML = "N'oublie pas d'entrer ton nom de famille !";
        isValid = false;
    }
        
    if (!firstName) 
    {
        errorFirstNameSignIn.innerHTML = "N'oublie pas d'entrer ton prénom !";
        isValid = false;
    }
    
    if(!isValid)
    {
        return;
    }
    
    // Fonction pour log in un utilisateur
    async function logInUser(url, donnees) 
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
            errorUserSignedIn.innerHTML = 'Erreur de réseau:' + error;
        }
    }

    try 
    {
        const data = await logInUser("http://localhost/Projet_final/routes/loginUser.php", 
        {
            lastName: lastName,
            firstName: firstName
        });

        if (data.status === "success") 
        {
            sessionStorage.setItem('firstName', firstName);
            sessionStorage.setItem('lastName', lastName);

            window.location.href = data.redirect;
        } 
        else if (data.status === "error") 
        {
            errorUserSignedIn.innerHTML = 'Erreur: ' + data.message;
        }
    } 
    catch (error) 
    {
        errorUserSignedIn.innerHTML = 'Erreur: ' + error.message;
    }
});

console.log("Test")