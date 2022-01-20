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

            embed = discord.Embed(color=0xFFC0DD, title=f"{response['name'].capitalize()}")
            embed.set_thumbnail(url=response['sprites']['other']['home']['front_default'])
            embed.add_field(name=f"Pokedex ID: ", value=f"{response['id']}", inline=False)
            # embed.add_field(name=f"Types: ", value=f"{len(response['types'])}", inline=False)
            i = 1
            for x in response['types']:
                embed.add_field(name=f"Type {i}: ", value=f"{x['type']['name'].capitalize()}", inline=True)
                i = i + 1
            if (message_after != ""):
                embed.add_field(name=f"Game And Count", value=message_after, inline=False)
            embed.set_image(url=response['sprites']['other']['home']['front_shiny'])
            embed.timestamp = datetime.datetime.now()

            # view = View()
            # swapimage = Button(label="View Original Image", url=f"{response['file']}", style=discord.ButtonStyle.grey)
            # view.add_item(swapimage)

            await message.delete()
            await message.channel.send(embed=embed)
            # await message.channel.send(embed=embed, view=view)

def setup(bot):
    bot.add_cog(pokemon(bot))