CREATE DATABASE cardapio;
USE cardapio; 

-- Tabela de Usuários
CREATE TABLE Usuarios (
    id_Usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(320) NOT NULL UNIQUE,
    senha CHAR(60) NOT NULL
);

-- Tabela de Pratos
CREATE TABLE Pratos(
    id_pratos INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(50) NOT NULL,
    imagemprato VARCHAR(200) NOT NULL,
    avaliacao VARCHAR(35)
);

-- Tabela de Favoritos
CREATE TABLE Favoritos (
    id_favorito INT PRIMARY KEY AUTO_INCREMENT,
    id_pratos INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_pratos) REFERENCES Pratos(id_pratos),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_Usuario)
);

-- Tabela de Alimentos
CREATE TABLE Alimentos (
    id_Alimentos INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL
);

-- Tabela que liga prato e ingrediente
CREATE TABLE PratoAlimento (
    id_prato_alimento INT PRIMARY KEY AUTO_INCREMENT,
    id_Alimento INT NOT NULL,
    id_pratos INT NOT NULL,
    FOREIGN KEY (id_pratos) REFERENCES Pratos(id_pratos),
    FOREIGN KEY (id_Alimento) REFERENCES Alimentos(id_Alimentos)
);

-- Inserts de usuários
INSERT INTO Usuarios (nome, email, senha) VALUES
('Nicollas', 'nicollas123@gmail.com', 'nicollas123'),
('Antonio', 'antonio123@gmail.com', 'Antonio123');

-- Inserts de pratos
INSERT INTO Pratos (nome, descricao, imagemprato, avaliacao) VALUES
('Strogonoff', 'cozida', 'strogo.png', 'Prato gostoso'),
('Carne Moída', 'cozida', 'carne.png', 'Prato bom'),
('Frango', 'cozido', 'frango.png', 'Muito bom');

-- Inserts de favoritos
INSERT INTO Favoritos (id_pratos, id_usuario) VALUES
(1, 1),
(2, 1);

-- Inserts de alimentos
INSERT INTO Alimentos (nome) VALUES
('Arroz'),
('Feijão'),
('Batata'),
('Frango');

INSERT INTO PratoAlimento (id_Alimento, id_pratos) VALUES
-- Strogonoff (id_pratos = 1)
(1, 1),  -- Arroz
(2, 1),  -- Feijão
(4, 1),  -- Frango

-- Carne Moída (id_pratos = 2)
(1, 2),  -- Arroz
(3, 2),  -- Batata
(2,2), -- Feijão

-- Frango (id_pratos = 3)
(1, 3),  -- Arroz
(4, 3),  -- Frango
(3, 3),  -- Batata
(2,3); -- Feijão


-- Consultas para verificar
SELECT * FROM Usuarios;
SELECT * FROM Pratos;
SELECT * FROM Favoritos;
SELECT * FROM Alimentos;

SELECT 
    Pratos.nome AS prato,
    Alimentos.nome AS alimento
FROM PratoAlimento
INNER JOIN Pratos ON Pratos.id_pratos = PratoAlimento.id_pratos
INNER JOIN Alimentos ON Alimentos.id_Alimentos = PratoAlimento.id_Alimento;
