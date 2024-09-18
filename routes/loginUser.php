<?php
include 'dbConfig.php';

function Securite($donnees1) 
{
    $donnees1 = trim($donnees1); // Supprimer les espaces inutiles
    $donnees1 = stripcslashes($donnees1); // Supprimer les barres obliques
    $donnees1 = strip_tags($donnees1); // Supprimer les balises HTML
    
    return $donnees1;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
    $data = json_decode(file_get_contents("php://input"), true);

    $lastName = Securite($data['lastName']);
    $firstName = Securite($data['firstName']);

    // Vérifie les colonnes et la requête SQL
    $sql = "SELECT * FROM children WHERE lastName = '$lastName' AND firstName = '$firstName'";
    $result = mysqli_query($connexion, $sql);

    if (!$result) 
    {
        echo json_encode([
            "status" => "error",
            "message" => "Erreur SQL: " . mysqli_error($connexion)
        ]);
        exit();
    }

    if (mysqli_num_rows($result) === 1) 
    {
        echo json_encode([
            "status" => "success",
            "message" => "Vous allez être redirigé(e)",
            "redirect" => "generateExercises.php"
        ]);
    } 
    else 
    {
        echo json_encode([
            "status" => "error",
            "message" => "Utilisateur non trouvé."
        ]);
    }

    mysqli_close($connexion);
    exit();
}

?>