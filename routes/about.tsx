import { tw } from "twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Project } from "./api/projects.tsx";
import { Link } from "./api/links.tsx";
import { handler as projectHandler } from "./api/projects.tsx";
import { handler as linkHandler } from "./api/links.tsx";
import { handler as wipHandler } from "./api/wips.tsx";


class PageData {
    projects: Project[];
    links: Link[];
    wips: Project[];

    constructor(projects: Project[], links: Link[], wips: Project[]) {
        this.projects = projects;
        this.links = links;
        this.wips = wips;
      }
}

export const handler: Handlers<PageData | null> = {
    async GET(req, ctx) {
      const projectResponse = await projectHandler(req);
      const projects: Project[] = await projectResponse.json();

      const linkResponse = await linkHandler(req);
      const links: Link[] = await linkResponse.json();

      const wipResponse = await wipHandler(req);
      const wips: Project[] = await wipResponse.json();

      return ctx.render(new PageData(projects, links, wips));
    },
};

export default function AboutPage({ data }: PageProps<PageData | null>) {
    if (!data) {
        return <h1>could not get data!</h1>;
    }

    const projectList = data.projects.map((project) => {
        return(
            <li key={project.name} class={
                tw({'list-none': true, })
            }>
                <a href={project.links.main} class={tw({underline: true,})}>{project.name} - {project.type}</a>
                <p>{project.description}</p>
                <p>downloads: {project.downloads == null || undefined? "not yet calculated" : project.downloads}</p>
                <p>links:</p>
                <ul>
                    {Object.entries(project.links).map(([name, link]) => {
                        if (name !== "main") {
                            return (
                                <li key={name}>
                                    <a href={link} class={tw({underline: true})}>{name}</a>
                                </li>
                            );
                        } else {
                            return null;
                        }
                    })}
                </ul>
            </li>
        );
    });

    const wipList = data.wips.map((project) => {
        return(
            <li key={project.name} class={
                tw({'list-none': true })
            }>
                <a href={project.links.main} class={tw({underline: true})}>{project.name} - {project.type}</a>
                <p>{project.description}</p>
                <p>links:</p>
                <ul>
                    {Object.entries(project.links).map(([name, link]) => {
                        if (name !== "main") {
                            return (
                                <li key={name}>
                                    <a href={link} class={tw({underline: true})}>{name}</a>
                                </li>
                            );
                        } else {
                            return null;
                        }
                    })}
                </ul>
            </li>
        );
    });
    
    const linkList = data.links.map((link) => {
        return (
            <li key={link.name} class={
                    tw({underline: true, 'list-none': true,})
                }>
                <a href={link.link}>{link.name}</a>
            </li>
        );
    });

    return (
        <html>
            <title>ix0rai | about</title>
            <div class="p-4 mx-auto max-w-screen-md" style="text-align:center">
                <h1>info on me, ix0rai!</h1>
                <br></br>
                <p>my pronouns:</p>
                <div class={
                    tw({ 'bg-purple-200': true, rounded: true,})
                }>
                    <h2>she/her</h2>
                </div>

                <br></br>

                <p>I'm currently learning:</p>
                <ul class={
                    tw({ 'bg-blue-200': true, rounded: true,})
                }>
                    <li>the rust programming language</li>
                    <li>web development with fresh</li>
                    <li>advanced minecraft modding</li>                
                </ul>

                <br></br>

                <p>my links:</p>
                <div class={tw({'bg-pink-200': true, rounded: true,})}>{linkList}</div>

                <br></br>

                <p>my projects:</p>
                <div class={tw({'bg-yellow-200': true, rounded: true,})}>{projectList}</div>

                <br></br>

                <p>my works in progress:</p>
                <div class={tw({'bg-red-200': true, rounded: true,})}>{wipList}</div>
            </div>
        </html>
    );
  }
  