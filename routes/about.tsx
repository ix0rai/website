import { tw } from "twind";

export default function AboutPage() {
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
                <ul class={
                    tw({ 'bg-yellow-200': true, rounded: true, underline: true,})
                }>
                    <li><a href="https://github.com/ix0rai/rainglow">rainglow - minecraft mod</a></li>
                    <li><a href="https://github.com/ix0rai/bodacious_berries">bodacious berries - minecraft mod</a></li>
                </ul>

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
  