import { Issuer } from "openid-client";
import axios from 'axios';
import express from 'express';
import Users from '../models/Users'

export const Auth0Credentials = {
    client_id: process.env.AUTH_CLIENT_ID || 'default_client_id',
    client_secret: process.env.AUTH_CLIENT_SECRET || 'default_client_secret',
    auth_issuer: process.env.AUTH_ISSUER || 'default_auth_issuer',
};

export async function generateAuthUrl(req: express.Request, res: express.Response) {
    try {
    const auth0Issuer = await Issuer.discover(Auth0Credentials.auth_issuer);
    const client = new auth0Issuer.Client({
        client_id: Auth0Credentials.client_id,
    });
    const authUrl = client.authorizationUrl({
        redirect_uri: 'http://localhost:3000/sso/home',
        scope: 'openid profile email',
    });
    console.log(authUrl);
    res.json({ authUrl });
    } catch (error) {
    res.status(500).json({ error: error });
    }
}

function UserInfo(userinfo: any, accessToken: string) {
    const email = userinfo.email || '';
    const name = userinfo.name || '';
    const photo = userinfo.picture || '';
    const token = accessToken;
    const user = {
        email,
        name,
        photo,
        phone: '',
        role: 'superadmin',
        token,
        taxIdentificationNumber: '',
    };
    return user;
}

export async function exchangeCodeForToken(req: express.Request, res: express.Response) {
    const code = req.body.code;
    if (!code) {
        return res.status(400).json({ error: 'error' });
    }
    const scopes = 'openid profile email';
    try {
        const tokenExchangeUrl = `${Auth0Credentials.auth_issuer}/oauth/token`;
        const data = {
            client_id: Auth0Credentials.client_id,
            client_secret: Auth0Credentials.client_secret,
            code,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:3000/sso/home',
            scope: scopes,
        };
        const response = await axios.post(tokenExchangeUrl, data);

        const accessToken = response.data.access_token;
        const userinfo = await getUserInfo(accessToken);

        const user = UserInfo(userinfo, accessToken);
        const existingUser = await Users.findOne({where: {email: user.email}});
        if (existingUser) {
            return res.json({
                access_token: accessToken,
                user_info: userinfo,
                user: existingUser,
            });
        }else {
            await insertUserInfo(user as any);
        }

        res.json({
            access_token: accessToken,
            user_info: userinfo,
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error' });
    }
}

export async function getUserInfo(accessToken: string) {
    try {
        const auth0Issuer = await Issuer.discover(Auth0Credentials.auth_issuer);
        const client = new auth0Issuer.Client({
            client_id: Auth0Credentials.client_id,
            client_secret: Auth0Credentials.client_secret,
        });
        
        const userinfo = await client.userinfo(accessToken);
        return userinfo;
        
    } catch (error) {
        console.error(error);
        throw new Error('error');
    }
}

export async function insertUserInfo(user: Users) {
    try {
        const newUser = await Users.create(user);
    } catch (error) {
        throw error;
    }
}