import axios from "axios";
import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = {
  [key in keyof CloudflareBindings]: CloudflareBindings[key];
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("/*", cors());

app.get("/", async (c) => {
  const url = c.req.query("url");

  if (!url?.startsWith("https://news.ycombinator.com/item?id=")) {
    return c.json(
      {
        message: "Invalid URL",
      },
      400
    );
  }

  const fullJson = await axios.get(url!);

  const comments = fullJson.data.match(
    /<div class="commtext c00">(.*?)<\/div>/gs
  );

  if (!comments) {
    return c.json(
      {
        message: "No comments found",
      },
      404
    );
  }

  const textComments = comments.map((comment: any) =>
    comment.replace(/<div class="commtext c00">|<\/div>/gs, "")
  );
  const topComments = textComments.slice(0, 5);

  // console.log(topComments);

  const response = await c.env.AI.run("@cf/mistral/mistral-7b-instruct-v0.1", {
    prompt: `AI, please summarize the top 5 comments from the given HackerNews thread that is : ${topComments}. Provide a concise summary, capturing the main points and arguments made by the users. Ensure that the summaries are unbiased, coherent, and maintain the original context.`,
  });

  console.log(response);
  return c.json({ message: response }, 200);
});

export default app;
