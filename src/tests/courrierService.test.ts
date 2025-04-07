import { ajouterCourrier, listerCourriers } from '../services/courrierService';
import { query } from '../db/connection';

jest.mock('../db/connection'); // Mock de la connexion DB

describe('Courrier Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('ajoute un courrier correctement', async () => {
    (query as jest.Mock).mockResolvedValue([]);
    const courrier = {
      expediteurId: 'u1',
      destinataireId: 'u2',
      dateEnvoi: '2025-04-10',
      statut: 'EN_ATTENTE' as const,
      description: 'Test',
    };
    const result = await ajouterCourrier(courrier);
    expect(result).toHaveProperty('id');
    expect(result.expediteurId).toBe('u1');
  });

  it('liste les courriers avec relations', async () => {
    (query as jest.Mock).mockResolvedValue([
      {
        id: 'c1',
        expediteur_id: 'u1',
        destinataire_id: 'u2',
        date_envoi: '2025-04-10',
        statut: 'EN_ATTENTE',
        description: 'Test',
        expediteur_nom: 'Jean Dupont',
        expediteur_email: 'jean.dupont@exemple.com',
        departement_id: 'd1',
        departement_nom: 'Comptabilité',
        destinataire_nom: 'Marie Curie',
        destinataire_email: 'marie.curie@exemple.com',
      },
    ]);
    const courriers = await listerCourriers();
    expect(courriers).toHaveLength(1);
    expect(courriers[0].expediteur?.nom).toBe('Jean Dupont');
    expect(courriers[0].destinataire?.nom).toBe('Marie Curie');
  });
});