import { Handlers, PageProps } from "$fresh/server.ts";
import { Project, json, handler as projectHandler } from "../api/projects.tsx";
import { tw } from "twind";

export const handler: Handlers<Project> = {
  async GET(req, ctx) {
    // check the project id from the url against the static json
    // this avoids having to make a request to the api for invalid project names

    if (json.find((project: Project) => project.id == ctx.params.name)) {
      const projectResponse = await projectHandler(req);
      const projects: Project[] = await projectResponse.json();

      return ctx.render(projects.find((project: Project) => project.id == ctx.params.name));
    } else {
      return ctx.render(undefined);
    }
  },
};

export default function ProjectPage({ data }: PageProps<Project | undefined>) {
  if (data != undefined) {
    const project: Project = data;

    return <html class={tw("p-4 mx-auto max-w-screen-md")} style="text-align:center;">
      <title>ix0rai | {project.name}</title>
      <body>
        <h1 class={tw('p-2.5')}>project | {project.name}</h1>
        <h1 class={tw('bg-purple-200', 'rounded', 'p-2.5')}>
            <li key={project.name} class={
                tw({'list-none': true, })
            }>
                <a href={`/project/${project.id}`} class={tw({underline: true,})}>{project.name} - {project.type}</a>
                <p>{project.description}</p>
                <p>downloads: {project.downloads}</p>
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
        </h1>
      </body>
    </html>;
  } else {
    return <html class={tw("p-4 mx-auto max-w-screen-md")} style="text-align:center">
      <title>ix0rai | project not found</title>
      <body>
        <div class={tw('bg-purple-200', 'rounded', 'p-5')} style="position:relative; text-align:center; top:16px;">
          <h1>404: project not found!</h1>
          <a href="/" class={tw({'underline': true})}>go back</a>
        </div>
      </body>
    </html>;
  }
}