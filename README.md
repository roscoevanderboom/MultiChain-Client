<h1>Multichain Manager</h1>
A general management tools for Multichain blockchains<h3>
    Security notice:
</h3>

<p>
    This application uses full Node intergration is all windows. As such you should never load remote content or any
    other
    files that can execute unknown code within the browser window. I would appreciate any advice from experienced
    Electron
    developers to help secure this application. I imagine a whitelist/blacklist could be setup that would block any
    remote
    content from being loaded. Remote content will be loaded in default browsers like Chrome or Firefox.
</p>


<h3>
    Disclaimer:
</h3>
<p>
    The Multichain executable files in this repo were not create by me. They come from the official <a href="https://www.multichain.com/download-install/" target="blank">Multichain</a> site.
</p>

<p>
   This project was started from <a href="https://github.com/electron/electron-quick-start" target="blank">Electron-React-Redux-boilerplate
</p>

<h3>
    Requirements:
</h3>
<ul>
    <li>
       <a href="https://yarnpkg.com/lang/en/" target="blank">Yarn</a>
    </li>
     <li>
       <a href="https://www.npmjs.com/" target="blank">NPM</a>
    </li>
    <li>
        <a href="https://nodejs.org/en/" target="blank">Node v12</a>
    </li>
</ul>

<h3>Install: </h3>

clone repo

<h4>Yarn: </h4>

yarn install 

yarn develop -- IMPORTANT. Not yarn start.

<h4>NPM: </h4>

npm install

npm run develop -- IMPORTANT. Not npm start.

<h3>
    Current features:
</h3>

<ul>
    <li>
        <h3>
            Multichain:
        </h3>
        <ul>
            <li>Detect existing Multichain blockchains.</li>
            <li>Automatically start all local chains on app start. Shutdown chains on app quit.</li>
            <li>Display blockchain details</li>
        </ul>
    </li>
</ul>

<h3>
    Upcoming features:
</h3>

<ul>
    <li>
        <h3>
            Multichain:
        </h3>
        <ul>
            <li>Create chains with preset parameters.</li>
            <li>Create chains with custom parameters.</li>
            <li>Delete chains.</li>
            <li>Create generic streams ( open/closed ) and add a description. Designed for generic text input.</li>
            <li>Create premade streams with pre-set data inputs ( IPFS ).</li>
            <li>Filter stream items by publisher or key</li>
            <li>Set stream item display count</li>
        </ul>
    </li>
    <li>
        <h3>
            IPFS:
        </h3>
        <ul>
            <li>Automatically start IPFS on app start. Shutdown IPFS on app quit.</li>
            <li>Add files to repo.</li>
            <li>Publish file details to Multichain.</li>
            <li>View IPFS files in explorer and open with external applications ( ie. default browsers ).</li>
        </ul>
    </li>
</ul>
