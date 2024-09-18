window.addEventListener('load', function() 
{
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');

    if (error === 'account_required') 
    {
        // Affiche le message d'erreur
        const errorUserCreated = document.getElementById('errorUserCreated');
        errorUserCreated.innerHTML = "Tu dois te créer un compte pour accéder à cette page.";
    }
});

document.getElementById('form_sign_up').addEventListener('submit', async (event) => 
{
    event.preventDefault();

    let isValid = true;

    const lastName = document.getElementById("lastNameSignUp").value.trim();
    const firstName = document.getElementById("firstNameSignUp").value.trim();
    const age = parseInt(document.getElementById("ageSignUp").value.trim(), 10);

    const errorLastName = document.getElementById("errorLastNameSignUp");
    const errorFirstName = document.getElementById("errorFirstNameSignUp");
    const errorAge = document.getElementById("errorAgeSignUp");
    const errorUserCreated = document.getElementById("errorUserCreated");
    
    const nameRegex = /^[A-Za-zÀ-ÿçÇ -]+$/;

    errorLastName.innerHTML = '';
    errorFirstName.innerHTML = '';
    errorAge.innerHTML = '';
    errorUserCreated.innerHTML = '';

    if (!lastName) 
    {
        errorLastName.innerHTML = "N'oublies pas d'entrer ton nom de famille !";
        isValid = false;
    } 
    else if (!nameRegex.test(lastName)) 
    {
        errorLastName.innerHTML = "Vérifies que tu as bien écrit ton nom de famille...";
        isValid = false;
    }

    if (!firstName) 
    {
        errorFirstName.innerHTML = "N'oublies pas d'entrer ton prénom !";
        isValid = false;
    } 
    else if (!nameRegex.test(firstName)) 
    {
        errorFirstName.innerHTML = "Vérifies que tu as bien écrit ton prénom...";
        isValid = false;
    }

    if (!age || isNaN(age))
    {
        errorAge.innerHTML = "N'oublies pas d'entrer ton âge !";
        isValid = false;
    } 
    else if (age < 6 || age > 8) 
    {
        errorAge.innerHTML = "Vérifies que tu as bien entre 6 et 8 ans avant de t'inscrire...";
        isValid = false;
    }

    if (!isValid) 
    {
        return;
    }
    
    // Fonction pour ajouter un utilisateur
    async function addUser(url, donnees) 
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

            // Assurez-vous que la réponse est bien au format JSON
            const data = await response.json();
            console.log("Réponse de l'API:", data);
            return data;
        } 
        catch (error) 
        {
            console.error('Erreur de réseau:', error);
            throw error;
        }
    }

    // Appel à la fonction addUser
    try 
    {
        const data = await addUser("http://localhost/Projet_final/routes/createUser.php", 
        {
            lastName: lastName,
            firstName: firstName,
            age: age
        });

        if (data.status === "success")
        {
            sessionStorage.setItem('lastName', lastName); // Stockage des données dans le Session Storage
            sessionStorage.setItem('firstName', firstName); // Stockage des données dans le Session Storage
            window.location.href = data.redirect; // Redirection de l'utilisateur
        } 
        else 
        {
            errorUserCreated.innerHTML = 'Erreur: ' + data.message; // Affiche le message d'erreur
        }
    } 
    catch (error) 
    {
        errorUserCreated.innerHTML = 'Erreur: ' + error.message; // Affiche les erreurs réseau
    }
});
