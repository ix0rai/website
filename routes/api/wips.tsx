const json = [
    {
        name: "tantalising teas",
        type: "minecraft mod",
        description: "adds dynamic tea brewing to minecraft!",
        links: {
            main: "https://github.com/ix0rai/tantalising_teas",
            github: "https://github.com/ix0rai/rainglow"
        }
    },

]

export const handler = (_req: Request): Response => {
    return new Response(JSON.stringify(json), {
      headers: { "Content-Type": "application/json" },
    });
};