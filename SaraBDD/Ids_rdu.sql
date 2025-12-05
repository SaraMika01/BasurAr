CREATE DATABASE Registro_Usuarios;
USE Registro_Usuarios;

CREATE TABLE Usuarios (   
	ID INT AUTO_INCREMENT PRIMARY KEY,   
    Nombre VARCHAR(100),   
    Email VARCHAR(100) UNIQUE,   
    Password VARCHAR(100),   
    Edad INT,   
    Ciudad VARCHAR(100));
    
insert into usuarios (nombre,email,password,edad,ciudad) values ('juancito', 'juan@gmail.com','hoola', 84,'lice' );
insert into usuarios (nombre,email,password,edad,ciudad) values ('bianca', 'bianca@gmail.com' , 'caracol', 23, 'alem' );
insert into usuarios (nombre,email,password,edad,ciudad) values ('pedro', 'pedrohernandes@gmail.com' , 'pancho', 45, 'córdoba capital');
insert into usuarios (nombre,email,password,edad,ciudad) values ('maria', 'mariajulielta@gmail.com' , 'minena0606', 28, 'córdoba capital');

select * from usuarios;
select nombre, email from usuarios where ciudad = 'alem';
select nombre, email from usuarios where ciudad = 'Lice';
select nombre, edad, ciudad from usuarios;

CREATE TABLE Registro_de_Sesion (   
	IDUsuario INT AUTO_INCREMENT PRIMARY KEY,   
    Nombre_de_usuario varchar(100),
    Email VARCHAR(100) UNIQUE,   
    Password VARCHAR(100));

insert into registro_de_sesion (nombre_de_usuario, email, password) values ('juancito2021', 'juan@gmail.com','hoola');
insert into registro_de_sesion (nombre_de_usuario, email, password) values ('bianca1401', 'bianca@gmail.com' , 'caracol');
insert into registro_de_sesion (nombre_de_usuario, email, password) values ('Pepito2000', 'pedrohernandes@gmail.com' , 'pancho');
insert into registro_de_sesion (nombre_de_usuario, email, password) values ('MJuly', 'mariajulielta@gmail.com' , 'minena0606');

select * from registro_de_sesion;
select * from registro_de_sesion where IDUsuario = 3;
select * from registro_de_sesion where Password = 'hoola';
select Nombre_de_usuario, Email from registro_de_sesion where IDUsuario in (1, 4);

select * from registro_de_sesion, usuarios;
