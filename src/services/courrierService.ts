import { query } from '../db/connection';
import { Courrier, Utilisateur, Departement } from '../models/courrier';
import { v4 as uuidv4 } from 'uuid';

export async function ajouterCourrier(courrier: Omit<Courrier, 'id'>): Promise<Courrier> {
  const id = uuidv4();
  const sql = `
    INSERT INTO courriers (id, expediteur_id, destinataire_id, date_envoi, statut, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  await query(sql, [
    id,
    courrier.expediteurId,
    courrier.destinataireId,
    courrier.dateEnvoi,
    courrier.statut,
    courrier.description,
  ]);
  return { id, ...courrier };
}

export async function listerCourriers(): Promise<Courrier[]> {
  const sql = `
    SELECT 
      c.id, c.expediteur_id, c.destinataire_id, c.date_envoi, c.statut, c.description,
      ue.nom AS expediteur_nom, ue.email AS expediteur_email, ue.departement_id,
      ud.nom AS destinataire_nom, ud.email AS destinataire_email,
      d.nom AS departement_nom
    FROM courriers c
    LEFT JOIN utilisateurs ue ON c.expediteur_id = ue.id
    LEFT JOIN utilisateurs ud ON c.destinataire_id = ud.id
    LEFT JOIN departements d ON ue.departement_id = d.id
  `;
  const rows = await query<any>(sql);
  return rows.map((row) => ({
    id: row.id,
    expediteurId: row.expediteur_id,
    destinataireId: row.destinataire_id,
    dateEnvoi: row.date_envoi,
    statut: row.statut,
    description: row.description,
    expediteur: {
      id: row.expediteur_id,
      nom: row.expediteur_nom,
      email: row.expediteur_email,
      departementId: row.departement_id,
      departement: { id: row.departement_id, nom: row.departement_nom },
    },
    destinataire: {
      id: row.destinataire_id,
      nom: row.destinataire_nom,
      email: row.destinataire_email,
      departementId: row.departement_id,
    },
  }));
}

export async function listerUtilisateurs(): Promise<Utilisateur[]> {
  const sql = `
    SELECT u.id, u.nom, u.email, u.departement_id, d.nom AS departement_nom
    FROM utilisateurs u
    LEFT JOIN departements d ON u.departement_id = d.id
  `;
  const rows = await query<any>(sql);
  return rows.map((row) => ({
    id: row.id,
    nom: row.nom,
    email: row.email,
    departementId: row.departement_id,
    departement: { id: row.departement_id, nom: row.departement_nom },
  }));
}