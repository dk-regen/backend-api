import {Request, Response} from 'express';
import {hash, compare} from 'bcrypt';
import {body, check, validationResult} from 'express-validator';
import useragent from 'express-useragent';

import {connect} from '../database';
import userService from '../services/user.service';
import walletService from '../services/wallet.services';
import { getRepository } from 'typeorm';
import { RefreshToken } from '../entities/refreshToken.entity';
import { User } from '../entities/user.entity';


export async function registration(req: Request, res: Response) {
    let user;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "data not complete",
            errors: errors.array() });
    }


    try {
        user = await userService.register(
            req.body.firstName,
            req.body.lastName,
            req.body.dateOfBirth,
            req.body.streetAddress,
            req.body.city,
            req.body.province,
            req.body.telephoneNumber,
            req.body.emailAddress,
            req.body.password,
            new Date()
        );
    } catch (e: any) {
        console.error('Registration error:', e);
        if (e.code==='ER_DUP_ENTRY'){
            return res.status(400).json({ 
                message: "email already in use"});
        }
        return res.status(400).json({ 
            message: "Registration failed",
            error: e.message || String(e)
        });
    }

    if (user){
        userService.generateToken(user.id);
        walletService.createWallet(user.id);
        delete user.password;
        return res.status(201).json(user);
    } else {
        return res.status(400).json({ 
            message: "Something error"});
    }
    
}

export async function login(req: Request, res: Response) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "data not complete",
            errors: errors.array() });
    }

    var source = req.headers['user-agent'] as string;

    const user = await userService.login(
        req.body.emailAddress,
        req.body.password,
        source
    );

    if (user){
        return res.status(200).json(user);
    } else {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }
}

export async function getToken(req: Request, res: Response) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "data not complete",
            errors: errors.array() });
    }

    const users = await getRepository(User).findOne({id: req.body.userId, emailAddress: req.body.emailAddress});
    if (users) {
        const token = await getRepository(RefreshToken).findOne({userId: req.body.userId});

        if (token){
            delete token.id;
            return res.status(200).json(token);
        } else {
            return res.status(401).json({
                message: "no token, please login first with your email and password",
            });
        }    
    } else {
        return res.status(404).json({
            message: "User not found",
        });
    }

    
}