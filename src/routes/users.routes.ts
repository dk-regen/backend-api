import { Router } from 'express';
import {body, check, validationResult} from 'express-validator';
const router = Router();

import {registration, login, getToken} from '../controllers/users.controller';

router.route('/registration')
        .post(
            body('firstName').not().isEmpty().withMessage("can't empty")
            .isLength({min: 2, max: 20}).withMessage("min 2 character, max 20 character")
            .isAlpha().withMessage('alphabet only').trim().escape(),
            body('lastName').not().isEmpty().withMessage("can't empty")
            .isLength({min: 2, max: 20}).withMessage("min 2 character, max 20 character")
            .isAlpha().withMessage('alphabet only').trim().escape(),
            body('dateOfBirth').not().isEmpty().withMessage("can't empty")
            .isDate().withMessage('Invalid date format'),
            body('streetAddress').not().isEmpty().withMessage("can't empty")
            .isLength({min: 5, max: 40}).withMessage("min 5 character, max 40 character")
            .matches(/^[a-z0-9 ]+$/i).withMessage('Only number & alphabet allowed').trim().escape(),
            body('city').not().isEmpty().withMessage("can't empty")
            .isLength({min: 2, max: 20}).withMessage("min 2 character, max 20 character")
            .isAlpha().withMessage('alphabet only').trim().escape(),
            body('province').not().isEmpty().withMessage("can't empty").trim().escape(),
            body('telephoneNumber').not().isEmpty().withMessage("can't empty")
            .isMobilePhone(['id-ID']).withMessage("invalid phone number"),
            body('emailAddress').not().isEmpty().withMessage("can't empty")
            .isEmail().withMessage("Invalid email address"),
            body('password').not().isEmpty().withMessage("can't empty")
        , registration);

router.route('/login')
        .post(
            body('emailAddress').not().isEmpty().withMessage("can't empty"),
            body('password').not().isEmpty().withMessage("can't empty")
        , login);

router.route('/token')
        .get(
            check('userId').not().isEmpty().withMessage("can't empty"),
            check('emailAddress').not().isEmpty().withMessage("can't empty")
        , getToken);

export default router;