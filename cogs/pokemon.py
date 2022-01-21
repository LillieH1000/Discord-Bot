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

            # Regular View
            
            embed = discord.Embed(color=0xFFC0DD, title=f"{response['name'].capitalize()}")
            embed.set_thumbnail(url=response['sprites']['other']['home']['front_default'])
            embed.add_field(name=f"Pokedex ID: ", value=f"{response['id']}", inline=False)
            i = 0
            z = ""
            for x in response['types']:
                z = z + f"{x['type']['name'].capitalize()}"
                i = i + 1
                if (len(response['types']) != i):
                    z = z + ", "
            embed.add_field(name=f"Types: ", value=f"{z}", inline=False)
            if (message_after != ""):
                embed.add_field(name=f"Game And Count", value=message_after, inline=False)
            embed.timestamp = datetime.datetime.now()

            view = View()

            # Shiny View

            embedShiny = discord.Embed(color=0xFFC0DD, title=f"{response['name'].capitalize()}")
            embedShiny.set_thumbnail(url=response['sprites']['other']['home']['front_default'])
            embedShiny.add_field(name=f"Pokedex ID: ", value=f"{response['id']}", inline=False)
            i = 0
            z = ""
            for x in response['types']:
                z = z + f"{x['type']['name'].capitalize()}"
                i = i + 1
                if (len(response['types']) != i):
                    z = z + ", "
            embedShiny.add_field(name=f"Types: ", value=f"{z}", inline=False)
            if (message_after != ""):
                embedShiny.add_field(name=f"Game And Count", value=message_after, inline=False)
            embedShiny.set_image(url=response['sprites']['other']['home']['front_shiny'])
            embedShiny.timestamp = datetime.datetime.now()

            viewShiny = View()
            
            async def image_callback(interaction):
                await interaction.response.edit_message(embed=embed, view=view)

            async def shinyimage_callback(interaction):
                await interaction.response.edit_message(embed=embedShiny, view=viewShiny)

            showshinyimage = Button(label="Show Shiny Image", style=discord.ButtonStyle.grey)
            showshinyimage.callback = shinyimage_callback
            view.add_item(showshinyimage)

            hideshinyimage = Button(label="Hide Shiny Image", style=discord.ButtonStyle.grey)
            hideshinyimage.callback = image_callback
            viewShiny.add_item(hideshinyimage)

            await message.delete()
            await message.channel.send(embed=embed, view=view)

def setup(bot):
    bot.add_cog(pokemon(bot))