module.exports = async(client) => {
    client.on('messageCreate', async message => {
        if (message.author.bot) return;
    
        try {
            for (const word of message.content.split(" ")) {
                const res = await fetch('https://api.canister.me/v1/community/repositories/check?queries='.concat(word));
                if (res.ok) {
                    const data = await res.json();
                    if (data.data[0].status == "unsafe") {
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