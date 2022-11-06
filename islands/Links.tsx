import { useEffect, useState } from "preact/hooks";
import { handler as linkHandler, Link } from "../routes/api/links.tsx";

export default function Links(props: { filter: string }) {
  const filter: string = props.filter;
  const [links, setLinks] = useState(<p>loading...</p>);

  useEffect(() => {
    const data = linkHandler();
    data.json().then((json: Link[]) => {
        const formattedLinks = <ul>{json.map((link, index) => {
            if (link.name.includes(filter)) {
                return(
                    <li key={link.name} class={"underline list-none"}>
                        <a href={link.link}>{link.name}</a>
                    </li>
                );
            } else {
            return <></>;
            }
        })}</ul>

        setLinks(formattedLinks);
    });
  });

  return links;
}
