import {getRepository} from 'typeorm';
import { UserWallet } from '../entities/userWallet.entity';
import { Transaction } from '../entities/transaction.entity';

export const generateNumber = () => {
    let str = "";
    const char = '123456789';
    for (let i = 0; i < 8; i += 1) {
        str += char.charAt(Math.floor(Math.random() * char.length));
      }
      return Number(str);
}

const createWallet = async (
    userId:number,
) => {
    const userWallet = new UserWallet();
    userWallet.userId = userId;
    userWallet.balance = 0;
    userWallet.accountNumber = generateNumber();
    return await getRepository(UserWallet).save(userWallet);
};

const topUp = async (
    userId:number,
    amount:number
) => {
    const userWallet = await getRepository(UserWallet).findOne({userId:userId});
    if (userWallet){
        userWallet.balance += amount;
        await getRepository(UserWallet).save(userWallet);

        return userWallet;
    } else {
        return null;
    }
};

const payment = async (
    userId:number,
    amount:number
) => {
    const userWallet = await getRepository(UserWallet).findOne({userId:userId});
    if (userWallet){
        userWallet.balance -= amount;
        await getRepository(UserWallet).save(userWallet);

        return userWallet;
    } else {
        return null;
    }
};

const createTransaction = async (
    userId:number,
    amount:number,
    merchantId:number,
    type:number
) => {
    const transaction = new Transaction()
    transaction.userId = userId;
    transaction.merchantId = merchantId;
    transaction.amount = amount;
    transaction.type = type;

    return await getRepository(Transaction).save(transaction);
};

export default {
    createWallet,
    topUp,
    createTransaction,
    payment
};