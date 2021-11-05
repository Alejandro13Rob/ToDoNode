import { MutationRegisterUserArgs, MutationUpdateUserArgs, MutationLoginArgs, MutationDeleteUserArgs } from './types';
import { hash, compare } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { userModel } from '../../models/userModel';
import jsonwebtoken from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
const jwtSECRET: string = process.env.JWT_SECRET!;

const resolvers = {
    Query: {
        async getUsers(root, args, { user }) {
            try {
                if(!user) throw new Error('You are not authenticated!');
                const users = await userModel.find().where('id').in(args.input.ids).exec();
                return users;
            } catch (error: any) {
                throw new Error(error);
            }
        },
        async getUser(root, args, { user }) {
            try {
                if(!user) throw new Error('You are not authenticated!')
                return await userModel.findOne({ id: args.id });
            } catch (error: any) {
                throw new Error(error);
            }
        },
        async me(root, args, { user }) {
            try {
                if(!user) throw new Error('You are not authenticated');
                return await userModel.findOne({ id: user.id });
            } catch (error: any) {
                throw new Error(error);
            }
        },
    },

    Mutation: {
        async registerUser(root, { name, mail, password }: MutationRegisterUserArgs) {
            const hashedPassword = await hash(password, 13);
            try {
                const user = { id: uuid(), name, mail, password: hashedPassword };
                await userModel.create(user);
                const token = jsonwebtoken.sign(
                    { id: user.id, mail: user.mail },
                    jwtSECRET,
                    { expiresIn: '1y' })
                return {
                    token, id: user.id, name: user.name, mail: user.mail, message: "Authentication succesfull"
                }
            } catch (error: any) {
                throw new Error(error);
            }
        },
        async updateUser(_, { name, mail, password }, { user }) {
            if(!user) throw new Error('You are not authenticated');
            let update = {}
            if ( name && mail && password){
                const hashedPassword = await hash(password, 13);
                update = { "name": name, "mail": mail, "password": hashedPassword };
            } else if (name && password) {
                const hashedPassword = await hash(password, 13);
                update = { "name": name, "password": hashedPassword };
            } else if (mail && password) {
                const hashedPassword = await hash(password, 13);
                update = { "mail": mail, "password": hashedPassword };
            }
            else if (name && mail) { update = { "name": name, "mail": mail } }
            else if (name) { update = { "name": name } }
            else if (mail) { update = { "mail": mail } }
            else if (password) { 
                const hashedPassword = await hash(password, 13)
                update = { "password": hashedPassword }
            } else {//nothing
                return 'Nothing updated';
            }
            try {
                const User = await userModel.findOneAndUpdate(
                    { "id": user.id } ,
                    { $set: update},
                    { new : true }
                )
                if (User) {
                    return User;
                } else {
                    throw new Error('Not found');
                }
            } catch (error: any) {
                throw new Error(error);
            }
        },
        async login(_, { mail, password }: MutationLoginArgs) {
            const user = await userModel.findOne({ mail: mail });
            const hashedPassword = await hash(password, 13);
            if (!user) {
                throw new Error("Invalid credentials");
            }
            const isValid = compare(hashedPassword, user.password);
            if (!isValid) {
                throw new Error("Invalid credentials");
            }
            // return jwt
            const token = jsonwebtoken.sign(
                { id: user.id, mail: user.mail},
                jwtSECRET,
                { expiresIn: '1y'})
            return { token, user }
        },
        async deleteUser(_, args, { user }) {
            try {
                if(!user) throw new Error('You are not authenticated');
                const find = await userModel.findOne({ id: user.id });
                if (find) {
                    const deleted = await userModel.findByIdAndDelete(find);
                    return deleted?.id;
                } else {
                    throw new Error('Not found');
                }
            } catch (error: any) {
                throw new Error(error);
            }
        },
    },
};

export { resolvers };
