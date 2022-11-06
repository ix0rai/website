import { useEffect, useState } from "preact/hooks";
import { Project } from "../routes/api/projects.tsx";
import { handler as wipHandler } from "../routes/api/wips.tsx";

export default function Links(props: { filter: string }) {
  const filter: string = props.filter;
  const [wips, setWips] = useState(<p>loading...</p>);

  useEffect(() => {
    const data = wipHandler();
    data.json().then((json: Project[]) => {
        const formattedWipList = <ul>{json.map((project, index) => {
            if (project.id.includes(filter)) {
                return(
                    <li key={project.name} class={"list-none"}>
                        <a href={project.links.main} class={"underline"}>{project.name} - {project.type}</a>
                        <p>{project.description}</p>
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

        setWips(formattedWipList);
    });
  });

  return wips;
}
