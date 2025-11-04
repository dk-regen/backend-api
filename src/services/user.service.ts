import {getRepository} from 'typeorm';
import {User} from '../entities/user.entity';
import {hash, compare} from 'bcrypt';
import { UserLoginHistory } from '../entities/userLoginHistory.entity';
import useragent from 'express-useragent';
import {sign} from 'jsonwebtoken';
import { RefreshToken } from '../entities/refreshToken.entity';

const register = async (
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    streetAddress: string,
    city: string,
    province: string,
    telephoneNumber: string,
    emailAddress: string,
    password: string,
    registrationDate: Date
) => {
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.dateOfBirth = dateOfBirth;
    newUser.streetAddress = streetAddress;
    newUser.city = city;
    newUser.province = province;
    newUser.telephoneNumber = telephoneNumber;
    newUser.emailAddress = emailAddress;
    newUser.password = await hash(password as string, 12);
    newUser.registrationDate = registrationDate;
    return await getRepository(User).save(newUser);
};

const getUserByEmail = async (
    emailAddress: string
  ) => {
    try {
      return await getRepository(User).findOne({ emailAddress });
    } catch (e) {
      return null;
    }
  };

const login = async (email:string, password: string, source: string) => {
    const user = await getUserByEmail(email);
    console.log(user);
    if (user) {
        const passMatch = await compare(password, user.password as string);
        if (!passMatch){
            await createLoginHistory(source, user.id, 0);
            return null;
        } else {
            await createLoginHistory(source, user.id, 1);
            delete user.password;
            return user;
        }
    }
};

const createLoginHistory = async (
    source: string,
    userId: number,
    status: number
) => {
    var ua = useragent.parse(source);
    const history = new UserLoginHistory();
    history.userId = userId;
    history.browser = ua.browser;
    history.version = ua.version;
    history.os = ua.os;
    history.platform = ua.platform;
    history.source = ua.source;
    history.status = status;
    history.loginDate = new Date();
    return await getRepository(UserLoginHistory).save(history);
};

const generateToken = async (
    userId:number
) => {
    const token = sign({id: userId}, "verySecret");
    insertToken(userId, token);
};

const insertToken = async (
    userId:number,
    token:string
) => {
    const refToken = new RefreshToken();
    refToken.userId = userId;
    refToken.token = token;
    return await getRepository(RefreshToken).save(refToken);
};

export default {
    register,
    login,
    createLoginHistory,
    generateToken
};