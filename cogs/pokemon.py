import discord, urllib.parse, datetime, requests, json
from discord.commands import Option, slash_command
from discord.ext import commands
from discord.ui import Button, View

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
            a = 0
            b = ""
            for c in response['types']:
                b += f"{c['type']['name'].capitalize()}"
                a += 1
                if (len(response['types']) != a):
                    b += ", "
            embed.add_field(name=f"Types: ", value=f"{b}", inline=False)
            d = 0
            e = ""
            for f in response['abilities']:
                e += f"{f['ability']['name'].capitalize()}"
                if f['is_hidden'] == True:
                    e += f" (Hidden)"
                d += 1
                if (len(response['abilities']) != d):
                    e += ", "
            embed.add_field(name=f"Abilities: ", value=f"{e}", inline=False)
            g = 0
            h = ""
            for i in response['stats']:
                h += i['stat']['name'].capitalize()
                h += ": "
                h += str(i['base_stat'])
                g += 1
                if (len(response['stats']) != g):
                    h += "\n"
            embed.add_field(name=f"Base Stats: ", value=f"\n{h}", inline=False)
            if (message_after != ""):
                embed.add_field(name=f"Game And Count", value=message_after, inline=False)
            embed.timestamp = datetime.datetime.now()

            view = View(timeout=None)

            # Shiny View

            embedShiny = discord.Embed(color=0xFFC0DD, title=f"{response['name'].capitalize()}")
            embedShiny.set_thumbnail(url=response['sprites']['other']['home']['front_shiny'])
            embedShiny.add_field(name=f"Pokedex ID: ", value=f"{response['id']}", inline=False)
            a = 0
            b = ""
            for c in response['types']:
                b += f"{c['type']['name'].capitalize()}"
                a += 1
                if (len(response['types']) != a):
                    b += ", "
            embedShiny.add_field(name=f"Types: ", value=f"{b}", inline=False)
            d = 0
            e = ""
            for f in response['abilities']:
                e += f"{f['ability']['name'].capitalize()}"
                if f['is_hidden'] == True:
                    e += f" (Hidden)"
                d += 1
                if (len(response['abilities']) != d):
                    e += ", "
            embedShiny.add_field(name=f"Abilities: ", value=f"{e}", inline=False)
            g = 0
            h = ""
            for i in response['stats']:
                h += i['stat']['name'].capitalize()
                h += ": "
                h += str(i['base_stat'])
                g += 1
                if (len(response['stats']) != g):
                    h += "\n"
            embedShiny.add_field(name=f"Base Stats: ", value=f"\n{h}", inline=False)
            if (message_after != ""):
                embedShiny.add_field(name=f"Game And Count", value=message_after, inline=False)
            embedShiny.timestamp = datetime.datetime.now()

            viewShiny = View(timeout=None)
            
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