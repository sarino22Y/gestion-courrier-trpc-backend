-- Table des départements
CREATE TABLE departements (
  id VARCHAR(36) PRIMARY KEY,
  nom VARCHAR(100) NOT NULL
);

-- Table des utilisateurs
CREATE TABLE utilisateurs (
  id VARCHAR(36) PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  departement_id VARCHAR(36),
  FOREIGN KEY (departement_id) REFERENCES departements(id)
);

-- Table des courriers
CREATE TABLE courriers (
  id VARCHAR(36) PRIMARY KEY,
  expediteur_id VARCHAR(36),
  destinataire_id VARCHAR(36),
  date_envoi DATE NOT NULL,
  statut ENUM('ENVOYE', 'RECU', 'EN_ATTENTE') NOT NULL,
  description TEXT,
  FOREIGN KEY (expediteur_id) REFERENCES utilisateurs(id),
  FOREIGN KEY (destinataire_id) REFERENCES utilisateurs(id)
);

-- Données initiales
INSERT INTO departements (id, nom) VALUES 
('d1', 'Comptabilité'),
('d2', 'Ressources Humaines');

INSERT INTO utilisateurs (id, nom, email, departement_id) VALUES 
('u1', 'Jean Dupont', 'jean.dupont@exemple.com', 'd1'),
('u2', 'Marie Curie', 'marie.curie@exemple.com', 'd2');