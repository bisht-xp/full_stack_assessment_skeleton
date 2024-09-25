-- Step 1: Create the 'user' table
CREATE TABLE IF NOT EXISTS `user` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Step 2: Create the 'home' table
CREATE TABLE IF NOT EXISTS `home` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    street_address VARCHAR(255) UNIQUE NOT NULL,
    city VARCHAR(255) NOT NULL,  
    state VARCHAR(255) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,  
    price DECIMAL(10, 2) NOT NULL,  
    num_bedrooms INT NOT NULL,  
    num_bathrooms INT NOT NULL  
);

-- Step 3: Create a junction table for the many-to-many relationship
CREATE TABLE IF NOT EXISTS home_users (
    user_id INT,
    home_id INT,
    PRIMARY KEY (user_id, home_id),
    FOREIGN KEY (user_id) REFERENCES `user`(id),
    FOREIGN KEY (home_id) REFERENCES `home`(id)
);

-- Step 4: Insert unique data into the 'user' table
INSERT IGNORE INTO `user` (username, email)
SELECT DISTINCT username, email
FROM home_db.user_home;

-- Step 5: Insert data into the 'home' table
INSERT INTO home (street_address, city, state, zip_code, price, num_bedrooms, num_bathrooms)
SELECT DISTINCT street_address, '' AS city, state, zip, list_price, beds, baths  
FROM home_db.user_home;

-- Step 6: Insert data into the junction table
INSERT INTO home_users (user_id, home_id)
SELECT u.id, h.id
FROM home_db.user_home uh
JOIN `user` u ON uh.username = u.username
JOIN home h ON uh.street_address = h.street_address;

-- Step 7: Drop the original table
DROP TABLE IF EXISTS home_db.user_home;