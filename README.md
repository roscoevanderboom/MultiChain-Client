<h1>Multichain Manager</h1>

A general management tool for Multichain blockchains
    
This project was started from <a href="https://github.com/jschr/electron-react-redux-boilerplate" target="blank">Electron-React-Redux-boilerplate.
    
<h3>   
    Security notice:
</h3>

This application uses full Node intergration is all windows. As such you should never load remote content or any other files that can execute unknown code within the browser window. I would appreciate any advice from experienced Electron developers to help secure this application. I imagine a whitelist/blacklist could be setup that would block any remote content from being loaded. Remote content will be loaded in default browsers like Chrome or Firefox.

Binaries included in this project ( app/main/muiltichain/ ) were downloaded from the official Multichain website. Running these exec on Windows will trigger an alert from firewall and anti-virus. If you don't trust me, delete the files and download them directly from Multichain site and place in the appropriate folder for your OS.

<a href="https://www.multichain.com/download-community/" target="blank">Multichain</a> download page.

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

<h3>Setup: ( Windows / Linux )</h3>

1.)  Clone repo

2.)  npm install or yarn install

3.)  npm run develop or yarn develop

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
            <li>Manually start / stop local nodes. Shutdown nodes on app quit.</li>
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
