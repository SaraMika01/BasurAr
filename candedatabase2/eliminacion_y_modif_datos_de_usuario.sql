CREATE DATABASE IF NOT EXISTS eliminacion_y_modif_datos_de_usuario;
USE eliminacion_y_modif_datos_de_usuario;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    edad INT,
    ciudad VARCHAR(100),
    telefono VARCHAR(30),
    direccion VARCHAR(200)
);

INSERT INTO usuarios (nombre,email,password,edad,ciudad)
VALUES ('juancito', 'juan@gmail.com','hoola', 84,'liceo');

INSERT INTO usuarios (nombre,email,password,edad,ciudad)
VALUES ('bianca', 'bianca@gmail.com', 'caracol', 23, 'alem');

UPDATE usuarios SET ciudad = NULL WHERE email = 'bianca@gmail.com';
DELETE FROM usuarios WHERE email = 'bianca@gmail.com';

UPDATE usuarios SET ciudad = 'Río Cuarto' WHERE email = 'juan@gmail.com';
UPDATE usuarios SET nombre = 'Juan Nuñez', edad = 33 WHERE email = 'juan@gmail.com';
