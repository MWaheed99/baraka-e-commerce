import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Baraka",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
				password: { label: "Password", type: "password", placeholder: "********" },
			},
			async authorize(credentials, req) {
				const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password,
					}),
					cache: "no-store",
				});

				const json = await res.json();

				const decodedToken = jwtDecode<{ id: string }>(json?.token);

				if (!res.ok) {
					return null;
				} else {
					return {
						id: decodedToken.id,
						name: json?.user?.name,
						email: json?.user?.email,
						token: json?.token,
					};
				}
			},
		}),
	],

	callbacks: {
		jwt({ token, user }) {
			// console.log("user and token", user , token);

			if (user) {
				token.accessToken = user?.token;
				token.user = {
					id: user?.id,
					name: user?.name,
					email: user?.email,
				};
			}

			return token;
		},

		session({ session, token }) {
			if (token) {
				session.user = token?.user;
			}

			return session;
		},
	},

	pages: {
		signIn: "/login",
	},
};
