import { tw } from "twind";
import { useEffect, useState } from "preact/hooks";
import { handler as projectHandler, Project } from "../routes/api/projects.tsx";

export default function Projects() {
  const [projects, setProjects] = useState(<p>loading...</p>);

  useEffect(() => {
    projectHandler().then(async (response: Response) => {
      const json: Project[] = await response.json();
      const projectsFormatted = <span>{json.map((project, index) => {
        return(
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
                {index === json.length - 1 ? null : <br></br>}
            </li>
        );
      })}</span>;

      setProjects(projectsFormatted);
    });
  });

  return <span>{projects}</span>;
}
