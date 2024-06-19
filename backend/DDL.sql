-- Create the database if it does not exist
CREATE DATABASE IF NOT EXISTS MedicalEvent DEFAULT CHARSET=utf8mb4;

USE MedicalEvent;

DROP TABLE IF EXISTS MedicalEvent.AssistanceDetail;
DROP TABLE IF EXISTS MedicalEvent.Assistance;
DROP TABLE IF EXISTS MedicalEvent.Promotions;
DROP TABLE IF EXISTS MedicalEvent.User;

-- Table definition for User
CREATE TABLE IF NOT EXISTS User (
    IdUser INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    PRIMARY KEY (IdUser)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table definition for Promotions
CREATE TABLE IF NOT EXISTS Promotions (
    IdPromotions INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Price DOUBLE NOT NULL,
    Type VARCHAR(1) NOT NULL,
    PRIMARY KEY (IdPromotions)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table definition for Assistance
CREATE TABLE IF NOT EXISTS Assistance (
    IdAssistance INT NOT NULL AUTO_INCREMENT,
    IdUser INT NOT NULL,
    Date DATETIME NOT NULL,
    Total DOUBLE NOT NULL,
    DiscountServices INT NOT NULL,
    DiscountProducts INT NOT NULL,
    TotalDiscount DOUBLE NOT NULL,
    PRIMARY KEY (IdAssistance),
    FOREIGN KEY (IdUser) REFERENCES User (IdUser)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table definition for AssistanceDetail
CREATE TABLE IF NOT EXISTS AssistanceDetail (
    IdAssistanceDetail INT NOT NULL AUTO_INCREMENT,
    IdAssistance INT NOT NULL,
    IdPromotions INT NOT NULL,
    Total DOUBLE NOT NULL,
    PRIMARY KEY (IdAssistanceDetail),
    FOREIGN KEY (IdAssistance) REFERENCES MedicalEvent.Assistance (IdAssistance),
    FOREIGN KEY (IdPromotions) REFERENCES MedicalEvent.Promotions (IdPromotions)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Data Test
-- Insertar 10 usuarios de ejemplo
INSERT INTO User (Name, LastName, Email, Password)
VALUES 
    ('John', 'Doe', 'john.doe@example.com', 'password1'),
    ('Jane', 'Smith', 'jane.smith@example.com', 'password2'),
    ('Michael', 'Johnson', 'michael.johnson@example.com', 'password3'),
    ('Emily', 'Williams', 'emily.williams@example.com', 'password4'),
    ('James', 'Brown', 'james.brown@example.com', 'password5'),
    ('Emma', 'Jones', 'emma.jones@example.com', 'password6'),
    ('Daniel', 'Garcia', 'daniel.garcia@example.com', 'password7'),
    ('Olivia', 'Martinez', 'olivia.martinez@example.com', 'password8'),
    ('William', 'Hernandez', 'william.hernandez@example.com', 'password9'),
    ('Sophia', 'Lopez', 'sophia.lopez@example.com', 'password10');

-- Insertar 50 registros de servicios médicos (tipo 'S')
INSERT INTO Promotions (Name, Price, Type)
VALUES
    ('Consulta Médica', 100.00, 'S'),
    ('Cirugía de Cataratas', 500.00, 'S'),
    ('Ecografía Abdominal', 150.00, 'S'),
    ('Radiografía de Torax', 120.00, 'S'),
    ('Terapia Física', 80.00, 'S'),
    ('Endoscopia Digestiva', 300.00, 'S'),
    ('Resonancia Magnética', 400.00, 'S'),
    ('Análisis de Sangre Completo', 50.00, 'S'),
    ('Consulta de Especialista', 120.00, 'S'),
    ('Vacuna contra la Influenza', 30.00, 'S'),
    ('Examen de la Vista', 70.00, 'S'),
    ('Consulta Pediátrica', 90.00, 'S'),
    ('Electrocardiograma', 80.00, 'S'),
    ('Colonoscopia', 250.00, 'S'),
    ('Mamografía', 150.00, 'S'),
    ('Tomografía Computarizada', 350.00, 'S'),
    ('Psicoterapia Individual', 120.00, 'S'),
    ('Fisioterapia Respiratoria', 100.00, 'S'),
    ('Consulta de Nutrición', 60.00, 'S'),
    ('Consulta Ginecológica', 100.00, 'S'),
    ('Terapia Ocupacional', 90.00, 'S'),
    ('Evaluación Auditiva', 40.00, 'S'),
    ('Artroscopia', 400.00, 'S'),
    ('Consulta Dermatológica', 80.00, 'S'),
    ('Prueba de Esfuerzo', 150.00, 'S'),
    ('Consulta Geriátrica', 100.00, 'S'),
    ('Densitometría Ósea', 120.00, 'S'),
    ('Consulta de Rehabilitación', 80.00, 'S'),
    ('Control de Diabetes', 50.00, 'S'),
    ('Consulta de Odontología', 70.00, 'S'),
    ('Colonoscopia Virtual', 300.00, 'S'),
    ('Consulta de Otorrinolaringología', 90.00, 'S'),
    ('Ecocardiograma', 180.00, 'S'),
    ('Consulta de Medicina Interna', 110.00, 'S'),
    ('Consulta de Urología', 120.00, 'S'),
    ('Revisión de Presión Arterial', 20.00, 'S'),
    ('Control de Colesterol', 40.00, 'S'),
    ('Consulta de Cardiología', 150.00, 'S'),
    ('Endoscopia Respiratoria', 250.00, 'S'),
    ('Consulta de Traumatología', 130.00, 'S'),
    ('Consulta de Psiquiatría', 140.00, 'S'),
    ('Biopsia', 200.00, 'S'),
    ('Consulta de Oftalmología', 100.00, 'S'),
    ('Consulta de Neumología', 120.00, 'S'),
    ('Consulta de Oncología', 180.00, 'S'),
    ('Artroplastia de Cadera', 500.00, 'S'),
    ('Tratamiento de Fertilidad', 300.00, 'S'),
    ('Consulta de Cirugía Plástica', 250.00, 'S');

-- Insertar 50 registros de productos médicos (tipo 'P')
INSERT INTO Promotions (Name, Price, Type)
VALUES
    ('Medicamento para la Hipertensión', 50.00, 'P'),
    ('Vitaminas Prenatales', 30.00, 'P'),
    ('Analgesico Antiinflamatorio', 20.00, 'P'),
    ('Antibiótico de Amplio Espectro', 40.00, 'P'),
    ('Antihistamínico', 15.00, 'P'),
    ('Protector Solar SPF 50+', 25.00, 'P'),
    ('Antidiabético Oral', 35.00, 'P'),
    ('Gotas Oftálmicas Lubricantes', 10.00, 'P'),
    ('Jarabe para la Tos', 15.00, 'P'),
    ('Antiemético', 25.00, 'P'),
    ('Antiácido', 12.00, 'P'),
    ('Descongestionante Nasal', 18.00, 'P'),
    ('Laxante Suave', 8.00, 'P'),
    ('Vitaminas B12', 30.00, 'P'),
    ('Suplemento de Calcio', 20.00, 'P'),
    ('Crema Hidratante para la Piel', 15.00, 'P'),
    ('Antifúngico Tópico', 12.00, 'P'),
    ('Suplemento de Hierro', 25.00, 'P'),
    ('Cepillo Dental Eléctrico', 40.00, 'P'),
    ('Termómetro Digital', 10.00, 'P'),
    ('Tiras Reactivas para Diabetes', 30.00, 'P'),
    ('Parche Anticonceptivo', 50.00, 'P'),
    ('Colirio Antibiótico', 18.00, 'P'),
    ('Vendas Elásticas', 15.00, 'P'),
    ('Antiséptico para Heridas', 12.00, 'P'),
    ('Alcohol en Gel 70%', 8.00, 'P'),
    ('Preservativos', 5.00, 'P'),
    ('Suplemento de Omega 3', 25.00, 'P'),
    ('Mascarilla Quirúrgica', 10.00, 'P'),
    ('Jeringas Desechables', 15.00, 'P'),
    ('Gasas Estériles', 12.00, 'P'),
    ('Pañales para Adultos', 20.00, 'P'),
    ('Suplemento de Vitamina D', 30.00, 'P'),
    ('Antiséptico Bucal', 12.00, 'P'),
    ('Espéculo Vaginal', 18.00, 'P'),
    ('Termómetro Infrarrojo', 25.00, 'P'),
    ('Crema Antiarrugas', 40.00, 'P'),
    ('Toallitas Desinfectantes', 15.00, 'P'),
    ('Guantes de Látex', 8.00, 'P'),
    ('Cinta Adhesiva Microporosa', 10.00, 'P'),
    ('Enjuague Bucal', 12.00, 'P'),
    ('Gasas No Tejidas', 10.00, 'P'),
    ('Bolsa de Hielo Reutilizable', 15.00, 'P'),
    ('Sonda Urinaria', 18.00, 'P'),
    ('Mascarilla N95', 20.00, 'P'),
    ('Crema Cicatrizante', 25.00, 'P'),
    ('Tijeras de Curación', 10.00, 'P'),
    ('Jabón Antibacterial', 8.00, 'P'),
    ('Solución Salina para Lentes de Contacto', 12.00, 'P'),
    ('Cápsulas de Melatonina', 30.00, 'P');

