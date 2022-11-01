export interface Project {
    name: string;
    id: string;
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

export const json = [
    {
        name: "rainglow",
        id: "rainglow",
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
        id: "bodacious_berries",
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
    // modrinth api doesn't support etags so we always call
    if (project.links.modrinth != undefined) {
        const modrinthName = project.links.modrinth.split("mod/").pop() as string;
        const response = await fetch(`https://api.modrinth.com/v2/project/${modrinthName}`);

        const modrinthProject: ModrinthProject = await response.json();
        downloadCount += modrinthProject.downloads - (firstRun ? 0 : cachedModrinthDownloads[index]);
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
    if (response.status === 200 || githubEtags[index] == "") {
        githubEtags[index] = response.headers.get("ETag") as string;
        const releases: GithubRelease[] = await response.json();

        let githubDownloads = 0;

        if (releases.length > 0) {
            for (const release of releases) {
                for (const asset of release.assets) {
                    githubDownloads += asset.download_count;
                }
            }
        }

        downloadCount += githubDownloads - (firstRun ? 0 : cachedGithubDownloads[index]);
        cachedGithubDownloads[index] = githubDownloads;
    } else {
        downloadCount += cachedGithubDownloads[index];
    }

    downloads[index] = downloadCount;
    firstRun = false;
}

// etags tell us if the data has changed since the last request
const githubEtags: string[] = [];

// cached downloads
const downloads: number[] = [];
const cachedGithubDownloads: number[] = [];
const cachedModrinthDownloads: number[] = [];

// whether it's the first run
let firstRun = true;

// initialise arrays
json.map((project, index) => {
    project.downloads = 0;
    downloads[index] = 0;
    cachedGithubDownloads[index] = 0;
    cachedModrinthDownloads[index] = 0;
});

export const handler = async (): Promise<Response> => {
    // generate latest download numbers
    const requests = json.map(async (project, index) => {
        await updateDownloads(project, index);
        project.downloads = downloads[index];
    });

    return await Promise.allSettled(requests).then(() => {
        return new Response(JSON.stringify(json), {
            headers: { "Content-Type": "application/json" },
        });
    });
};