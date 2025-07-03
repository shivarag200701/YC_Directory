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
      const existingUser = await client.fetch(AUTHOR_BY_GOOGLE_ID_QUERY,{id:user.id})
      
      if(!existingUser){
        await writeClient.create({
          _type:"author",
          _id:user.id,
          name:profile?.name,
          username:profile?.name,
          email:user.email,
          image:profile?.image,
          bio:profile?.bio || "",
        })
      }
      return true 
    }
  }
});
