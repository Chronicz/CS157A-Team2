import { NextResponse } from "next/server";
import util from "util";
import db from "../../../util/db";
import NextAuth from "../../../auth"
import CredentialsProvider from "next-auth/providers/credentials";
//import { handlers } from "../../../auth";
const dotenv = require("dotenv")
dotenv.config();
const query = util.promisify(db.query).bind(db);


export const authOption = async() => {
    session: {
        strategy: 'jwt'
    }
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }
                let user = await query(`SELECT * FROM cozyfirm.user WHERE username = '${credentials.username}'`);
                user = user[0];

                if (!user) {
                    return null;
                }
                if (user.password) {
                    return user.password === credentials.password ? user : null;
                }
            }
        })
    ],
    secret;
}
const handler = NextAuth(authOption);
export const {GET, POST} = handler;