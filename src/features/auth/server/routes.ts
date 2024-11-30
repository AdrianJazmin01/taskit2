import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../schemas";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constants";
import { sessionMiddleware } from "@/lib/session-mddleware";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const app = new Hono ()

  .get("/current", sessionMiddleware,
    (c) =>{
      const user = c.get("user");

      return c.json({data:user});
    }
  )


//LOGIN
  .post(
    "/login", zValidator("json", loginSchema),
     async (c) =>{
      const {email, password} = c.req.valid("json");
      const { account } = await createAdminClient();

      const session =  await account.createEmailPasswordSession(
        email,
        password,
      );
      
    setCookie(c, AUTH_COOKIE, session.secret,{
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60*60*24*30,
    });
  
    return c.json({ success: true })
  })
  
  //REGISTER
  .post(
  "/register",
  zValidator("json", registerSchema),
  async (c) =>{
    const {name, email, password} = await c.req.valid("json");
    const { account } = await createAdminClient();
    const user = await account.create(
      ID.unique(),
      email,
      password,
      name,
    );

    const session = await account.createEmailPasswordSession(
      email,
      password,
    );

    setCookie(c, AUTH_COOKIE, session.secret,{
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60*60*24*30,
    });

  return c.json({ data : user});
})

.post(
  "/logout", sessionMiddleware,
   async (c) => {
    const account = c.get("account"); 

    deleteCookie(c, AUTH_COOKIE) 
    await account.deleteSession("current");
    
    return c.json({ success: true })
  })

  
  .post(
    "/forgot-password",
    zValidator("json", forgotPasswordSchema),
    async (c) => {
      const { email } = c.req.valid("json");
      const { users } = await createAdminClient();
  
      try {
        // Check if the user exists
        const userList = await users.list([
          `email=${email}`, // Correctly pass the query as an array of strings
        ]);
  
        if (userList.total === 0) {
          return c.json({ error: "User not found" }, 404);
        }
  
        const user = userList.users[0]; // Fetch the first matching user
  
        // Generate a reset token (mock implementation)
        const resetToken = generateResetToken();
  
        // Send the reset email (mock implementation)
        await sendResetEmail(email, resetToken);
  
        return c.json({ message: "Reset email sent successfully" });
      } catch (error) {
        console.error("Forgot Password Error:", error);
        return c.json({ error: "An error occurred while processing your request" }, 500);
      }
    }
  );
  
  // Function to generate a mock reset token
  function generateResetToken(): string {
    return Math.random().toString(36).substr(2, 12); // Simple token for demonstration
  }
  
  async function sendResetEmail(email: string, resetToken: string): Promise<void> {
    const { account } = await createAdminClient();
  
    try {
      await account.createRecovery(
        email,
        process.env.NEXT_PUBLIC_APP_URL + "/reset-password"// Replace with your reset password page
      );
  
      console.log(`Password reset email sent to ${email}`);
    } catch (error) {
      console.error("Error sending reset email:", error);
      throw new Error("Failed to send password reset email");
    }
  }
  
  
  

export default app;

