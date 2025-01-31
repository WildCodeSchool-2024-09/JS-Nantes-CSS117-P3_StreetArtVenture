import express, { Request, Response } from 'express';
import databaseClient from "../../../database/client"; // Assurez-vous que ce fichier est bien importé et correctement configuré

const app = express();
const port = 3000;

// Middleware pour parser le JSON (si nécessaire)
app.use(express.json());

// Exemple de route PATCH
app.patch("/tickets/validate/:id", (req: Request, res: Response) => ){
  const ticketId = req.params.id;
  const query = "UPDATE tickets SET is_covered = true WHERE id = ?";

  // Utilisez `databaseClient` ici pour exécuter la requête
}

// Exemple de route DELETE
app.delete("/tickets/refuse/:id", (req: Request, res: Response) => {
  const ticketId = req.params.id;
  const query = "DELETE FROM tickets WHERE id = ?";

  // Utilisez `databaseClient` ici pour exécuter la requête
 
});
// Démarrer le serveur
