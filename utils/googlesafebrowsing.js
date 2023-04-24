const { safebrowsingapikey } = require("../config.json");

module.exports = async(client) => {
    client.on("messageCreate", async message => {
        if (message.author.bot) return;
        if (!message.content) return;
    
        try {
            for (const word of message.content.split(" ")) {
                payload = {
                    "threatInfo": {
                        "threatTypes": ["THREAT_TYPE_UNSPECIFIED", "MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
                        "platformTypes": ["ANY_PLATFORM"],
                        "threatEntryTypes": ["THREAT_ENTRY_TYPE_UNSPECIFIED", "URL", "EXECUTABLE"],
                        "threatEntries": [
                            {
                                "url": word
                            }
                        ]
                    }
                }
                const res = await fetch("https://safebrowsing.googleapis.com/v4/threatMatches:find?key=".concat(safebrowsingapikey), {
                    method: "post",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.matches) {
                        await message.delete();
                        break;
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};