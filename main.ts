import { Application, Router } from "oak";
import { nanoid } from "nanoid";

interface ShortUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
  clicks: number;
}

const urls = new Map<string, ShortUrl>();
const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = { message: "URL Shortener API", version: "1.0.0" };
});

router.post("/api/shorten", async (ctx) => {
  const body = await ctx.request.body.json();
  const { url } = body;

  if (!url || typeof url !== "string") {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid URL" };
    return;
  }

  const id = nanoid(8);
  const shortUrl = `${ctx.request.url.origin}/${id}`;

  const shortUrlData: ShortUrl = {
    id,
    originalUrl: url,
    shortUrl,
    createdAt: new Date(),
    clicks: 0,
  };

  urls.set(id, shortUrlData);

  ctx.response.body = {
    id,
    shortUrl,
    originalUrl: url,
  };
});

router.get("/api/urls", (ctx) => {
  const allUrls = Array.from(urls.values());
  ctx.response.body = allUrls;
});

router.get("/api/urls/:id", (ctx) => {
  const { id } = ctx.params;
  const urlData = urls.get(id);

  if (!urlData) {
    ctx.response.status = 404;
    ctx.response.body = { error: "URL not found" };
    return;
  }

  ctx.response.body = urlData;
});

router.get("/:id", (ctx) => {
  const { id } = ctx.params;
  const urlData = urls.get(id);

  if (!urlData) {
    ctx.response.status = 404;
    ctx.response.body = { error: "URL not found" };
    return;
  }

  urlData.clicks++;
  urls.set(id, urlData);

  ctx.response.redirect(urlData.originalUrl);
});

router.delete("/api/urls/:id", (ctx) => {
  const { id } = ctx.params;
  const deleted = urls.delete(id);

  if (!deleted) {
    ctx.response.status = 404;
    ctx.response.body = { error: "URL not found" };
    return;
  }

  ctx.response.body = { message: "URL deleted successfully" };
});

const app = new Application();

app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, DELETE");
  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = 8000;
console.log(`Server running on http://localhost:${port}`);
await app.listen({ port });
