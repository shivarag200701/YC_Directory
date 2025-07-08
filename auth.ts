import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GOOGLE_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks:{
    async signIn({user,account,profile}){
      // Use profile.sub as the Google ID (this is the standard OAuth field)
      const googleId = profile?.sub || user.id;
      
      const existingUser = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GOOGLE_ID_QUERY,{id: googleId})
      
      if(!existingUser){
        await writeClient.create({
          _type:"author",
          _id:googleId,
          id: googleId, // Store Google ID as string
          name: user.name,
          username: user.name?.toLowerCase().replace(/\s+/g, '_') || `user_${googleId}`, // Generate unique username
          email: user.email,
          image: user.image,
          bio: "", // Google doesn't provide bio
        })
      }
      return true 
    },
    async jwt({token,account,profile}){  
      if(account && profile){
        const googleId = profile?.sub || token.sub;
        const user = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GOOGLE_ID_QUERY,{id: googleId})
        if(user) {
          token.id = user.id
        }
      }
      return token
    },
    async session({session,token}){
      Object.assign(session, {id:token.id})
      return session
    }
  },
  
});
