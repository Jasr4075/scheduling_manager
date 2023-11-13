import { google, Auth } from 'googleapis';
import Users from '../models/Users'

export const REDIRECT_URI = "http://localhost:3000/customer/home";
const AUTH_SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

export const googleCredentials = {
  client_id: process.env.GOOGLE_CLIENT_ID || 'default_client_id',
  client_secret: process.env.GOOGLE_CLIENT_SECRET || 'default_client_secret',
};


export async function getAuthUrl(oauth2Client: Auth.OAuth2Client) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: AUTH_SCOPES,
  });
  return authUrl;
}

export async function makeOAuth2Client(keys: { client_id: string, client_secret: string }) {
  return new google.auth.OAuth2({
    clientId: keys.client_id,
    clientSecret: keys.client_secret,
    redirectUri: REDIRECT_URI,
  });
}

export async function exchangeCodeForToken(code: string) {
  const oauth2Client = await makeOAuth2Client(googleCredentials);
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log(tokens);
    return tokens;
  } catch (error) {
    throw error;
  }
}

export async function getUserInfo(accessToken: string, refreshToken: string) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
  const people = google.people({ version: 'v1', auth: oauth2Client });
  try {
    const userInfoResponse = await people.people.get({
      resourceName: 'people/me',
      personFields: 'names,emailAddresses,phoneNumbers',
    });
    const userInfo = userInfoResponse.data;
    console.log(userInfo);
    const token = refreshToken;
    const displayName = userInfo.names ? userInfo.names[0]?.displayName : '';
    const emailAddress = userInfo.emailAddresses ? userInfo.emailAddresses[0]?.value : '';
    const phoneNumber = userInfo.phoneNumbers ? userInfo.phoneNumbers[0]?.value : '';
    const user = {
      email: emailAddress || '',
      name: displayName,
      phone: phoneNumber || '',
      role: 'customer',
      token,
      taxIdentificationNumber: '',
    };
    console.log(user);
    return user;
  } catch (error) {
    console.error('Error getting user information', error);
    throw error;
  }
}

export async function insertUserInfo(user: Users) {
  try {
    const newUser = await Users.create(user);
  } catch (error) {
    throw error;
  }
}