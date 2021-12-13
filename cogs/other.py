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

    @slash_command()
    async def cat(self, ctx):
        response = requests.get(f"http://aws.random.cat/meow")
        responsejson = response.json()
        embed = discord.Embed(title="Cat Pics", color=0xFFC0DD)
        embed.set_image(url=str(responsejson["file"]))
        embed.timestamp = datetime.datetime.now()
        await ctx.respond(embed=embed)

    @slash_command()
    async def dog(self, ctx):
        response = requests.get(f"https://dog.ceo/api/breeds/image/random")
        responsejson = response.json()
        embed = discord.Embed(title="Dog Pics", color=0xFFC0DD)
        embed.set_image(url=str(responsejson["message"]))
        embed.timestamp = datetime.datetime.now()
        await ctx.respond(embed=embed)

def setup(bot):
    bot.add_cog(other(bot))