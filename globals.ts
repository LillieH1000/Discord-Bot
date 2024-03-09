import { ColorResolvable } from "discord.js";

let player = new Object();

const colours = {
    "embed": "#FFC0DD" as ColorResolvable
};

async function request(id: string): Promise<object | undefined> {
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
        const data = await res.json() as object;
        return data;
    }

    return undefined;
}

export default {
    player,
    colours,
    request
};