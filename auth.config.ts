import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import z from "zod";

export const authConfig = {
    trustHost: true,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isOndashBoard = nextUrl.pathname.startsWith('/dashboard');
            if(isOndashBoard){
                if(isLoggedIn) return true;
                return false; // return users to login;
            }else if(isLoggedIn){
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        }
    },
    providers:[]
} satisfies NextAuthConfig;