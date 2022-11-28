import Projects from "../islands/Projects.tsx"
import Wips from "../islands/Wips.tsx"
import Links from "../islands/Links.tsx";

export default function AboutPage() {
    const projectList = <Projects filter=""/>;

    const wipList = <Wips filter=""/>;
    
    const linkList = <Links filter=""/>;

    return (
        <html>
            <head>
                <meta name="description" content="ix0rai - about me"/>
            </head>
            <body>
                <title>ix0rai | about</title>
                <div class="p-4 mx-auto max-w-screen-md" style="text-align:center">
                    <h1>info on me, ix0rai!</h1>
                    <br></br>
                    <p>my pronouns:</p>
                    <div class={"bg-purple-200 rounded p-2.5"}>
                        <h2>she/her</h2>
                    </div>

                    <br></br>

                    <p>I'm currently learning:</p>
                    <ul class={"bg-blue-200 rounded p-2.5"}>
                        <li>the rust programming language</li>
                        <li>web development with fresh</li>
                        <li>advanced minecraft modding</li>                
                    </ul>

                    <br></br>

                    <p>my links:</p>
                    <div class={"bg-pink-200 rounded p-2.5"}>
                        {linkList}
                    </div>

                    <br></br>

                    <p>my projects:</p>
                    <div class={"bg-yellow-200 rounded p-2.5"}>
                        {projectList}
                    </div>

                    <br></br>

                    <p>my works in progress:</p>
                    <div class={"bg-red-200 rounded p-2.5"}>
                        {wipList}
                    </div>
                </div>
            </body>
        </html>
    );
}
  