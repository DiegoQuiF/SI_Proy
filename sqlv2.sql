-- CREACIÓN Y LLENADO DE TABLAS

-- Tabla Categoria
CREATE SEQUENCE CategoriaSequence
    AS INT
    START WITH 100
    INCREMENT BY 1
    MINVALUE 100
    MAXVALUE 199;

CREATE TABLE Categoria (
    idCategoria INT DEFAULT NEXTVAL('CategoriaSequence') PRIMARY KEY,
    nombreCategoria VARCHAR(50)
);

INSERT INTO Categoria (nombreCategoria)
VALUES ('Alimentacion'),
       ('Comunicacion'),
       ('Deudas'),
       ('Educacion'),
       ('Entretenimiento'),
       ('Ingresos varios'),
       ('Salud'),
       ('Transporte'),
       ('Vestimenta'),
       ('Vivienda'),
       ('Otros');

select * from Categoria;



-- Tabla Tipo Gasto
CREATE SEQUENCE TipoGastoSequence
    AS INT
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    MAXVALUE 1999;

CREATE TABLE TipoGasto (
    idTipoGasto INT DEFAULT NEXTVAL('TipoGastoSequence') PRIMARY KEY,
    idCategoria INT,
    nombreGasto VARCHAR(50),
    FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)
);

INSERT INTO TipoGasto (idCategoria, nombreGasto)
VALUES (100, 'Comida de restaurante'),
		(100, 'Insumos de cocina'),
		(100, 'Galletas/Dulces'),
		(101, 'Telefonia'),
		(101, 'Television'),
		(101, 'Internet'),
		(101, 'Servicios streaming'),
		(101, 'Suscripciones web'),
		(102, 'Generales'),
		(102, 'Tiendas'),
		(102, 'Bancos'),
		(103, 'Matriculas'),
		(103, 'Materiales educativos'),
		(103, 'Servicios personalizados'),
		(104, 'Streaming'),
		(104, 'Actividades'),
		(104, 'Juegos'),
		(105, 'Ingresos'),
		(106, 'Medicinas'),
		(106, 'Consultas'),
		(106, 'Revisiones'),
		(107, 'Viajes'),
		(107, 'Transporte publico'),
		(107, 'Transporte privado'),
		(108, 'Torso'),
		(108, 'Piernas'),
		(108, 'Pies'),
		(109, 'Vivienda'),
		(110, 'Otros');

select * from TipoGasto;



-- Tabla Tipo Correo
CREATE SEQUENCE TipoCorreoSequence
    AS INT
    START WITH 500
    INCREMENT BY 1
    MINVALUE 500
    MAXVALUE 599;

CREATE TABLE TipoCorreo (
	idTipoCorreo INT DEFAULT NEXTVAL('TipoCorreoSequence') PRIMARY KEY,
    nombreTipoCorreo VARCHAR(50),
    extensionTipoCorreo VARCHAR(50),
    empresaTipoCorreo VARCHAR(50)
);

INSERT INTO TipoCorreo (nombreTipoCorreo, extensionTipoCorreo, empresaTipoCorreo)
VALUES ('gmail', 'com', 'Google'),
		('hotmail', 'es', 'Microsoft'),
		('hotmail', 'com', 'Microsoft'),
		('outlook', 'es', 'Microsoft'),
		('outlook', 'com', 'Microsoft'),
		('yahoo', 'com', 'Yahoo');

select * from tipocorreo;



-- Tabla Correo
CREATE SEQUENCE CorreoSequence
    AS INT
    START WITH 20000
    INCREMENT BY 1
    MINVALUE 20000
    MAXVALUE 29999;

CREATE TABLE Correo (
	idCorreo INT DEFAULT NEXTVAL('CorreoSequence') PRIMARY KEY,
    nombreCorreo VARCHAR(50) unique,
    idTipoCorreo INT,
    contraseniaCorreo VARCHAR(50),
    FOREIGN KEY (idTipoCorreo) REFERENCES TipoCorreo(idTipoCorreo)
);

INSERT INTO Correo (nombreCorreo, idTipoCorreo, contraseniaCorreo)
VALUES ('diegoQF', 500, 'diego123'),
		('julioCH', 501, 'julio123'),
		('robertoCS', 500, 'roberto123'),
		('alexandraGT', 503, 'alexandra123'),
		('erickEV', 504, 'erick123');

select * from Correo;



-- Tabla Usuario
CREATE SEQUENCE UsuarioSequence
    AS INT
    START WITH 10000
    INCREMENT BY 1
    MINVALUE 10000
    MAXVALUE 19999;

CREATE TABLE Usuario (
	idUsuario INT DEFAULT NEXTVAL('UsuarioSequence') PRIMARY KEY,
    nombreUsuario VARCHAR(50),
    apellidoPatUsuario VARCHAR(50),
    apellidoMatUsuario VARCHAR(50),
    idCorreo INT unique,
    nroCelular INT unique,
    FOREIGN KEY (idCorreo) REFERENCES Correo(idCorreo)
);

INSERT INTO Usuario (nombreUsuario, apellidoPatUsuario, apellidoMatUsuario, idCorreo, nroCelular)
VALUES ('Diego', 'Quiñonez', 'Flores', 20000, 985948701),
		('Julio Santiago', 'Cubas', 'Huaranga', 20001, 985684751),
		('Roberto Junior', 'Castro', 'Santos', 20002, 983569810),
		('Alexandra Geraldine', 'Guizado', 'Torres', 20003, 985657481),
		('Erick Alexander', 'Estrada', 'Vargas', 20004, 985672015);

select * from Usuario;



-- Tabla Intermedia
CREATE SEQUENCE DetalleGastoSequence
    AS INT
    START WITH 100000
    INCREMENT BY 1
    MINVALUE 100000
    MAXVALUE 199999;

CREATE TABLE DetalleGasto (
	idDetalleGasto INT DEFAULT NEXTVAL('DetalleGastoSequence') PRIMARY KEY,
    idTipoGasto INT,
    idUsuario INT,
    montoGasto NUMERIC(10, 2),
    cantidad INT,
    descripcionGasto VARCHAR(100),
    fechaGasto DATE,
    FOREIGN KEY (idTipoGasto) REFERENCES TipoGasto(idTipoGasto),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

INSERT INTO DetalleGasto (idTipoGasto, idUsuario, montoGasto, cantidad, descripcionGasto, fechaGasto)
VALUES (1002, 10000, 5.00, 1, 'Cereales', '2023-10-30'),
		(1000, 10000, 4.00, 2, 'Hamburguesa', '2023-10-30'),
		(1002, 10000, 2.50, 1, 'Papitas', '2023-10-29'),
		(1002, 10002, 2.50, 4, 'Papitas', '2023-10-31'),
		(1011, 10002, 300.00, 1, 'Escuela ingles', '2023-10-15'),
		(1012, 10002, 60.00, 1, 'Libro ingles', '2023-10-16'),
		(1000, 10000, 5.00, 2, 'Hamburguesa', '2023-11-10'),
		(1000, 10000, 15.00, 1, 'Pollo a la plancha', '2023-11-10'),
		(1000, 10000, 12.00, 1, 'Pollo a la brasa', '2023-11-10'),
		(1001, 10000, 15.00, 1, 'Pollo entero', '2023-11-10'),
		(1001, 10000, 2.00, 1, 'Especias', '2023-11-11'),
		(1001, 10000, 4.00, 1, 'Kg Arroz', '2023-11-11'),
		(1002, 10000, 1.00, 10, 'Caramelo', '2023-11-11'),
		(1002, 10000, 3.00, 1, 'Cereales', '2023-11-11'),
		(1002, 10000, 1.00, 4, 'Panecillos', '2023-11-12'),
		(1003, 10000, 20.00, 1, 'Pago de servicio', '2023-11-12'),
		(1003, 10000, 10.00, 1, 'Mejora de plan telefono 2', '2023-11-12'),
		(1003, 10000, 10.00, 1, 'Mejora de plan telefono 3', '2023-11-12'),
		(1004, 10000, 50.00, 1, 'Contratacion plan tv 1', '2023-11-12'),
		(1004, 10000, 10.00, 1, 'Mejora de plan tv 2', '2023-11-13'),
		(1004, 10000, 10.00, 1, 'Mejora de plan tv 3', '2023-11-13'),
		(1005, 10000, 70.00, 1, 'Contratacion plan internet 1 ', '2023-11-13'),
		(1005, 10000, 20.00, 1, 'Mejora de plan internet 2', '2023-11-14'),
		(1005, 10000, 20.00, 1, 'Mejora de plan internet 3', '2023-11-14'),
		(1006, 10000, 25.00, 1, 'Pago LiveNet', '2023-11-14'),
		(1006, 10000, 30.00, 1, 'Pago LiveCom', '2023-11-14'),
		(1006, 10000, 35.00, 1, 'Pago LiveAm', '2023-11-14'),
		(1007, 10000, 15.00, 1, 'Pago diario LaRepública', '2023-11-15'),
		(1007, 10000, 100.00, 1, 'Pago Scopus', '2023-11-15'),
		(1007, 10000, 50.00, 1, 'Pago Drive', '2023-11-15'),
		(1008, 10000, 50.00, 1, 'Deuda Miguel', '2023-11-15'),
		(1008, 10000, 40.00, 1, 'Deuda Juan', '2023-11-16'),
		(1008, 10000, 75.00, 1, 'Deuda Pedra', '2023-11-16'),
		(1009, 10000, 5.00, 1, 'Deuda tienda 1', '2023-11-17'),
		(1009, 10000, 7.00, 1, 'Deuda tienda 2', '2023-11-18'),
		(1009, 10000, 4.00, 1, 'Deuda tienda 3', '2023-11-18'),
		(1010, 10000, 400.00, 1, 'Deuda BCP', '2023-11-18'),
		(1010, 10000, 250.00, 1, 'Deuda Banco Nacion', '2023-11-18'),
		(1010, 10000, 130.00, 2, 'Deuda Pichincha', '2023-11-18'),
		(1011, 10000, 120.00, 2, 'Matrícula ingles', '2023-11-19'),
		(1011, 10000, 120.00, 2, 'Matrícula portugues', '2023-11-19'),
		(1011, 10000, 170.00, 2, 'Matrícula hebreo', '2023-11-19'),
		(1012, 10000, 35.00, 2, 'Libro ingles', '2023-11-19'),
		(1012, 10000, 35.00, 2, 'Libro portugues', '2023-11-20'),
		(1012, 10000, 45.00, 2, 'Libro hebreo', '2023-11-20'),
		(1013, 10000, 75.00, 1, 'Profesor ingles', '2023-11-20'),
		(1013, 10000, 75.00, 1, 'Profesor portugues', '2023-11-21'),
		(1013, 10000, 120.00, 1, 'Profesor hebreo', '2023-11-21'),
		(1014, 10000, 25.00, 1, 'Pago Disney+', '2023-11-21'),
		(1014, 10000, 45.00, 1, 'Pago Star+', '2023-11-22'),
		(1014, 10000, 35.00, 1, 'Pago HBO+', '2023-11-22'),
		(1015, 10000, 20.00, 1, 'Pago teleferico', '2023-11-22'),
		(1015, 10000, 17.00, 1, 'Pago caballos', '2023-11-23'),
		(1015, 10000, 235.00, 1, 'Fiestas', '2023-11-23'),
		(1016, 10000, 180.00, 1, 'Videojuego Mario RPG', '2023-11-23'),
		(1016, 10000, 180.00, 1, 'Videojuego COD MW3', '2023-11-23'),
		(1016, 10000, 39.00, 1, 'Monopoly', '2023-11-23'),
		(1017, 10000, 2500.00, 1, 'Cobro por servicios', '2023-11-23'),
		(1017, 10000, 1000.00, 1, 'Cobro por trabajos', '2023-11-23'),
		(1017, 10000, 10000.00, 1, 'Cobro por ventas', '2023-11-24'),
		(1018, 10000, 2.00, 2, 'Paracetamol', '2023-11-24'),
		(1018, 10000, 1.00, 4, 'Mlivia', '2023-11-24'),
		(1018, 10000, 8.00, 2, 'Paltomiel', '2023-11-25'),
		(1019, 10000, 40.00, 2, 'Consulta medico 1', '2023-11-25'),
		(1019, 10000, 40.00, 1, 'Consulta medico 2', '2023-11-26'),
		(1019, 10000, 40.00, 1, 'Consulta medico 3', '2023-11-26'),
		(1020, 10000, 12.00, 2, 'Revisión de medico 1', '2023-11-27'),
		(1020, 10000, 12.00, 1, 'Revisión de medico 2', '2023-11-28'),
		(1020, 10000, 12.00, 1, 'Revisión de medico 3', '2023-11-29'),
		(1021, 10000, 250.00, 3, 'Viaje a cusco', '2023-11-29'),
		(1021, 10000, 82.00, 3, 'Viaje a macchu picchu', '2023-11-30'),
		(1021, 10000, 200.00, 3, 'Viaje a lima', '2023-11-30'),
		(1022, 10000, 7.00, 1, 'Viaje casa a universidad', '2023-11-30'),
		(1022, 10000, 7.00, 1, 'Viaje universidad a casa', '2023-11-30'),
		(1022, 10000, 12.00, 1, 'Viaje ida y vuelva a casa', '2023-11-30'),
		(1023, 10000, 12.00, 1, 'Pago gasolina 1', '2023-12-1'),
		(1023, 10000, 120.00, 2, 'Reparaciones', '2023-12-1'),
		(1023, 10000, 17.00, 1, 'Pago gasolina 2', '2023-12-1'),
		(1024, 10000, 70.00, 1, 'Polera', '2023-12-2'),
		(1024, 10000, 48.00, 1, 'Polo', '2023-12-2'),
		(1024, 10000, 80.00, 1, 'Casaca', '2023-12-2'),
		(1025, 10000, 80.00, 1, 'Pantalon', '2023-12-3'),
		(1025, 10000, 35.00, 1, 'Short', '2023-12-3'),
		(1025, 10000, 120.00, 1, 'Buzo', '2023-12-3'),
		(1026, 10000, 350.00, 2, 'Zapatilla', '2023-12-3'),
		(1026, 10000, 200.00, 2, 'Zapato', '2023-12-3'),
		(1026, 10000, 29.00, 2, 'Sandalias', '2023-12-4'),
		(1027, 10000, 450.00, 1, 'Pago de vivienda 1', '2023-12-4'),
		(1027, 10000, 450.00, 1, 'Pago de vivienda 2', '2023-12-4'),
		(1027, 10000, 450.00, 1, 'Pago de vivienda 3', '2023-12-4'),
		(1028, 10000, 800.00, 1, 'Otros pagos 1', '2023-12-4'),
		(1028, 10000, 805.00, 1, 'Otros pagos 2', '2023-12-5'),
		(1028, 10000, 800.00, 1, 'Otros pagos 3', '2023-12-5');

select * from DetalleGasto;














-- SELECTORS

select * from Usuario;
select * from Correo;
select * from TipoCorreo;

-- Todos los usuarios con sus datos
select U.idusuario, concat(U.nombreusuario, ' ', U.apellidopatusuario, ' ', U.apellidomatusuario) as completousuario, U.nrocelular,
	concat(CO.nombrecorreo, '@', TC.nombretipocorreo, '.', TC.extensiontipocorreo) as dircorreo, CO.contraseniacorreo
from Usuario U, Correo CO, TipoCorreo TC
where U.idcorreo = CO.idcorreo and TC.idtipocorreo = CO.idtipocorreo;

-- Usuario específico por correo y contrasenia
select U.idusuario, concat(U.nombreusuario, ' ', U.apellidopatusuario, ' ', U.apellidomatusuario) as completousuario, U.nrocelular,
	concat(CO.nombrecorreo, '@', TC.nombretipocorreo, '.', TC.extensiontipocorreo) as dircorreo, CO.contraseniacorreo
from Usuario U, Correo CO, TipoCorreo TC
where U.idcorreo = CO.idcorreo and TC.idtipocorreo = CO.idtipocorreo
	and concat(CO.nombrecorreo, '@', TC.nombretipocorreo, '.', TC.extensiontipocorreo) = 'diegoQF@gmail.com'
	and CO.contraseniacorreo = 'diego123';

-- Usuario específico por id
select U.idusuario, concat(U.nombreusuario, ' ', U.apellidopatusuario, ' ', U.apellidomatusuario) as completousuario, U.nrocelular,
	concat(CO.nombrecorreo, '@', TC.nombretipocorreo, '.', TC.extensiontipocorreo) as dircorreo, CO.contraseniacorreo
from Usuario U, Correo CO, TipoCorreo TC
where U.idcorreo = CO.idcorreo and TC.idtipocorreo = CO.idtipocorreo
	and U.idusuario = 10000;
	
	
	
select * from categoria;
select * from detallegasto;
select * from usuario;

-- Gastos por id de usuario
select DG.iddetallegasto from detallegasto DG;
select TG.idtipogasto, DG.idusuario, CT.nombrecategoria, TG.nombregasto, DG.descripciongasto, DG.cantidad, DG.montogasto,
	(DG.cantidad*DG.montogasto) as total
from tipogasto TG, categoria CT, detallegasto DG
where TG.idcategoria = CT.idcategoria and DG.idtipogasto = TG.idtipogasto and DG.idusuario = 10002;


select * from usuario;

select * from correo;
select * from tipocorreo;


-- coincidencias con correo
select TC.idtipocorreo, concat(CO.nombrecorreo , '@', TC.nombretipocorreo, '.', TC.extensiontipocorreo) as dir_correo
from tipocorreo TC, correo CO
where TC.idtipocorreo = CO.idtipocorreo
	and concat(CO.nombrecorreo , '@', TC.nombretipocorreo, '.', TC.extensiontipocorreo) = 'diegoQF@gmail.com'


select * from usuario;
select * from correo;

select * from tipocorreo;

select TC.idtipocorreo, concat('@', TC.nombretipocorreo, '.', TC.extensiontipocorreo) as completoextension
from tipocorreo TC
where concat('@', TC.nombretipocorreo, '.', TC.extensiontipocorreo) = '@gmail.com'







select DG.iddetallegasto from detallegasto DG;
select TG.idtipogasto, DG.idusuario, CT.nombrecategoria, TG.nombregasto, DG.descripciongasto, DG.cantidad, DG.montogasto,
	(DG.cantidad*DG.montogasto) as total, TO_CHAR(DG.fechagasto, 'DD/MM/YYYY') as fechagasto
from tipogasto TG, categoria CT, detallegasto DG
where TG.idcategoria = CT.idcategoria and DG.idtipogasto = TG.idtipogasto and DG.idusuario = 10002;

select * from detallegasto;


select * from tipogasto;
select * from detallegasto;

select * from categoria;

select TG.idtipogasto, DG.idusuario, CT.nombrecategoria, TG.nombregasto, DG.descripciongasto, DG.cantidad, DG.montogasto,
	(DG.cantidad*DG.montogasto) as total, TO_CHAR(DG.fechagasto, 'DD/MM/YYYY') as fechagasto
from tipogasto TG, categoria CT, detallegasto DG
where TG.idcategoria = CT.idcategoria and DG.idtipogasto = TG.idtipogasto and DG.idusuario = 10000;


-- catálogo de categorias y tipos de gastos
select CT.idcategoria, CT.nombrecategoria, TG.idtipogasto, TG.nombregasto as nombretipogasto
from tipogasto TG, categoria CT
where TG.idcategoria = CT.idcategoria

select * from categoria;
select * from detallegasto;