import { HandlerContext } from "$fresh/server.ts";

export interface Project {
    name: string;
    type: string;
    description: string;
    links: LinkCollection;
}

export interface LinkCollection {
    main: string;
    github?: string;
    curseforge?: string;
    modrinth?: string;
}

const json = [
    {
        name: "rainglow",
        type: "minecraft mod",
        description: "make your glow squids gorgeous!",
        links: {
            main: "https://modrinth.com/mod/rainglow",
            github: "https://github.com/ix0rai/rainglow",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/rainglow",
            modrinth: "https://modrinth.com/mod/rainglow",
        }
    },
    {
        name: "bodacious berries",
        type: "minecraft mod",
        description: "berries for all!",
        links: {
            main: "https://modrinth.com/mod/berries",
            github: "https://github.com/ix0rai/bodacious_berries",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/bodacious-berries",
            modrinth: "https://modrinth.com/mod/berries",
        }
    }
]

export const handler = (_req: Request): Response => {
    return new Response(JSON.stringify(json), {
      headers: { "Content-Type": "application/json" },
    });
};