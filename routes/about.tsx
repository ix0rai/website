import { tw } from "twind";

export default function AboutPage() {
    return (
        <html>
            <div class="p-4 mx-auto max-w-screen-md" style="text-align:center">
                <h1>About</h1>
                <h2>This is the about page.</h2>
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
                </ul>
            </div>
        </html>
    );
  }
  