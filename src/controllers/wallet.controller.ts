import {Request, Response} from 'express';
import walletService from '../services/wallet.services';
import {verify} from 'jsonwebtoken'
import { getRepository } from 'typeorm';
import { UserWallet } from '../entities/userWallet.entity';
import { RefreshToken } from '../entities/refreshToken.entity';


export async function getBalance(req: Request, res: Response) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    const userId = req.query.userId ? parseInt(req.query.userId as string) : null;
    if (!userId) return res.status(400).send({ message: 'userId is required as query parameter.' });

    const checkTokenValidity = await getRepository(RefreshToken).findOne({userId: userId, token: token as string});
    if (checkTokenValidity){
        const userWallet = await getRepository(UserWallet).findOne({userId: userId})
        if (userWallet) {
            delete userWallet.id;
            return res.status(200).json(userWallet);
        } else {
            return res.status(400).json({ 
                message: "Something error"});
        }
    } else {
        return res.status(406).send({ auth: false, message: 'Failed to authenticate token.' });
    }

}

export async function topUpBalance(req: Request, res: Response) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    const checkTokenValidity = await getRepository(RefreshToken).findOne({userId:req.body.userId, token: token as string});
    if (checkTokenValidity){
        const transaction = await walletService.createTransaction(req.body.userId, req.body.amount, 0, 0);
        if (transaction){
            const userWallet = await walletService.topUp(req.body.userId, req.body.amount);
            if (userWallet) {
                delete userWallet.id;
                delete transaction.id;
                return res.status(200).json({
                    wallet: userWallet,
                    transaction: transaction
                });
            } else {
                return res.status(400).json({ 
                    message: "error please try again later"});
            }
        } else {
            return res.status(400).json({ 
                message: "error please try again later"});
        }
        
    } else {
        return res.status(406).send({ auth: false, message: 'Failed to authenticate token.' });
    }

}

export async function makePayment(req: Request, res: Response) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    const checkTokenValidity = await getRepository(RefreshToken).findOne({userId:req.body.userId, token: token as string});
    if (checkTokenValidity){
        const wallet = await getRepository(UserWallet).findOne({userId:req.body.userId}); 

        if (wallet ){
            if (wallet.balance >= req.body.amount ){
                const transaction = await walletService.createTransaction(req.body.userId, req.body.amount, req.body.merchantId, 1);
                if (transaction){
                    const userWallet = await walletService.payment(req.body.userId, req.body.amount);
                    if (userWallet) {
                        delete userWallet.id;
                        delete transaction.id;
                        return res.status(200).json({
                            wallet: userWallet,
                            transaction: transaction
                        });
                    } else {
                        return res.status(400).json({ 
                            message: "error please try again later"});
                    }
                } else {
                    return res.status(400).json({ 
                        message: "error please try again later"});
                }
            } else {
                return res.status(400).json({ 
                    message: "not enough balance"});
            }
        } else {
            return res.status(400).json({ 
                message: "error please try again later"});
        }
        
        
    } else {
        return res.status(406).send({ auth: false, message: 'Failed to authenticate token.' });
    }

}