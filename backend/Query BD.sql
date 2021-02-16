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




