insert into usuarios (nombre,email,password,edad,ciudad,id) values ('juancito', 'juan@gmail.com','hoola', 84,'liceo' );
insert  into usuarios (nombre,email,password,edad,ciudad,id) values ('bianca', 'bianca@gmail.com' , 'caracol', 23, 'alem' );

UPDATE usuarios SET ciudad = NULL WHERE email = 'bianca@gmail.com';
DELETE FROM usuarios WHERE email = 'bianca@gmail.com';

UPDATE usuarios SET ciudad = 'Río Cuarto' WHERE email = 'juan@gmail.com';
UPDATE usuarios SET nombre = 'Juan Nuñez', edad = 33 WHERE email = 'juan@gmail.com';