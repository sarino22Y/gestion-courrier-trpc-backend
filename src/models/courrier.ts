export type Departement = {
    id: string;
    nom: string;
  };
  
  export type Utilisateur = {
    id: string;
    nom: string;
    email: string;
    departementId: string;
    departement?: Departement; // Relation optionnelle
  };
  
  export type Courrier = {
    id: string;
    expediteurId: string;
    destinataireId: string;
    dateEnvoi: string; // Format YYYY-MM-DD
    statut: 'ENVOYE' | 'RECU' | 'EN_ATTENTE';
    description: string;
    expediteur?: Utilisateur; // Relation optionnelle
    destinataire?: Utilisateur; // Relation optionnelle
  };