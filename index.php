<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style/style.css">
    <title>signUpForm</title>
</head>

<body>
    
    <?php
        include './annexes/header.html';
    ?>

    <main>
        <section class="inscription">
            <article id="inscription">
                <form class="form_sign_up" id="form_sign_up" method="POST">
                    <h3>Inscription</h3>

                    <div class="form_sign_up" >
                        <label for="lastNameSignUp">Entre ton nom de famille</label>
                        <input type="text" id="lastNameSignUp" name="lastNameSignUp">
                        
                        <div id="errorLastNameSignUp"></div>
                    </div>

                    <div class="form_sign_up" >
                        <label for="firstNameSignUp">Entre ton prénom</label>
                        <input type="text" id="firstNameSignUp" name="firstNameSignUp">
                        
                        <div id="errorFirstNameSignUp"></div>
                    </div>

                    <div class="form_sign_up">
                        <label for="ageSignUp">Entre ton âge</label>
                        <input type="number" min="6" max="8" id="ageSignUp" name="ageSignUp">
                        
                        <div id="errorAgeSignUp"></div>
                    </div>

                    <div class="form_sign_up">
                        <input type="submit" value="Valider">
                    </div>
                    
                    <div class="form_sign_up">                        
                        <div id="errorUserCreated"></div>
                    </div>

                    <div class="form_sign_up" >
                        <p class="link">Tu as déjà un compte ?</p>
                        <a href="signInForm.php">Clique ici pour pouvoir accéder à ton compte...</a>
                    </div>
                </form>
            </article>
        </section>
    </main>

    <?php
        include './annexes/footer.html';
    ?>

    <script src="./scripts/signUpFormProcess.js"></script>
</body>
</html>