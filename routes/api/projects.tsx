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

async function updateDownloads(project: Project, index: number) {
    interface GithubRelease {
        assets: [
            {
                download_count: number;
            }
        ]
    }

    interface ModrinthProject {
        downloads: number;
    }

    // initialize the download count at 0
    let downloadCount = 0;

    // get from modrinth api
    if (project.links.modrinth != undefined) {
        const modrinthName = project.links.modrinth.split("mod/").pop() as string;
        const response = await fetch(`https://api.modrinth.com/v2/project/${modrinthName}`,
            {
                headers: {
                    "If-None-Match": modrinthEtags[index]
                }
            }
        );

        // 200 response means data has changed
        // 304 response means data has not changed
        if (response.status === 200 || modrinthEtags[index] == undefined) {
            modrinthEtags[index] = response.headers.get("ETag") as string;
            const project: ModrinthProject = await response.json();
            
            downloadCount += project.downloads;
        }
    }


    // get from github api
    const repoName = project.links.github.split("com/").pop() as string;
    // only get data if it has changed
    const response = await fetch(`https://api.github.com/repos/${repoName}/releases`,
        {
            headers: {
                "If-None-Match": githubEtags[index]
            }
        }
    );

    // 200 response means data has changed
    // 304 response means data has not changed
    if (response.status === 200 || githubEtags[index] == undefined) {
        githubEtags[index] = response.headers.get("ETag") as string;
            
        const releases: GithubRelease[] = await response.json();

        if (releases.length > 0) {
            for (const release of releases) {
                for (const asset of release.assets) {
                    downloadCount += asset.download_count;
                }
            }
        }

        downloads[index] = downloadCount
    }
}

// etags tell us if the data has changed since the last request
const githubEtags: string[] = [];
const modrinthEtags: string[] = [];
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