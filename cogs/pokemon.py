import discord, urllib.parse, datetime, json, aiohttp, asyncio
from discord.commands import Option, slash_command
from discord.ext import commands
from discord.ui import View, Select

response = None
b = None
e = None
h = None
messageafter = None

class PersistentPokemonDefaultRegularEmbed(discord.Embed):
    def __init__(self):
        global response
        global b
        global e
        global h
        global messageafter
        super().__init__(
            color=0xFFC0DD,
            title=f"{response['name'].capitalize()}"
        )
        self.set_thumbnail(url=response['sprites']['other']['home']['front_default'])
        self.add_field(name=f"Pokedex ID", value=f"{response['id']}", inline=False)
        self.add_field(name=f"Types", value=f"{b}", inline=False)
        self.add_field(name=f"Abilities", value=f"{e}", inline=False)
        self.add_field(name=f"Base Stats", value=f"\n{h}", inline=False)
        if (messageafter != ""):
            self.add_field(name=f"Game And Count", value=messageafter, inline=False)
        self.timestamp = datetime.datetime.now()

class PersistentPokemonDefaultShinyEmbed(discord.Embed):
    def __init__(self):
        global response
        global b
        global e
        global h
        global messageafter
        super().__init__(
            color=0xFFC0DD,
            title=f"{response['name'].capitalize()}"
        )
        self.set_thumbnail(url=response['sprites']['other']['home']['front_shiny'])
        self.add_field(name=f"Pokedex ID", value=f"{response['id']}", inline=False)
        self.add_field(name=f"Types", value=f"{b}", inline=False)
        self.add_field(name=f"Abilities", value=f"{e}", inline=False)
        self.add_field(name=f"Base Stats", value=f"\n{h}", inline=False)
        if (messageafter != ""):
            self.add_field(name=f"Game And Count", value=messageafter, inline=False)
        self.timestamp = datetime.datetime.now()

class PersistentPokemonFemaleRegularEmbed(discord.Embed):
    def __init__(self):
        global response
        global b
        global e
        global h
        global messageafter
        super().__init__(
            color=0xFFC0DD,
            title=f"{response['name'].capitalize()}"
        )
        self.set_thumbnail(url=response['sprites']['other']['home']['front_female'])
        self.add_field(name=f"Pokedex ID", value=f"{response['id']}", inline=False)
        self.add_field(name=f"Types", value=f"{b}", inline=False)
        self.add_field(name=f"Abilities", value=f"{e}", inline=False)
        self.add_field(name=f"Base Stats", value=f"\n{h}", inline=False)
        if (messageafter != ""):
            self.add_field(name=f"Game And Count", value=messageafter, inline=False)
        self.timestamp = datetime.datetime.now()

class PersistentPokemonFemaleShinyEmbed(discord.Embed):
    def __init__(self):
        global response
        global b
        global e
        global h
        global messageafter
        super().__init__(
            color=0xFFC0DD,
            title=f"{response['name'].capitalize()}"
        )
        self.set_thumbnail(url=response['sprites']['other']['home']['front_shiny_female'])
        self.add_field(name=f"Pokedex ID", value=f"{response['id']}", inline=False)
        self.add_field(name=f"Types", value=f"{b}", inline=False)
        self.add_field(name=f"Abilities", value=f"{e}", inline=False)
        self.add_field(name=f"Base Stats", value=f"\n{h}", inline=False)
        if (messageafter != ""):
            self.add_field(name=f"Game And Count", value=messageafter, inline=False)
        self.timestamp = datetime.datetime.now()

class PersistentPokemonDropdown(Select):
    def __init__(self):

        global response
        options = []

        if (response['sprites']['other']['home']['front_default'] is not None):
            options.append(discord.SelectOption(
                label="Default (Regular)", description="Show the regular default pic of the pokemon"
            ),)
        if (response['sprites']['other']['home']['front_shiny'] is not None):
            options.append(discord.SelectOption(
                label="Default (Shiny)", description="Show the shiny default pic of the pokemon"
            ),)
        if (response['sprites']['other']['home']['front_female'] is not None):
            options.append(discord.SelectOption(
                label="Female (Regular)", description="Show the regular female pic of the pokemon"
            ),)
        if (response['sprites']['other']['home']['front_shiny_female'] is not None):
            options.append(discord.SelectOption(
                label="Female (Shiny)", description="Show the shiny female pic of the pokemon"
            ),)

        super().__init__(
            placeholder="Choose Sprite Image",
            min_values=1,
            max_values=1,
            options=options,
            custom_id="persistent_view:pokemon_dropdown",
        )
    
    async def callback(self, interaction: discord.Interaction):
        if (self.values[0] == "Default (Regular)"):
            await interaction.response.edit_message(embed=PersistentPokemonDefaultRegularEmbed())
        if (self.values[0] == "Default (Shiny)"):
            await interaction.response.edit_message(embed=PersistentPokemonDefaultShinyEmbed())
        if (self.values[0] == "Female (Regular)"):
            await interaction.response.edit_message(embed=PersistentPokemonFemaleRegularEmbed())
        if (self.values[0] == "Female (Shiny)"):
            await interaction.response.edit_message(embed=PersistentPokemonFemaleShinyEmbed())

class PersistentPokemonDropdownView(View):
    def __init__(self):
        super().__init__(timeout=None)

        self.add_item(PersistentPokemonDropdown())

class pokemon(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.persistent_views_added = False

    @commands.Cog.listener()
    async def on_ready(self):
        if not self.persistent_views_added:
            self.bot.add_view(PersistentPokemonDropdownView())
            self.persistent_views_added = True

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.id == self.bot.user.id:
            return

        if message.content.startswith("((") and "))" in message.content:

            message_content = message.content.lower()

            message_before = message_content.split("))")[0].replace("((", "")
            message_after = message_content.split("))")[1]

            async with aiohttp.ClientSession() as session:
                async with session.get(f'https://pokeapi.co/api/v2/pokemon/{urllib.parse.quote(message_before)}') as resp:
                    global response
                    global b
                    global e
                    global h
                    global messageafter
                    response = await resp.json()
                    messageafter = message_after

                    # Variables

                    a = 0
                    b = ""
                    for c in response['types']:
                        b += f"{c['type']['name'].capitalize()}"
                        a += 1
                        if (len(response['types']) != a):
                            b += ", "

                    d = 0
                    e = ""
                    for f in response['abilities']:
                        e += f"{f['ability']['name'].capitalize()}"
                        if f['is_hidden'] == True:
                            e += f" (Hidden)"
                        d += 1
                        if (len(response['abilities']) != d):
                            e += ", "

                    g = 0
                    h = ""
                    for i in response['stats']:
                        h += i['stat']['name'].capitalize()
                        h += ": "
                        h += str(i['base_stat'])
                        g += 1
                        if (len(response['stats']) != g):
                            h += "\n"

                    await message.delete()
                    await message.channel.send(embed=PersistentPokemonDefaultRegularEmbed(), view=PersistentPokemonDropdownView())

def setup(bot):
    bot.add_cog(pokemon(bot))