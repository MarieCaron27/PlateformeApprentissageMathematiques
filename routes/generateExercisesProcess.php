<?php
    include 'dbConfig.php';

    function Securite($donnees1) 
    {
        $donnees1 = trim($donnees1);
        $donnees1 = stripcslashes($donnees1);
        $donnees1 = strip_tags($donnees1);
        
        return $donnees1;
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $firstName = Securite($data['firstName']);
        $lastName = Securite($data['lastName']);
        $operationListItem = Securite($data['operationListItem']);
        $totalScore = Securite($data['totalScore']);
        $score = Securite($data['score']);

        $idChildQuery = "SELECT idChild FROM children WHERE firstName = '$firstName' AND lastName = '$lastName';";
        $idChildResult = mysqli_query($connexion, $idChildQuery);

        if (mysqli_num_rows($idChildResult) > 0) 
        {
            $idChildRow = mysqli_fetch_assoc($idChildResult);
            $idChild = $idChildRow['idChild'];
        } 
        else 
        {
            echo json_encode([
                "status" => "error",
                "message" => "Enfant non trouvé dans la base de données."
            ]);
            exit();
        }

        $sql = "INSERT INTO sessionsexercises(childId, operationType, totalScore, score) VALUES ('$idChild', '$operationListItem', '$totalScore', '$score')";

        if ($result = mysqli_query($connexion, $sql)) 
        {
            echo json_encode([
                "status" => "success",
                "message" => "Ton exercice a bien été pris en compte.",
                "redirect" => "scorePage.php"
            ]);
        } 
        else 
        {
            echo json_encode([
                "status" => "error",
                "message" => "Erreur : " . mysqli_error($connexion)
            ]);
        }

    } 
    else
    {
        echo json_encode([
            "status" => "error",
            "message" => "Méthode non autorisée"
        ]);
    }
?>
