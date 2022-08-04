module.exports = {
    "mode": "anime",
    "interval": 5 ,
    "token": "",
    
    "banner": true,
    "bio": true,
}


/* 
MODE: => anime/animal/cat/caracal
INTERVAL: => in minutes ( 2 minutes = rate limited maybe 5 minutes is good)
TOKEN: => Go on discord in your browser, press F12, go in your console and paste this:

window.webpackChunkdiscord_app.push([
  [Math.random()],
  {},
  req => {
    for (const m of Object.keys(req.c)
      .map(x => req.c[x].exports)
      .filter(x => x)) {
      if (m.default && m.default.getToken !== undefined) {
        return copy(m.default.getToken());
      }
      if (m.getToken !== undefined) {
        return copy(m.getToken());
      }
    }
  },
]);
console.log('%cWorked!', 'font-size: 50px');
console.log(`%cYou now have your token in the clipboard!`, 'font-size: 16px');

Your token is in your clipboard, paste it ;)

*/
