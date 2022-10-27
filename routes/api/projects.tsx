export interface Project {
    name: string;
    type: string;
    description: string;
    downloads: number;
    links: LinkCollection;
}

export interface LinkCollection {
    main: string;
    github: string;
    curseforge?: string;
    modrinth?: string;
}

const json = [
    {
        name: "rainglow",
        type: "minecraft mod",
        description: "make your glow squids gorgeous!",
        downloads: 0,
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
        downloads: 0,
        links: {
            main: "https://modrinth.com/mod/berries",
            github: "https://github.com/ix0rai/bodacious_berries",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/bodacious-berries",
            modrinth: "https://modrinth.com/mod/berries",
        }
    }
]

// todo caching

async function updateDownloads(project: Project, index: number) {
    interface GithubRelease {
        assets: [
            {
                download_count: number;
            }
        ]
    }

    // get from github api
    const repoName: string = project.links.github.split("com/").pop() as string;
    // only get data if it has changed
    const response = await fetch(`https://api.github.com/repos/${repoName}/releases`,
        {
            headers: {
                "If-None-Match": etags[index]
            }
        }
    );

    // 200 response means data has changed
    // 304 response means data has not changed
    if (response.status === 200 || etags[index] == undefined) {
        etags[index] = response.headers.get("ETag") as string;
            
        const releases: GithubRelease[] = await response.json();

        let downloadCount = 0;
        if (releases.length > 0) {
            for (const release of releases) {
                for (const asset of release.assets) {
                    downloadCount += asset.download_count;
                }
            }
        }

        downloads[index] = downloadCount
        return downloadCount;
    }
}

// etags tell us if the data has changed since the last request
const etags: string[] = [];
const downloads: number[] = [];

export const handler = (_req: Request): Response => {
    // generate latest download numbers
    json.map((project, index) => {
        updateDownloads(project, index);
    });

    json.map((project, index) => {
        project.downloads = downloads[index];
    });

    return new Response(JSON.stringify(json), {
      headers: { "Content-Type": "application/json" },
    });
};