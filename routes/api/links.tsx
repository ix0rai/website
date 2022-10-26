export interface Link {
    name: string;
    link: string;
}

const json = [
    {
        name: "tumblr",
        link: "https://ix0rai.tumblr.com/",
    },
    {
        name: "twitter",
        link: "https://twitter.com/ix0rai",
    },
    {
        name: "modrinth",
        link: "https://modrinth.com/user/ix0rai/",
    },
    {
        name: "curseforge",
        link: "https://www.curseforge.com/members/ix0rai",
    },
    {
        name: "github",
        link: "https://github.com/ix0rai",
    },
    {
        name: "steam",
        link: "https://steamcommunity.com/id/ix0rai/",
    },
    {
        name: "twitch",
        link: "https://www.twitch.tv/ix0rai/",
    },
    {
        name: "youtube",
        link: "https://youtube.com/@ix0rai",
    },
    {
        name: "email",
        link: "mailto:ix0rai64@gmail.com",
    },
    {
        name: "pronouns",
        link: "https://en.pronouns.page/@ix0rai",
    }
]

export const handler = (_req: Request): Response => {
    return new Response(JSON.stringify(json), {
      headers: { "Content-Type": "application/json" },
    });
};