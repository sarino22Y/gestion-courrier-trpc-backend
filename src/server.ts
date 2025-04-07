import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { courrierRouter } from './routers/courrierRouter';
import { IncomingMessage, ServerResponse } from 'http';
import cors from 'cors';
import * as http from 'http';

// Configuration du middleware CORS
const corsMiddleware = cors({
  origin: '*', // Origine du frontend
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
});

// Handler tRPC
const trpcHandler = createHTTPHandler({
  router: courrierRouter,
  createContext: () => ({}),
});

// Handler principal
const handler = (req: IncomingMessage, res: ServerResponse) => {
  console.log(`Requête reçue: ${req.method} ${req.url}`);
  corsMiddleware(req, res, () => {
    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Bienvenue sur l\'API de gestion de courrier.' }));
    } else {
      trpcHandler(req, res);
    }
  });
};

// Création et démarrage du serveur
const server = http.createServer(handler);
server.listen(3000, () => {
  console.log('Serveur tRPC démarré sur http://localhost:3000');
});