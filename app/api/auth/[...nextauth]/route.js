import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const handlers  = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (credentials.email === "admin@gmail.com" && credentials.password === "12345678") {
                    return { id: "1", name: "kelvin", email: "kelvin@gmail.com" };
                }
                return null
            }
        })
    ],
    pages: {
        logIn: '/admin',
    },
});

export { handlers as GET, handlers as POST}