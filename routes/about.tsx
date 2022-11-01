import { tw } from "twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import Projects from "../islands/Projects.tsx"
import { handler as projectHandler, Project } from "./api/projects.tsx";
import { handler as linkHandler, Link } from "./api/links.tsx";
import { handler as wipHandler } from "./api/wips.tsx";

class PageData {
    projectRequest: Promise<Response>;
    links: Link[];
    wips: Project[];

    constructor(projectRequest: Promise<Response>, links: Link[], wips: Project[]) {
        this.projectRequest = projectRequest;
        this.links = links;
        this.wips = wips;
      }
}

export const handler: Handlers<PageData | null> = {
    async GET(req, ctx) {
      const projectRequest = projectHandler();

      const linkResponse = await linkHandler(req);
      const links = await linkResponse.json();

      const wipResponse = await wipHandler(req);
      const wips = await wipResponse.json()

      return ctx.render(new PageData(projectRequest, links, wips));
    },
};

export default function AboutPage({ data }: PageProps<PageData | null>) {
    if (!data) {
        return <h1>could not get data!</h1>;
    }

    const date = new Date();
    date.setHours(date.getHours() + 1);
    const projectList = <Projects/>;

    const wipList = data.wips.map((project, index) => {
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
                {index === data.wips.length - 1 ? null : <br></br>}
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
                    tw({ 'bg-purple-200': true, rounded: true, 'p-2.5': true})
                }>
                    <h2>she/her</h2>
                </div>

                <br></br>

                <p>I'm currently learning:</p>
                <ul class={
                    tw({ 'bg-blue-200': true, rounded: true, 'p-2.5': true,})
                }>
                    <li>the rust programming language</li>
                    <li>web development with fresh</li>
                    <li>advanced minecraft modding</li>                
                </ul>

                <br></br>

                <p>my links:</p>
                <div class={tw({'bg-pink-200': true, rounded: true, 'p-2.5': true})}>{linkList}</div>

                <br></br>

                <p>my projects:</p>
                <div class={tw({'bg-yellow-200': true, rounded: true, 'p-2.5': true})}>{projectList}</div>

                <br></br>

                <p>my works in progress:</p>
                <div class={tw({'bg-red-200': true, rounded: true, 'p-2.5': true})}>{wipList}</div>
            </div>
        </html>
    );
  }
  