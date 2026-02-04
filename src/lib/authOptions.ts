
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  pages: {
    signIn: "/sign_in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        //  get user
        const user: any = await login({
          data: {
            email: credentials?.email,
            password: credentials.password
          }
        });

        console.log(user, '{{{{{{{{{{{{ user {{{{{{{{{{{{{{{{{{{{{{{{{{{{')

        if (user?.token) {
          return {
            id: user?.user?.id,
            email: user?.user?.email,
            name: user?.user?.name,
            role: user?.user?.role,
            isVerified: user?.user?.isVerified,
            token: user?.token,
            phone: user?.user?.phone,
          };
        } else {
          return null;
        }
      },
    }),

  ],
  // debug: true,
  secret: process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET,
  callbacks: {
    //@ts-ignore
    async jwt({ token, user }) {
      if (user) {
        // Assign user properties to token
       token.id = user.id;
       token.email = user.email;
       token.name = user.name;
       token.role = user.role;
       token.isVerified = user.isVerified;
       token.token = user.token;
       token.phone = user.phone;
      }
      return token;
    },
    //@ts-ignore
    async session({ session, token }) {
      if (token) {
        // Assign token properties to session
        session.user.email = token.email;
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.isVerified = token.isVerified;
        session.user.token = token.token;
        session.user.phone = token.phone;
      }
      return session;
    },
  },
};

export default authOptions;


interface IUserLogin {
    email: string;
    password: string;
}


 export async function login({data}: {data: IUserLogin}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        console.log(response, 'response ==========================');
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return error;
        
    }
    
 }



