const Webhooks = require('node-webhooks');
const GetNextDate = require("get-next-date");
const GetMidnighDate = require("get-midnight-date");

var webHooks = new Webhooks({
    db: "./webHook.json",
    httpSuccessCodes: [204]
});

//*timer
async function timer() {
    var now = new Date(Date.now());
    var nextThursday = new Date(Date.now());
    if (now.getDay() === 4) {
        var today7 = GetMidnighDate(now).getTime() + 72000000;
        if (now.getTime() <= today7) {

        }
    } else {
        var running = true;
        while (running) {
            nextThursday = GetNextDate(nextThursday);
            if (nextThursday.getDay() === 4) {
                running = false;
            }
        }
    }
    var minutesUntilNextThursday = Math.ceil((nextThursday.getTime() + 72000000 - now.getTime()) / 1000 / 60);
    console.log(`send ${minutesUntilNextThursday}`);
    webHooks.trigger("sendTime", { "content": `${minutesUntilNextThursday} minutes until DnD` });
}

timer();
setInterval(timer, 60000);