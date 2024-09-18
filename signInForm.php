<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style/style.css">
    <title>Connexion</title>
</head>

<body>
    
    <?php
        include './annexes/header.html';
    ?>

    <main>
        <section class="connexion">
            <article id="connexion">
                <form class="form_login" id="form_login" method="POST">
                    <h3>Connexion</h3>

                    <div class="form_login">
                        <label for="lastNameSignIn">Entre ton nom de famille</label>
                        <input type="text" id="lastNameSignIn" name="lastNameSignIn">

                        <div id="errorLastNameSignIn" name="errorLastNameSignIn"></div>
                    </div>

                    <div class="form_login">
                        <label for="firstNameSignIn">Entre ton prénom</label>
                        <input type="text" id="firstNameSignIn" name="firstNameSignIn">

                        <div id="errorFirstNameSignIn" name="errorFirstNameSignIn"></div>
                    </div>

                    <div class="form_login">
                        <input type="submit" value="Valider">
                    </div>
                    
                    <div class="form_login">                        
                        <div id="errorUserSignedIn" name="errorUserSignedIn"></div>
                    </div>

                    <div class="form_login">
                        <p class="link">Tu n'as pas encore de compte ?</p>
                        <a href="index.php" id="test">Clique ici pour pouvoir t'en créer un...</a>
                    </div>
                </form>
            </article>
        </section>
    </main>
    
    <?php
        include './annexes/footer.html';
    ?>

    <script src="./scripts/signInFormProcess.js"></script>
    <script>
        console.log("Ok");

        document.getElementById("test").addEventListener('click',(event) =>
    {
        event.preventDefault()
        console.log("Bienvenue")
    })

    </script>
</body>
</html>