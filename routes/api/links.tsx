import { Handlers } from "$fresh/server.ts";

export interface Link {
    name: string;
    link: URL;
}

const json = [
    {
        name: "modrinth",
        link: new URL("https://modrinth.com/user/ix0rai/"),
    }
]

export const handler: Handlers = {
  GET() {
    return new Response(JSON.stringify(json), {
      headers: { "Content-Type": "application/json" },
    });
  },
};