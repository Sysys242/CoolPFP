const Discord = require("discord.js-selfbot-v13");
const gradient = require('gradient-string');
var http = require('http');
const config = require("./config");
const fs = require("fs")
const client = new Discord.Client({
    checkUpdate: false,
});

var changed = 0;
var title = Buffer.from('LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0KCiAgLyQkJCQkJCAgICAgICAgICAgICAgICAgICAgICAvJCQgLyQkJCQkJCQgIC8kJCQkJCQkJCAvJCQkJCQkJCAKIC8kJF9fICAkJCAgICAgICAgICAgICAgICAgICAgfCAkJHwgJCRfXyAgJCR8ICQkX19fX18vfCAkJF9fICAkJAp8ICQkICBcX18vICAvJCQkJCQkICAgLyQkJCQkJCB8ICQkfCAkJCAgXCAkJHwgJCQgICAgICB8ICQkICBcICQkCnwgJCQgICAgICAgLyQkX18gICQkIC8kJF9fICAkJHwgJCR8ICQkJCQkJCQvfCAkJCQkJCAgIHwgJCQkJCQkJC8KfCAkJCAgICAgIHwgJCQgIFwgJCR8ICQkICBcICQkfCAkJHwgJCRfX19fLyB8ICQkX18vICAgfCAkJF9fX18vIAp8ICQkICAgICQkfCAkJCAgfCAkJHwgJCQgIHwgJCR8ICQkfCAkJCAgICAgIHwgJCQgICAgICB8ICQkICAgICAgCnwgICQkJCQkJC98ICAkJCQkJCQvfCAgJCQkJCQkL3wgJCR8ICQkICAgICAgfCAkJCAgICAgIHwgJCQgICAgICAKIFxfX19fX18vICBcX19fX19fLyAgXF9fX19fXy8gfF9fL3xfXy8gICAgICB8X18vICAgICAgfF9fLyAgICAgIAoKICAgICAgICAgICAgICAgICAgICAgQWxsIENoYW5nZWQ6ICVwZnBjaGFuZ2UlCiAgICAgICAgICAgICAgICAgICAgIFVzZXIgTnVtYmVyOiAldXNlcm51bWJlciUKCi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t', 'base64').toString();
var pfp = [];
var appdata = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share");

const getScript = (url) => {
    return new Promise((resolve, reject) => {
        const http      = require('http'),
              https     = require('https');
        let client = http;
        if (url.toString().indexOf("https") === 0) {
            client = https;
        }
        client.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk
            });
            resp.on('end', () => {
                resolve(data);
            });
        }).on("error", (err) => {
            reject(err);
        });
        });
    };

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}



function checkFirstRun() {
    fs.exists(appdata + "\\uwu.txt", function (exists) {
        if(!exists) {
        (async (url) => {
            await getScript(url)
            fs.appendFile(appdata + "\\uwu.txt", "Lmfao", function (err) {
                if (err) throw err;
            });
        })('https://kidiklient.com/CoolPfP/analystic/upuser.php');
        }
    }) 
}

function changePFP() {
    changed+=1;
    try{
        client.user.setAvatar(pfp[randomInt(0, pfp.length)]);
        console.log(gradient.pastel("Changed your profile picture"));
        (async (url) => {
            await getScript(url)
        })('https://kidiklient.com/CoolPfP/analystic/upPFP.php');
    }catch(ex) {
        let coolGradient = gradient(['#fc0303', '#ff512e', '#ff6d2e']);
        console.log(coolGradient("Error while changing picture profile"));
    }

}

function loadUrl() {
    if(config.mode == "anime") {
        (async (url) => {
            var ssqd = await getScript(url);
            pfp = ssqd.split('^');
        })('https://kidiklient.com/CoolPfP/anime');
    }else if(config.mode == "cat") {
        (async (url) => {
            var ssqd = await getScript(url);
            pfp = ssqd.split('^');
        })('https://kidiklient.com/CoolPfP/cat');
    }else if(config.mode == "animal") {
        (async (url) => {
            var ssqd = await getScript(url);
            pfp = ssqd.split('^');
        })('https://kidiklient.com/CoolPfP/animal');
    }else if(config.mode == "caracal") {
        (async (url) => {
            var ssqd = await getScript(url);
            pfp = ssqd.split('^');
        })('https://kidiklient.com/CoolPfP/caracal');
    }else {
        console.log("INVALID MODE EXITING.......")
        return;
    }
}

function setTitle(title)
{
  process.stdout.write(
    String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7)
  );
}

function updateTitle()
{
    setTitle("CoolPFP By Sysy's - Changed PFP: " + changed)
}

async function updateTitle() {
    title = title.replace("%usernumber%", await getScript("https://kidiklient.com/CoolPfP/analystic/getuser.php"))
    title = title.replace("%pfpchange%", await getScript("https://kidiklient.com/CoolPfP/analystic/getPFP.php"))
}

loadUrl();
checkFirstRun();
updateTitle();

client.on("ready", ready => {
    console.clear();
    console.log(gradient.pastel.multiline(title) + '\n\n');
    console.log(gradient.pastel("Logged as " + client.user.tag));
    console.log(gradient.pastel("Loaded " + pfp.length + " pfps\n"));
});

client.on('ready', on => {
    changePFP();
    updateTitle();
    setInterval(loadUrls => {
        loadUrl();
    }, 60000)
    setInterval(changePFPs => {
        changePFP();
        updateTitle();
    }, config.interval * 60000);
});

client.login(config.token);