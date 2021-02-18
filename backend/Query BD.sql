-- Creacion de la base de datos
create database inscripciones;

/* use inscripciones */
-- Creacion de las tablas
create table Administradores(Matricula int primary key not null auto_increment,Contraseña varchar(50),Nombre varchar(60));
create table Deportes(Id_deporte int primary key not null auto_increment, Nombre varchar(60));
create table Deportistas(Matricula int primary key not null auto_increment, Nombre varchar(60), Grupo int, Semestre int, Correo varchar(60));
create table Entrenadores(Id_entrenador int primary key not null auto_increment, Nombre varchar(60));
create table Inscripciones (Id_inscripcion int primary key not null auto_increment, Matricula int, Id_entrenador int, Id_deporte int, Fecha_inscripcion date, Id_administrador int, 
			 foreign key(Matricula) references Deportistas(Matricula), foreign key(Id_entrenador) references Entrenadores(Id_entrenador), 
             foreign key(Id_deporte) references Deportes(Id_deporte), foreign key(Id_administrador) references Administradores(Matricula));

-- Datos de los administradores
insert INTO Administradores VALUES(1953829, "abraham", "Abraham Carreon");
insert INTO Administradores VALUES(1956753, "randall", "Randall Martinez");
insert INTO Administradores VALUES(1946887, "joshua", "Joshua Lara");
insert INTO Administradores VALUES(1946342, "hugo", "Hugo Ovalle");
insert INTO Administradores VALUES(1966811, "daniel", "Daniel Gallegos");
insert INTO Administradores VALUES(1946218, "christian", "Christian Mendoza");

-- Datos de los deportes
insert INTO Deportes VALUES(1, "Imua");
insert INTO Deportes VALUES(2, "Taekwondo");
insert INTO Deportes VALUES(3, "Judo");
insert INTO Deportes VALUES(4, "Lucha Olimpica");
insert INTO Deportes VALUES(5, "Baloncesto");
insert INTO Deportes VALUES(6, "Futbol");

-- Datos de los deportistas
insert INTO Deportistas VALUES(1953829, "Abraham Carreon", 612, 6, "abraham@gmail.com");
insert INTO Deportistas VALUES(1946218, "Christian Mendoza", 612, 6, "christian@gmail.com");
insert INTO Deportistas VALUES(1956753, "Randall Martinez", 612, 6, "randall@gmail.com");
insert INTO Deportistas VALUES(1946887, "Joshua Lara", 612, 6, "joshua@gmail.com");
insert INTO Deportistas VALUES(1946342, "Hugo Ovalle", 612, 6, "hugo@gmail.com");
insert INTO Deportistas VALUES(1966811, "Daniel Gallegos", 612, 6, "daniel@gmail.com");

-- Datos de los entrenadores
insert INTO Entrenadores VALUES(1, "Alexis Tobon");
insert INTO Entrenadores VALUES(2, "Fernando Álvarez Pérez");
insert INTO Entrenadores VALUES(3, "Everardo García Montelongo");
insert INTO Entrenadores VALUES(4, "Adrian Luna");
insert INTO Entrenadores VALUES(5, "Federico Sánchez Domínguez");
insert INTO Entrenadores VALUES(6, "Juan Carlos Sánchez Sosa");

-- Inscripcion 
insert INTO Inscripciones VALUES(1, 1953829, 1, 1, '2021-02-17', 1946218);










