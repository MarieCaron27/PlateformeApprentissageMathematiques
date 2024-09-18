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

        $sql = "SELECT children.firstName, sessionsExercises.score, sessionsExercises.sessionDate 
            FROM sessionsExercises 
            INNER JOIN children ON (children.idChild = sessionsExercises.childId)
            ORDER BY sessionsExercises.score DESC 
            LIMIT 10";

        $result = mysqli_query($connexion, $sql);

        if (mysqli_num_rows($result) > 0) 
        {
            $scores = [];
            while ($row = mysqli_fetch_assoc($result)) 
            {
                $scores[] = $row;
            }

            echo json_encode([
                "status" => "success",
                "scores" => $scores
            ]);
        } 
        else 
        {
            echo json_encode([
                "status" => "error",
                "message" => "Aucun résultat trouvé..."
            ]);
        }

        mysqli_close($connexion);
        exit();
    }
?>