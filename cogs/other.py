import discord
from discord.commands import slash_command
from discord.commands import Option
from discord.ext import commands
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
    async def cat(self, ctx):
        response = requests.get(f"http://aws.random.cat/meow").json()
        embed = discord.Embed(title="Cat Pics", color=0xFFC0DD)
        embed.set_image(url=str(response["file"]))
        embed.timestamp = datetime.datetime.now()
        await ctx.respond(embed=embed)

    @slash_command(guild_ids=[int(x) for x in s.split(",")], description="Posts a random dog picture")
    async def dog(self, ctx):
        response = requests.get(f"https://dog.ceo/api/breeds/image/random").json()
        embed = discord.Embed(title="Dog Pics", color=0xFFC0DD)
        embed.set_image(url=str(response["message"]))
        embed.timestamp = datetime.datetime.now()
        await ctx.respond(embed=embed)

def setup(bot):
    bot.add_cog(other(bot))