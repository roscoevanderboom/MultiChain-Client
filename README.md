<h1>Multichain Manager</h1>
<p>
    A general management tool for Multichain blockchains
 </p>
    
<p>
   This project was started from <a href="https://github.com/electron/electron-quick-start" target="blank">Electron-React-Redux-boilerplate
</p>
    
 <h3>   
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
    Requirements:
</h3>
<ul> 
    <li>
        <a href="https://nodejs.org/en/" target="blank">Node.JS</a>
    </li>
    <li>
       <a href="https://yarnpkg.com/lang/en/" target="blank">Yarn</a> or <a href="https://www.npmjs.com/" target="blank">NPM</a>
    </li>
</ul>

<h3>Setup: ( Linux ) </h3>

1.)  Clone repo

2.)  npm install or yarn install

3.)  Download the latest <a href="https://www.multichain.com/download/multichain-2.0-latest.tar.gz" target="blank">multichain.tar.gz</a>

4.)  Extract files and move them to ./multichain folder WITHIN the project.

5.)  npm run develop or yarn develop


<h3>Setup: ( Windows ) </h3>

1.)  Clone repo

2.)  npm install or yarn install

3.)  Download the latest <a href="https://www.multichain.com/download/multichain-windows-2.0.3.zip" target="blank">multichain.zip</a>

4.)  Extract files and move them to ./multichain folder WITHIN the project.

5.)  npm run develop or yarn develop


<h3>Setup: ( Mac ) </h3>

Coming soon...

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
            <li>Create chains with custom parameters.</li>
            <li>Create generic streams ( open/closed ) and add a description. Designed for generic text input.</li>
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
            <li>Delete chains.</li>           
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
