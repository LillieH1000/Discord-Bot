import discord
from discord.commands import Option, slash_command
from discord.ext import commands
from discord.ui import Button, View
import urllib.parse
import datetime
import requests
import json

class pokemon(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.id == self.bot.user.id:
            return

        if message.content.startswith("((") and "))" in message.content:

            message_content = message.content.lower()

            message_before = message_content.split("))")[0].replace("((", "")
            message_after = message_content.split("))")[1]

            response = requests.get(f"https://pokeapi.co/api/v2/pokemon/{urllib.parse.quote(message_before)}").json()

            embed = discord.Embed(color=0xFFC0DD)
            embed.set_thumbnail(url=response['sprites']['other']['home']['front_default'])
            embed.add_field(name=f"{response['name'].capitalize()}", value=f"Pokedex ID: {response['id']}", inline=False)
            if (message_after != ""):
                embed.add_field(name=f"Game And Count", value=message_after, inline=False)
            embed.set_image(url=response['sprites']['other']['home']['front_shiny'])
            embed.timestamp = datetime.datetime.now()

            await message.delete()
            await message.channel.send(embed=embed)

def setup(bot):
    bot.add_cog(pokemon(bot))