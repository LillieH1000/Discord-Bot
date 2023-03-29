module.exports = async(client) => {
    client.on("messageCreate", async message => {
        if (message.author.bot) return;
    
        try {
            const res = await fetch("https://raw.githubusercontent.com/Dogino/Discord-Phishing-URLs/main/scam-urls.txt");
            if (res.ok) {
                const data = await res.text();
                for (const word of message.content.split(" ")) {
                    word.replace(/^https?:\/\//, "");
                    if (word.slice(-1) == "/") {
                        word.slice(0, -1);
                    }
                    for (const list of data.split("\n")) {
                        if (word == list) {
                            await message.delete();
                            break;
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};