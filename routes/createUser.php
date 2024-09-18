<?php

include 'dbConfig.php';

function Securite($donnees1)
{
    $donnees1 = trim($donnees1); // Permet de supprimer des caractères inutiles (espaces, retours à la ligne, etc.)
    $donnees1 = stripcslashes($donnees1); // Permet de supprimer des caractères inutiles (guillemets, slaches, etc.)
    $donnees1 = strip_tags($donnees1); // Permet d'éviter le traitement et l'affichage des caractères HTML

    return $donnees1;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
    $data = json_decode(file_get_contents("php://input"), true);

    $lastName = Securite($data['lastName']);
    $firstName = Securite($data['firstName']);
    $age = Securite($data['age']);

    $checkSql = "SELECT * FROM children WHERE lastName = '$lastName' AND firstName = '$firstName'";
    $checkResult = mysqli_query($connexion, $checkSql);

    if (mysqli_num_rows($checkResult) > 0) 
    {
        // Réponse si le nom de famille existe déjà
        echo json_encode
        ([
            "status" => "error", 
            "message" => "Ce compte existe déjà..."
        ]);
    } 
    else 
    {
        // Créer la requête SQL pour insérer les données
        $sql = "INSERT INTO children (lastName,firstName,age) VALUES ('$lastName','$firstName','$age')";

        // Exécuter la requête SQL 
        $result = mysqli_query($connexion, $sql);

        if ($result) 
        {
            echo json_encode([
                "status" => "success", 
                "message" => "Ton compte a bien été créé !",
                "redirect" => "generateExercises.php"
            ]);
        } 
        else 
        {
            echo json_encode([
                "status" => "error", 
                "message" => "Erreur : " . $sql . " " . $connexion->error
            ]);
        }
    }

    mysqli_close($connexion);
    exit();
}

?>
