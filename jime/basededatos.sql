CREATE DATABASE registro_usuarios;
USE registro_usuarios;

CREATE TABLE usuarios (
   id INT AUTO_INCREMENT PRIMARY KEY,
   nombre VARCHAR(100),
   email VARCHAR(100) UNIQUE,
   Password VARCHAR(100),
   edad INT,
   ciudad VARCHAR(100)
);

insert into usuarios (nombre,email,password,edad,ciudad) values ('juancito', 'juan@gmail.com','hoola', 84,'liceo' );
insert  into usuarios (nombre,email,password,edad,ciudad) values ('bianca', 'bianca@gmail.com' , 'caracol', 23, 'alem' );

UPDATE usuarios SET ciudad = NULL WHERE email = 'bianca@gmail.com';
DELETE FROM usuarios WHERE email = 'bianca@gmail.com';

UPDATE usuarios SET ciudad = 'Río Cuarto' WHERE email = 'juan@gmail.com';
UPDATE usuarios SET nombre = 'Juan Nuñez', edad = 33 WHERE email = 'juan@gmail.com';