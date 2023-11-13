import express from 'express';
import { 
  googleCredentials,
  getAuthUrl, 
  makeOAuth2Client, 
  exchangeCodeForToken, 
  getUserInfo,
  insertUserInfo
} from '../utils/google-api-auth';

const routerGoogle = express.Router();

const handleServerError = (res: express.Response, message: string) => {
  console.error(`Error: ${message}`);
  res.status(500).json({ error: message });
};

routerGoogle.get('/auth-url', async (req, res) => {
  try {
    const oauth2Client = await makeOAuth2Client(googleCredentials);
    const authUrl = await getAuthUrl(oauth2Client);
    res.json({ authUrl });
  } catch (error) {
    handleServerError(res, 'Error when obtaining authorization URL');
  }
});

routerGoogle.post('/codeForToken', async (req, res) => {
  const code = req.body.code;
  try {
    if (!code) {
      res.status(400).json({ error: 'Authorization code not provided.' });
      return;
    }
    const tokens = await exchangeCodeForToken(code);
    if (tokens.access_token) {
      const accessToken = tokens.access_token ?? '';
      const refreshToken = tokens.refresh_token ?? '';
      const userInfo = await getUserInfo(accessToken, refreshToken);
      await insertUserInfo(userInfo as any);
      res.json({ access_token: tokens.access_token, user_info: userInfo });
    } else {
      handleServerError(res, 'Error getting access token.');
    }
  } catch (error) {
    handleServerError(res, 'Server error.');
  }
});

export default routerGoogle;