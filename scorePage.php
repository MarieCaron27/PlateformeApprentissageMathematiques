<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mesScores</title>
    <link rel="stylesheet" href="./style/style.css">
</head>
<body>
    <?php
        include './annexes/headerConnecter.html';
    ?>

    <h1>Les 10 meilleurs scores</h1>

    <div id="mesScores" class="mesScores">
        <table>
            <thead>
                <tr>
                    <th>Prénom</th>
                    <th>Score</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody id="scoresBody"></tbody>
        </table>
    </div>

    <div id="errorScorePage"></div>

    <?php
        include './annexes/footer.html';
    ?>

    <script src="./scripts/scorePageProcess.js"></script>
</body>
</html>
