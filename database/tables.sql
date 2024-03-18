CREATE TABLE books (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40) NOT NULL, 
    author VARCHAR(40),
    state VARCHAR(10) NOT NULL,  
    image VARCHAR(150), 
    notes TEXT,  
    pages INT,
    owner VARCHAR(100)
);        