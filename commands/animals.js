const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
let _ = require("underscore");
let globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("animals")
		.setDescription("Posts a random animal picture")
        .addStringOption(option =>
            option.setName("category")
                .setDescription("Choose which animal picture type you want")
                .setAutocomplete(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const category = interaction.options.getString("category");
        let url = new String();
        if (!category) {
            const embed = new EmbedBuilder()
                .setColor(globals.embedcolour)
                .setTitle("Animal Categories")
                .setDescription(`B:\nbirb\n
                C:\ncat\n
                D:\ndog\nduck\n
                F:\nfox\nfrog\n
                G:\ngoose`.replace(/[ \t]/gm, ""))
                .setTimestamp()
            await interaction.editReply({ embeds: [embed] });
            return;
        }
        if (category == "birb") {
            const res = await fetch("https://api.alexflipnote.dev/birb");
            if (res.ok) {
                const data = await res.json();
                url = data.file;
            }
        }
        if (category == "cat") {
            let option = _.sample([1, 2, 3]);
            if (option == 1) {
                const res = await fetch("https://nekos.life/api/v2/img/meow");
                if (res.ok) {
                    const data = await res.json();
                    url = data.url;
                }
            }
            if (option == 2) {
                const res = await fetch("https://api.alexflipnote.dev/cats");
                if (res.ok) {
                    const data = await res.json();
                    url = data.file;
                }
            }
            if (option == 3) {
                const res = await fetch("https://cataas.com/cat?json=true");
                if (res.ok) {
                    const data = await res.json();
                    url = "https://cataas.com" + data.url;
                }
            }
        }
        if (category == "dog") {
            let option = _.sample([1, 2, 3]);
            if (option == 1) {
                const res = await fetch("https://dog.ceo/api/breeds/image/random");
                if (res.ok) {
                    const data = await res.json();
                    url = data.message;
                }
            }
            if (option == 2) {
                const res = await fetch("https://nekos.life/api/v2/img/woof");
                if (res.ok) {
                    const data = await res.json();
                    url = data.url;
                }
            }
            if (option == 3) {
                const res = await fetch("https://api.alexflipnote.dev/dogs");
                if (res.ok) {
                    const data = await res.json();
                    url = data.file;
                }
            }
        }
        if (category == "duck") {
            const res = await fetch("https://random-d.uk/api/v2/random");
            if (res.ok) {
                const data = await res.json();
                url = data.url;
            }
        }
        if (category == "fox") {
            const res = await fetch("https://randomfox.ca/floof/");
            if (res.ok) {
                const data = await res.json();
                url = data.image;
            }
        }
        if (category == "frog") {
            url = _.sample([
                "http://www.allaboutfrogs.org/funstuff/random/0001.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0002.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0003.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0004.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0005.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0006.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0007.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0008.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0009.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0010.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0011.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0012.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0013.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0014.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0015.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0016.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0017.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0018.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0019.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0020.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0021.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0022.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0023.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0024.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0025.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0026.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0027.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0028.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0028.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0029.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0030.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0031.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0032.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0033.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0034.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0035.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0036.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0037.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0038.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0039.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0040.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0041.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0042.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0043.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0044.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0045.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0046.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0047.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0048.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0049.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0050.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0051.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0052.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0053.jpg",
                "http://www.allaboutfrogs.org/funstuff/random/0054.jpg"
            ]);
        }
        if (category == "goose") {
            const res = await fetch("https://nekos.life/api/v2/img/goose");
            if (res.ok) {
                const data = await res.json();
                url = data.url
            }
        }

        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle(`Animal Pics (${category.charAt(0).toUpperCase() + category.slice(1)})`)
            .setImage(url)
            .setTimestamp()
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("View Original Image")
                    .setStyle(ButtonStyle.Link)
                    .setURL(url)
            );
        await interaction.editReply({ embeds: [embed], components: [row] });
	},
};