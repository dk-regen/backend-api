import { Router } from 'express';
import {body, check, validationResult} from 'express-validator';
const router = Router();

import {getBalance, topUpBalance, makePayment} from '../controllers/wallet.controller';

router.route('/balance')
.get(getBalance);

router.route('/topup')
.post(topUpBalance);

router.route('/payment')
.post(makePayment);


export default router;