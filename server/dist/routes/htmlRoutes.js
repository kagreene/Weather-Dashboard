import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();
// TODO: Define route to serve index.html
router.get('*', (_req, res) => {
<<<<<<<< HEAD:server/dist/routes/htmlRoutes.js
    res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
========
    res.sendFile(path.join(__dirname, '../../../client/dist/index.html'))
>>>>>>>> e4e7597ccb2f98c9b5aa9583a7a00329ee6bb1f6:server/src/routes/htmlRoutes.ts
});
export default router;
