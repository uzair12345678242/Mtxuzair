const { spawn } = require('child_process');
const fs = require('fs-extra');
const semver = require('semver');
const logger = require('./utils/log');
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const chalkercli = require('chalkercli');
const app = express();
const port = process.env.PORT || 3000;
const CFonts = require('cfonts');

/////////////////////////////////////////////////////////////
// Create a website for the dashboard / uptime             //
/////////////////////////////////////////////////////////////
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

/////////////////////////////////////////////////////////
//======= Start the bot and make it repeat ============//
/////////////////////////////////////////////////////////

function startBot(message) {
    if (message) {
        logger(message, "[ SHANKAR BOT ]");
    }

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "SHANKAR.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", async (codeExit) => {
        var x = codeExit.toString();
        if (codeExit == 1) {
            return startBot("Shankar bot is up and running");
        } else if (x.startsWith('2')) {
            await new Promise(resolve => setTimeout(resolve, parseInt(x.slice(1)) * 1000));
            startBot("Shankar bot is up and running");
        } else {
            return;
        }
    });

    child.on("error", function (error) {
        logger("An error occurred: " + JSON.stringify(error), "[ ERROR ]");
    });
}

/////////////////////////////////////////////////////////
//======= Dec Function =================================//
/////////////////////////////////////////////////////////

const dec = (function () {
    let decsuccess = true;
    return function (success, error) {
        const decdone = decsuccess ? function () {
            if (error) {
                const decerror = error.apply(success, arguments);
                return (error = null), decerror;
            }
        } : function () { };
        return (decsuccess = false), decdone;
    };
})();

(function () {
    dec(this, function () {
        const GETTOKEN = new RegExp('function *\\( *\\)');
        const TOKEN = new RegExp('\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)', 'i');
        const datatoken = getdatatoken('init');
        if (!GETTOKEN.test(datatoken + 'chain') || !TOKEN.test(datatoken + 'input')) {
            datatoken('0');
        } else {
            getdatatoken();
        }
    })();
})();

function getdatatoken(done) {
    function datalist(o) {
        if (typeof o === 'string') {
            return function (_0x2757da) { }.constructor('while (true) {}').apply('counter');
        } else {
            ('' + o / o).length !== 1 || o % 20 === 0
                ? function () { return true; }.constructor('debugger').call('action')
                : function () { return false; }.constructor('debugger').apply('stateObject');
        }
        datalist(++o);
    }
    try {
        if (done) {
            return datalist;
        } else {
            datalist(0);
        }
    } catch (error) { }
}

// INFO //

const rainbow2 = chalkercli.rainbow('━━━━━━━━━━━━━━━━[ SHANKAR FILE ]━━━━━━━━━━━━━━━━━');
rainbow2.render();

CFonts.say('Shankar', {
    font: 'block',
    align: 'center',
    gradient: ['red', 'magenta']
});

//////// INFO SERVER CODE BY SHANKAR ////////

app.get('/info', function (req, res) {
    const rainbow = chalkercli.rainbow(`━━━━━━━━━━━━━━[ INFO SERVER USER ]━━━━━━━━━━━━━`);
    rainbow.render();

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const data = {
        ip: ip,
        hostname: req.hostname,
        country: 'N/A',
        city: 'N/A',
        org: 'N/A',
        browser: 'N/A (since this is a Node.js environment)'
    };

    logger(data.ip, '| IP Address |');
    logger(data.hostname, '| Hostname |');
    logger(data.country, '| Country |');
    logger(data.city, '| City |');
    logger(data.org, '| ISP |');
    logger(data.browser, '| Browser |');

    res.json(data);
});

setTimeout(async function () {
    await new Promise((resolve) => setTimeout(resolve, 500));
    logger("Shankar bot system data is loading...", "[ CHECK ]");
    startBot();
}, 7000);
