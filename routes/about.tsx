import { tw } from "twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Project } from "./api/projects.tsx";
import { handler as projectHandler } from "./api/projects.tsx";

export const handler: Handlers<Project[] | null> = {
    async GET(req, ctx) {
      const response = await projectHandler(req);
      const projects: Project[] = await response.json();
      return ctx.render(projects);
    },
};

export default function AboutPage({ data }: PageProps<Project[] | null>) {
    if (!data) {
        return <h1>could not get data!</h1>;
    }

    const projectList = data.map((project) => {
        return (
            <li key={project.name} class={
                tw({ 'bg-yellow-200': true, rounded: true, 'list-none': true })
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
                <br></br>
            </li>
        );
    });
        

    return (
        <html>
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
                <ul class={
                    tw({ 'bg-pink-200': true, rounded: true, underline: true,})
                }>
                    <li><a href="https://www.curseforge.com/members/ix0rai">curseforge</a></li>
                    <li><a href="https://github.com/ix0rai">github</a></li>
                    <li><a href="https://steamcommunity.com/id/ix0rai/">steam</a></li>
                    <li><a href="https://www.twitch.tv/ix0rai/">twitch</a></li>
                    <li><a href="https://youtube.com/@ix0rai">youtube</a></li>
                    <li><a href="mailto:ix0rai64@gmail.com">email</a></li>
                    <li><a href="https://en.pronouns.page/@ix0rai">pronouns.page</a></li>
                    <li><a href="https://modrinth.com/user/ix0rai/">modrinth</a></li>
                    <li><a href="https://twitter.com/ix0rai">twitter</a></li>
                    <li><a href="https://www.tumblr.com/ix0rai">tumblr</a></li>
                </ul>

                <br></br>

                <p>my projects:</p>
                {projectList}

                <br></br>

                <p>my works in progress:</p>
                <ul class={
                    tw({ 'bg-red-200': true, rounded: true, underline: true,})
                }>
                    <li><a href="https://github.com/ix0rai/tantalising_teas">tantalising teas - minecraft mod</a></li>                
                </ul>
            </div>
        </html>
    );
  }
  