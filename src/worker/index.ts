import { Hono } from "hono";
// import { getCookie, setCookie } from "hono/cookie";
// import jwt from "jsonwebtoken";

interface Env {
  JWT_SECRET: string;
}

// Store user in context
interface User {
  id: string;
  email: string;
  name: string;
}

// Hono context with store
interface AppContext {
  user?: User;
}

const app = new Hono<{ Bindings: Env; ContextStore: AppContext }>();

// ----- Auth Middleware -----
// const authMiddleware = async (c: typeof app.ctx, next: () => Promise<any>) => {
//   const token = getCookie(c, "SESSION_TOKEN");
//   if (!token) return c.json({ error: "Unauthorized" }, 401);

//   try {
//     const user = jwt.verify(token, c.env.JWT_SECRET) as User;
//     c.set("user", user);
//     await next();
//   } catch (err) {
//     return c.json({ error: "Invalid token" }, 401);
//   }
// };

// ----- Login Route -----
// app.post("/api/login", async (c) => {
//   const body = (await c.req.json()) as User;

//   const token = jwt.sign(body, c.env.JWT_SECRET, { expiresIn: "60d" });

//   setCookie(c, "SESSION_TOKEN", token, {
//     httpOnly: true,
//     path: "/",
//     sameSite: "none",
//     secure: true,
//     maxAge: 60 * 24 * 60 * 60,
//   });

//   c.set("user", body);
//   return c.json({ success: true, token, user: body });
// });

// ----- Protected Route -----
// app.get("/api/users/me", authMiddleware, (c) => {
//   const user = c.get("user");
//   return c.json(user);
// });

export default app;
