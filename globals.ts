import puppeteer from "puppeteer-core";

let player = new Object();

const colours = {
    "embed": "#FFC0DD"
};

async function request(id) {
    if (id.match(/^http(?:s)?:\/\/(.*)audiomack\.com\//)) {
        let data = new Object();
        
        const browser = await puppeteer.launch({
            executablePath: "/usr/bin/chromium-browser",
        });
        const page = await browser.newPage();

        await page.setRequestInterception(true);
        await page.on("request", request => {
            const url = request.url();

            if (url.startsWith("https://api.audiomack.com/v1/music/play/")) {
                fetch(url).then(res => res.json()).then((resd) => {
                    data.url = resd.signedUrl;
                });
            }

            request.continue();
        });

        await page.goto(id);
        await page.setViewport({ width: 1080, height: 1024 });

        const element = await page.waitForSelector("button.play-pause-button.mobilenweb._bare_tc5lm_72");
        await element.click();
        await element.dispose();

        await browser.close();
        return data;
    } else {
        const res = await fetch("https://www.youtube.com/youtubei/v1/player?key=AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc&prettyPrint=false", {
            method: "post",
            body: JSON.stringify({
                "context": {
                    "client": {
                        "hl": "en",
                        "gl": "CA",
                        "clientName": "IOS",
                        "clientVersion": "18.11.34",
                        "deviceModel": "iPhone14,3"
                    }
                },
                "contentCheckOk": true,
                "racyCheckOk": true,
                "videoId": id
            }),
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "com.google.ios.youtube/18.11.34 (iPhone14,3; U; CPU iOS 15_6 like Mac OS X)"
            }
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        }
    }
}

export default {
    player,
    colours,
    request
};