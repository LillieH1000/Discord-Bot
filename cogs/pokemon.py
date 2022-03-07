import discord, urllib.parse, datetime, json, httpx, asyncio
from discord.ext import commands
from discord.ui import View, Select

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

            async with httpx.AsyncClient() as client:
                response = await client.get(f'https://pokeapi.co/api/v2/pokemon/{urllib.parse.quote(message_before)}')

                # Variables

                view = View(timeout=None)

                a = 0
                b = ""
                for c in response.json()['types']:
                    b += f"{c['type']['name'].capitalize()}"
                    a += 1
                    if (len(response.json()['types']) != a):
                        b += ", "

                d = 0
                e = ""
                for f in response.json()['abilities']:
                    e += f"{f['ability']['name'].capitalize()}"
                    if f['is_hidden'] == True:
                        e += f" (Hidden)"
                    d += 1
                    if (len(response.json()['abilities']) != d):
                        e += ", "

                g = 0
                h = ""
                for i in response.json()['stats']:
                    h += i['stat']['name'].capitalize()
                    h += ": "
                    h += str(i['base_stat'])
                    g += 1
                    if (len(response.json()['stats']) != g):
                        h += "\n"

                # Regular Default View
                
                embedRegularDefault = discord.Embed(color=0xFFC0DD, title=f"{response.json()['name'].capitalize()}")
                embedRegularDefault.set_thumbnail(url=response.json()['sprites']['other']['home']['front_default'])
                embedRegularDefault.add_field(name=f"Pokedex ID", value=f"{response.json()['id']}", inline=False)
                embedRegularDefault.add_field(name=f"Types", value=f"{b}", inline=False)
                embedRegularDefault.add_field(name=f"Abilities", value=f"{e}", inline=False)
                embedRegularDefault.add_field(name=f"Base Stats", value=f"\n{h}", inline=False)
                if (message_after != ""):
                    embedRegularDefault.add_field(name=f"Game And Count", value=message_after, inline=False)
                embedRegularDefault.timestamp = datetime.datetime.now()

                # Shiny Default View

                embedShinyDefault = discord.Embed(color=0xFFC0DD, title=f"{response.json()['name'].capitalize()}")
                embedShinyDefault.set_thumbnail(url=response.json()['sprites']['other']['home']['front_shiny'])
                embedShinyDefault.add_field(name=f"Pokedex ID", value=f"{response.json()['id']}", inline=False)
                embedShinyDefault.add_field(name=f"Types", value=f"{b}", inline=False)
                embedShinyDefault.add_field(name=f"Abilities", value=f"{e}", inline=False)
                embedShinyDefault.add_field(name=f"Base Stats", value=f"\n{h}", inline=False)
                if (message_after != ""):
                    embedShinyDefault.add_field(name=f"Game And Count", value=message_after, inline=False)
                embedShinyDefault.timestamp = datetime.datetime.now()

                # Regular Female View

                embedRegularFemale = discord.Embed(color=0xFFC0DD, title=f"{response.json()['name'].capitalize()}")
                embedRegularFemale.set_thumbnail(url=response.json()['sprites']['other']['home']['front_female'])
                embedRegularFemale.add_field(name=f"Pokedex ID", value=f"{response.json()['id']}", inline=False)
                embedRegularFemale.add_field(name=f"Types", value=f"{b}", inline=False)
                embedRegularFemale.add_field(name=f"Abilities", value=f"{e}", inline=False)
                embedRegularFemale.add_field(name=f"Base Stats", value=f"\n{h}", inline=False)
                if (message_after != ""):
                    embedRegularFemale.add_field(name=f"Game And Count", value=message_after, inline=False)
                embedRegularFemale.timestamp = datetime.datetime.now()

                # Shiny Female View

                embedShinyFemale = discord.Embed(color=0xFFC0DD, title=f"{response.json()['name'].capitalize()}")
                embedShinyFemale.set_thumbnail(url=response.json()['sprites']['other']['home']['front_shiny_female'])
                embedShinyFemale.add_field(name=f"Pokedex ID", value=f"{response.json()['id']}", inline=False)
                embedShinyFemale.add_field(name=f"Types", value=f"{b}", inline=False)
                embedShinyFemale.add_field(name=f"Abilities", value=f"{e}", inline=False)
                embedShinyFemale.add_field(name=f"Base Stats", value=f"\n{h}", inline=False)
                if (message_after != ""):
                    embedShinyFemale.add_field(name=f"Game And Count", value=message_after, inline=False)
                embedShinyFemale.timestamp = datetime.datetime.now()

                # Dropdown View

                options = []

                if (response.json()['sprites']['other']['home']['front_default'] is not None):
                    options.append(discord.SelectOption(
                        label="Default (Regular)", description="Show the regular default pic of the pokemon"
                    ),)
                if (response.json()['sprites']['other']['home']['front_shiny'] is not None):
                    options.append(discord.SelectOption(
                        label="Default (Shiny)", description="Show the shiny default pic of the pokemon"
                    ),)
                if (response.json()['sprites']['other']['home']['front_female'] is not None):
                    options.append(discord.SelectOption(
                        label="Female (Regular)", description="Show the regular female pic of the pokemon"
                    ),)
                if (response.json()['sprites']['other']['home']['front_shiny_female'] is not None):
                    options.append(discord.SelectOption(
                        label="Female (Shiny)", description="Show the shiny female pic of the pokemon"
                    ),)

                async def dropdown_callback(interaction):
                    if (dropdown.values[0] == "Default (Regular)"):
                        await interaction.response.edit_message(embed=embedRegularDefault)
                    if (dropdown.values[0] == "Default (Shiny)"):
                        await interaction.response.edit_message(embed=embedShinyDefault)
                    if (dropdown.values[0] == "Female (Regular)"):
                        await interaction.response.edit_message(embed=embedRegularFemale)
                    if (dropdown.values[0] == "Female (Shiny)"):
                        await interaction.response.edit_message(embed=embedShinyFemale)

                dropdown = Select(placeholder="Choose Sprite Image", min_values=1, max_values=1, options=options)
                dropdown.callback = dropdown_callback
                view.add_item(dropdown)

                await message.delete()
                await message.channel.send(embed=embedRegularDefault, view=view)

def setup(bot):
    bot.add_cog(pokemon(bot))