import { Handlers, PageProps } from "$fresh/server.ts";
import Projects from "../../islands/Projects.tsx";
import { Project, json, handler as projectHandler } from "../api/projects.tsx";

export const handler: Handlers<Project> = {
  async GET(_req, ctx) {
    // check the project id from the url against the static json
    // this avoids having to make a request to the api for invalid project names

    if (json.find((project: Project) => project.id == ctx.params.name)) {
      const projectResponse = await projectHandler();
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

    return(
      <meta name="description" content={`${project.name} by ix0rai: ${project.description}`}>
        <html class={"p-4 mx-auto max-w-screen-md"} style="text-align:center;">
          <meta name={`project ${project.name} by ix0rai`}></meta>
          <title>ix0rai | {project.name}</title>
          <body>
            <h1 class={"p-2.5"}>project | {project.name}</h1>
            <div class={"bg-yellow-200 rounded p-2.5"}>
              <Projects filter={`${project.id}`}/>
            </div>
          </body>
        </html>
      </meta>
    );
  } else {
    return(
      <meta name="description" content="ix0rai project not found">
        <html class={"p-4 mx-auto max-w-screen-md"} style="text-align:center">
          <title>ix0rai | project not found</title>
          <body>
            <div class={"bg-purple-200 rounded p-2.5"} style="position:relative; text-align:center; top:16px;">
              <h1>404: project not found!</h1>
              <a href="/" class={"underline"}>go back</a>
            </div>
          </body>
        </html>
      </meta>
    );
  }
}