CREATE TABLE children 
(
    idChild INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    age INT NOT NULL
);

CREATE TABLE sessionsexercises 
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    childId INT NOT NULL,
    operationType VARCHAR(15) NOT NULL,
    totalScore INT NOT NULL,
    score FLOAT NOT NULL,
    sessionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (childId) REFERENCES children(idChild)
);


