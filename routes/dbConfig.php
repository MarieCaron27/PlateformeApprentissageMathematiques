<?php

    $host = 'localhost';
    $dbName = 'mathApplication';
    $user = 'root';
    $password = '';

    $connexion = mysqli_connect($host,$user,$password,$dbName);
        
    if(!$connexion)
    {
        die("Nous n'arrivons pas à vous connecter à la base de donéees...");
    }

?>