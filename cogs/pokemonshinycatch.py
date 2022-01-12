import discord
from discord.commands import Option, slash_command
from discord.ext import commands
from discord.ui import Button, View
import urllib.parse
import datetime
import requests
import json

class pokemonshinycatch(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.id == self.bot.user.id:
            return

        # if message.content.startswith("((") & message.content.endswith("))"):
        if message.content.startswith("(("):

            message_content = message.content.lower()[2:-2]
            message_after = message.content.split("))")[1]
            message_before = message_content[0:-len(message_after)]

            response = requests.get(f"https://pokeapi.co/api/v2/pokemon/{urllib.parse.quote(message_before)}").json()
            
            embed = discord.Embed(color=0xFFC0DD)
            embed.set_thumbnail(url=response['sprites']['other']['home']['front_default'])
            embed.add_field(name=f"{response['name'].capitalize()}", value=f"Pokedex ID: {response['id']}", inline=False)
            embed.add_field(name=f"Game And Count", value=message_after, inline=False)
            embed.set_image(url=response['sprites']['other']['home']['front_shiny'])
            embed.timestamp = datetime.datetime.now()

            await message.reply(embed=embed)

def setup(bot):
    bot.add_cog(pokemonshinycatch(bot))