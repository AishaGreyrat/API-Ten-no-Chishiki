CREATE DATABASE API_Ten_no_Chishiki;

USE API_Ten_no_Chishiki;

CREATE TABLE estrellas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    tipo_espectral VARCHAR(255),
    magnitud DECIMAL(5,2),
    distancia DECIMAL(10,2),
    constelacion VARCHAR(255),
    datos_historicos TEXT,
    datos_mitologicos TEXT,
    imagenes TEXT,
    composicion TEXT,
    estructura TEXT,
    evolucion TEXT,
    consejos_observacion TEXT,
    guias_observacion TEXT,
    referencias TEXT
);