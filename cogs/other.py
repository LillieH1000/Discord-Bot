import discord, datetime, requests, json
from discord.commands import Option, slash_command
from discord.ext import commands
from discord.ui import Button, View

class other(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    # Guilds Loader

    guildconfig = open('guilds.json')
    data = json.load(guildconfig)
    guildscount = 0
    guildids = ""
    for guild in data["guilds"]:
        guildids += guild
        guildscount += 1
        if (len(data["guilds"]) != guildscount):
            guildids += str(",")

    @slash_command(guild_ids=[int(x) for x in guildids.split(",")], description="Posts a random cat picture")
    async def cat(self, ctx, source: Option(str, "Choose cat pics source", choices=["Random.Cat", "Nekos.Life", "AlexFlipnote.Dev"])):
        await ctx.defer()
        if source == "Random.Cat":
            response = requests.get(f"http://aws.random.cat/meow").json()
            embed = discord.Embed(title="Cat Pics", color=0xFFC0DD)
            embed.set_image(url=str(response["file"]))
            embed.timestamp = datetime.datetime.now()

            vieworiginalimage = Button(label="View Original Image", url=f"{response['file']}", style=discord.ButtonStyle.grey)

            view = View()
            if (response["file"] is not None):
                view.add_item(vieworiginalimage)

            await ctx.send_followup(embed=embed, view=view)
        if source == "Nekos.Life":
            response = requests.get(f"https://nekos.life/api/v2/img/meow").json()
            embed = discord.Embed(title="Cat Pics", color=0xFFC0DD)
            embed.set_image(url=str(response["url"]))
            embed.timestamp = datetime.datetime.now()

            vieworiginalimage = Button(label="View Original Image", url=f"{response['url']}", style=discord.ButtonStyle.grey)

            view = View()
            if (response["url"] is not None):
                view.add_item(vieworiginalimage)

            await ctx.send_followup(embed=embed, view=view)
        if source == "AlexFlipnote.Dev":
            response = requests.get(f"https://api.alexflipnote.dev/cats").json()
            embed = discord.Embed(title="Cat Pics", color=0xFFC0DD)
            embed.set_image(url=str(response["file"]))
            embed.timestamp = datetime.datetime.now()

            vieworiginalimage = Button(label="View Original Image", url=f"{response['file']}", style=discord.ButtonStyle.grey)

            view = View()
            if (response["file"] is not None):
                view.add_item(vieworiginalimage)

            await ctx.send_followup(embed=embed, view=view)

    @slash_command(guild_ids=[int(x) for x in guildids.split(",")], description="Posts a random dog picture")
    async def dog(self, ctx, source: Option(str, "Choose dog pics source", choices=["Dog.Ceo", "Nekos.Life", "AlexFlipnote.Dev"])):
        await ctx.defer()
        if source == "Dog.Ceo":
            response = requests.get(f"https://dog.ceo/api/breeds/image/random").json()
            embed = discord.Embed(title="Dog Pics", color=0xFFC0DD)
            embed.set_image(url=str(response["message"]))
            embed.timestamp = datetime.datetime.now()
            
            vieworiginalimage = Button(label="View Original Image", url=f"{response['message']}", style=discord.ButtonStyle.grey)

            view = View()
            if (response["message"] is not None):
                view.add_item(vieworiginalimage)

            await ctx.send_followup(embed=embed, view=view)
        if source == "Nekos.Life":
            response = requests.get(f"https://nekos.life/api/v2/img/woof").json()
            embed = discord.Embed(title="Dog Pics", color=0xFFC0DD)
            embed.set_image(url=str(response["url"]))
            embed.timestamp = datetime.datetime.now()

            vieworiginalimage = Button(label="View Original Image", url=f"{response['url']}", style=discord.ButtonStyle.grey)

            view = View()
            if (response["url"] is not None):
                view.add_item(vieworiginalimage)

            await ctx.send_followup(embed=embed, view=view)
        if source == "AlexFlipnote.Dev":
            response = requests.get(f"https://api.alexflipnote.dev/dogs").json()
            embed = discord.Embed(title="Dog Pics", color=0xFFC0DD)
            embed.set_image(url=str(response["file"]))
            embed.timestamp = datetime.datetime.now()

            vieworiginalimage = Button(label="View Original Image", url=f"{response['file']}", style=discord.ButtonStyle.grey)

            view = View()
            if (response["file"] is not None):
                view.add_item(vieworiginalimage)

            await ctx.send_followup(embed=embed, view=view)

    @slash_command(guild_ids=[int(x) for x in guildids.split(",")], description="Posts a random birb picture")
    async def birb(self, ctx):
        await ctx.defer()
        response = requests.get(f"https://api.alexflipnote.dev/birb").json()
        embed = discord.Embed(title="Birb Pics", color=0xFFC0DD)
        embed.set_image(url=str(response["file"]))
        embed.timestamp = datetime.datetime.now()
        
        vieworiginalimage = Button(label="View Original Image", url=f"{response['file']}", style=discord.ButtonStyle.grey)

        view = View()
        if (response["file"] is not None):
            view.add_item(vieworiginalimage)

        await ctx.send_followup(embed=embed, view=view)

    @slash_command(guild_ids=[int(x) for x in guildids.split(",")], description="Posts a random neko picture")
    async def neko(self, ctx, source: Option(str, "Choose neko pics source", choices=["Nekos.Life", "Waifu.Pics"])):
        await ctx.defer()
        if source == "Nekos.Life":
            response = requests.get(f"https://nekos.life/api/v2/img/neko").json()
            embed = discord.Embed(title="Neko Pics", color=0xFFC0DD)
            embed.set_image(url=str(response["url"]))
            embed.timestamp = datetime.datetime.now()
            
            vieworiginalimage = Button(label="View Original Image", url=f"{response['url']}", style=discord.ButtonStyle.grey)

            view = View()
            if (response["url"] is not None):
                view.add_item(vieworiginalimage)

            await ctx.send_followup(embed=embed, view=view)
        if source == "Waifu.Pics":
            response = requests.get(f"https://api.waifu.pics/sfw/neko").json()
            embed = discord.Embed(title="Neko Pics", color=0xFFC0DD)
            embed.set_image(url=str(response["url"]))
            embed.timestamp = datetime.datetime.now()
            
            vieworiginalimage = Button(label="View Original Image", url=f"{response['url']}", style=discord.ButtonStyle.grey)

            view = View()
            if (response["url"] is not None):
                view.add_item(vieworiginalimage)

            await ctx.send_followup(embed=embed, view=view)

    @slash_command(guild_ids=[int(x) for x in guildids.split(",")], description="Posts a random coffee picture")
    async def coffee(self, ctx):
        await ctx.defer()
        response = requests.get(f"https://coffee.alexflipnote.dev/random.json").json()
        embed = discord.Embed(title="Coffee Pics", color=0xFFC0DD)
        embed.set_image(url=str(response["file"]))
        embed.timestamp = datetime.datetime.now()
        
        vieworiginalimage = Button(label="View Original Image", url=f"{response['file']}", style=discord.ButtonStyle.grey)

        view = View()
        if (response["file"] is not None):
            view.add_item(vieworiginalimage)

        await ctx.send_followup(embed=embed, view=view)

    @slash_command(guild_ids=[int(x) for x in guildids.split(",")], description="Posts a random goose picture")
    async def goose(self, ctx):
        await ctx.defer()
        response = requests.get(f"https://nekos.life/api/v2/img/goose").json()
        embed = discord.Embed(title="Goose Pics", color=0xFFC0DD)
        embed.set_image(url=str(response["url"]))
        embed.timestamp = datetime.datetime.now()
        
        vieworiginalimage = Button(label="View Original Image", url=f"{response['url']}", style=discord.ButtonStyle.grey)

        view = View()
        if (response["url"] is not None):
            view.add_item(vieworiginalimage)

        await ctx.send_followup(embed=embed, view=view)

    @slash_command(guild_ids=[int(x) for x in guildids.split(",")], description="Get the dislikes count of a YouTube video")
    async def ytdislikes(self, ctx, videoid: Option(str, "Enter the video id")):
        await ctx.defer()
        response = requests.get(f"https://returnyoutubedislikeapi.com/votes?videoId={videoid}").json()
        embed = discord.Embed(title="YouTube Dislikes", color=0xFFC0DD)
        embed.add_field(name="Dislike Count: ", value=str(response["dislikes"]), inline=False)
        embed.timestamp = datetime.datetime.now()
        await ctx.send_followup(embed=embed)

    @slash_command(guild_ids=[int(x) for x in guildids.split(",")], description="Posts a random chuck norris joke")
    async def chucknorris(self, ctx):
        await ctx.defer()
        response = requests.get(f"https://api.chucknorris.io/jokes/random").json()
        embed = discord.Embed(color=0xFFC0DD)
        embed.set_thumbnail(url=response["icon_url"])
        embed.add_field(name="Chuck Norris", value=response["value"], inline=False)
        embed.timestamp = datetime.datetime.now()
        await ctx.send_followup(embed=embed)

    @slash_command(guild_ids=[int(x) for x in guildids.split(",")], description="Posts a random waifu pic")
    async def waifu(self, ctx):
        await ctx.defer()
        response = requests.get(f"https://api.waifu.pics/sfw/waifu").json()
        embed = discord.Embed(title="Waifu Pics", color=0xFFC0DD)
        embed.set_image(url=str(response["url"]))
        embed.timestamp = datetime.datetime.now()
        
        vieworiginalimage = Button(label="View Original Image", url=f"{response['url']}", style=discord.ButtonStyle.grey)

        view = View()
        if (response["url"] is not None):
            view.add_item(vieworiginalimage)

        await ctx.send_followup(embed=embed, view=view)

    @slash_command(guild_ids=[int(x) for x in guildids.split(",")], description="Posts a random duck pic")
    async def duck(self, ctx):
        await ctx.defer()
        response = requests.get(f"https://random-d.uk/api/v2/random").json()
        embed = discord.Embed(title="Duck Pics", color=0xFFC0DD)
        embed.set_image(url=str(response["url"]))
        embed.timestamp = datetime.datetime.now()
        
        vieworiginalimage = Button(label="View Original Image", url=f"{response['url']}", style=discord.ButtonStyle.grey)

        view = View()
        if (response["url"] is not None):
            view.add_item(vieworiginalimage)

        await ctx.send_followup(embed=embed, view=view)

def setup(bot):
    bot.add_cog(other(bot))