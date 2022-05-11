const { safebrowsingapikey } = require('../config.json');
const axios = require('axios');

module.exports = async(client) => {
    client.on('messageCreate', async message => {
        if (message.author.bot) return;
    
        try {
            for (const word of message.content.split(" ")) {
                payload = {
                    "threatInfo": {
                        "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING"],
                        "platformTypes": ["ANY_PLATFORM"],
                        "threatEntryTypes": ["URL"],
                        "threatEntries": [
                            {
                                "url": word.toString()
                            }
                        ]
                    }
                }
                const response = await axios.post('https://safebrowsing.googleapis.com/v4/threatMatches:find?key='.concat(safebrowsingapikey), payload);
                if (response.status == 200) {
                    if (response.data.matches) {
                        await message.delete();
                    }
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    });
};