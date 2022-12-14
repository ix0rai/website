import { useEffect, useState } from "preact/hooks";
import { handler as projectHandler, Project } from "../routes/api/projects.tsx";

export default function Projects(props: { filter: string }) {
  const filter: string = props.filter;
  const [projects, setProjects] = useState(<p>loading...</p>);

  useEffect(() => {
    projectHandler().then(async (response: Response) => {
      const json: Project[] = await response.json();
      const projectsFormatted = <ul>{json.map((project, index) => {
        if (project.id.includes(filter)) {
          return(
              <li key={project.name} class={"list-none"}>
                  <a href={`/project/${project.id}`} class={"underline"}>{project.name} - {project.type}</a>
                  <p>{project.description}</p>
                  {project.downloads > 0 ? <p>downloads: {project.downloads}</p> : <></>}
                  <p>links:</p>
                  <ul>
                      {Object.entries(project.links).map(([name, link]) => {
                          if (name !== "main") {
                              return (
                                  <li key={name}>
                                      <a href={link} class={"underline"}>{name}</a>
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
        } else {
          return <></>;
        }
      })}</ul>;

      setProjects(projectsFormatted);
    });
  });

  return <span>{projects}</span>;
}
