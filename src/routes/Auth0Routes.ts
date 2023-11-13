import { Router } from 'express';
import { generateAuthUrl, exchangeCodeForToken } from '../utils/auth0-sso';

const routerAuth0 = Router();

routerAuth0.get('/auth-url', generateAuthUrl);
routerAuth0.post('/codeForToken', exchangeCodeForToken);

export default routerAuth0;