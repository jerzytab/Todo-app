CREATE DATABASE myAppDB;

USE myAppDB;

CREATE TABLE Users (
                       ID INT AUTO_INCREMENT PRIMARY KEY,
                       FirstName VARCHAR(255),
                       LastName VARCHAR(255),
                       Email VARCHAR(255) UNIQUE,
                       Password VARCHAR(255)
);

CREATE TABLE Tasks (
                       ID INT AUTO_INCREMENT PRIMARY KEY,
                       Title VARCHAR(255),
                       Description TEXT,
                       CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       DueDate DATE,
                       Status ENUM('TO_DO', 'IN_PROGRESS', 'DONE') DEFAULT 'TO_DO',
                       UserID INT,
                       FOREIGN KEY (UserID) REFERENCES Users(ID)
);
