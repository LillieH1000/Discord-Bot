import discord
from discord.commands import Option, slash_command
from discord.ext import commands
from discord.ui import Button, View
import datetime
import requests
import json

class other(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    # Guilds Loader

    guildconfig = open('guilds.json')
    data = json.load(guildconfig)
    s = ""
    t = 1
    for x in data:
        y = ""
        y += "guild"
        y += str(t)
        s += data[y]
        if (t != len(data)):
            s += str(",")
        t = t + 1

    @slash_command(guild_ids=[int(x) for x in s.split(",")], description="Posts a random cat picture")
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

    @slash_command(guild_ids=[int(x) for x in s.split(",")], description="Posts a random dog picture")
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

    @slash_command(guild_ids=[int(x) for x in s.split(",")], description="Posts a random birb picture")
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

    @slash_command(guild_ids=[int(x) for x in s.split(",")], description="Posts a random neko picture")
    async def neko(self, ctx):
        await ctx.defer()
        response = requests.get(f"https://nekos.life/api/v2/img/neko").json()
        embed = discord.Embed(title="Neko Pics", color=0xFFC0DD)
        embed.set_image(url=str(response["url"]))
        embed.timestamp = datetime.datetime.now()
        
        vieworiginalimage = Button(label="View Original Image", url=f"{response['url']}", style=discord.ButtonStyle.grey)

        view = View()
        if (response["url"] is not None):
            view.add_item(vieworiginalimage)

        await ctx.send_followup(embed=embed, view=view)

    @slash_command(guild_ids=[int(x) for x in s.split(",")], description="Posts a random coffee picture")
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

    @slash_command(guild_ids=[int(x) for x in s.split(",")], description="Posts a random goose picture")
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

def setup(bot):
    bot.add_cog(other(bot))