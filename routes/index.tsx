import { Handlers } from "$fresh/server.ts";

export default function Home() {
  return (
    <></>
  );
}

export const handler: Handlers = {
  GET() {
    return new Response("", {
      status: 308,
      headers: { Location: "/about" },
    });
  },
};