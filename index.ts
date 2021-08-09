import "https://deno.land/x/dotenv/load.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import Blogs from "./routes/blogs.ts";
import Podcasts from "./routes/podcasts.ts";
import Socials from "./routes/socials.ts";

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = {
      blogs: "/blogs",
      podcasts: "/podcasts",
      socials: "/socials"
    };
  })
  .get("/blogs", Blogs)
  .get("/podcasts", Podcasts)
  .get("/socials", Socials);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = Number(Deno.env.get('PORT')) || 3000;
console.log(`Listening on http://localhost:${PORT}`);
await app.listen({ port: PORT });
