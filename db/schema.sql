CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers 
(
    id INT NOT NULL AUTO_INCREMENT,
    burger_name varchar(75) NOT NULL,
    devoured BOOLEAN NOT NULL DEFAULT 0,
    primary key(id)
);