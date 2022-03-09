import discord, urllib.parse, datetime, json, httpx, asyncio
from discord.ext import commands
from discord.ui import View, Select

class gifsearch(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.id == self.bot.user.id:
            return

        if message.content.startswith("[[") & message.content.endswith("]]"):

            message_content = message.content[2:-2]

            async with httpx.AsyncClient() as client:
                response = await client.get(f'https://g.tenor.com/v1/search?q={urllib.parse.quote(message_content)}&limit=8&key=M7M4SOY4N8C4')
                
                view = View(timeout=None)
                
                # Gif 1
                embedOne = discord.Embed(title="Gif Search", color=0xFFC0DD)
                if len(response.json()['results']) >= 1:
                    embedOne.set_image(url=f"{response.json()['results'][0]['media'][0]['mediumgif']['url']}")
                embedOne.timestamp = datetime.datetime.now()

                # Gif 2
                embedTwo = discord.Embed(title="Gif Search", color=0xFFC0DD)
                if len(response.json()['results']) >= 2:
                    embedTwo.set_image(url=f"{response.json()['results'][1]['media'][0]['mediumgif']['url']}")
                embedTwo.timestamp = datetime.datetime.now()

                # Gif 3
                embedThree = discord.Embed(title="Gif Search", color=0xFFC0DD)
                if len(response.json()['results']) >= 3:
                    embedThree.set_image(url=f"{response.json()['results'][2]['media'][0]['mediumgif']['url']}")
                embedThree.timestamp = datetime.datetime.now()

                # Gif 4
                embedFour = discord.Embed(title="Gif Search", color=0xFFC0DD)
                if len(response.json()['results']) >= 4:
                    embedFour.set_image(url=f"{response.json()['results'][3]['media'][0]['mediumgif']['url']}")
                embedFour.timestamp = datetime.datetime.now()

                # Gif 5
                embedFive = discord.Embed(title="Gif Search", color=0xFFC0DD)
                if len(response.json()['results']) >= 5:
                    embedFive.set_image(url=f"{response.json()['results'][4]['media'][0]['mediumgif']['url']}")
                embedFive.timestamp = datetime.datetime.now()

                # Gif 6
                embedSix = discord.Embed(title="Gif Search", color=0xFFC0DD)
                if len(response.json()['results']) >= 6:
                    embedSix.set_image(url=f"{response.json()['results'][5]['media'][0]['mediumgif']['url']}")
                embedSix.timestamp = datetime.datetime.now()

                # Gif 7
                embedSeven = discord.Embed(title="Gif Search", color=0xFFC0DD)
                if len(response.json()['results']) >= 7:
                    embedSeven.set_image(url=f"{response.json()['results'][6]['media'][0]['mediumgif']['url']}")
                embedSeven.timestamp = datetime.datetime.now()

                # Gif 8
                embedEight = discord.Embed(title="Gif Search", color=0xFFC0DD)
                if len(response.json()['results']) >= 8:
                    embedEight.set_image(url=f"{response.json()['results'][7]['media'][0]['mediumgif']['url']}")
                embedEight.timestamp = datetime.datetime.now()

                # Dropdown View

                options = []

                if len(response.json()['results']) >= 1:
                    options.append(discord.SelectOption(
                        label="Gif 1"
                    ),)
                if len(response.json()['results']) >= 2:
                    options.append(discord.SelectOption(
                        label="Gif 2"
                    ),)
                if len(response.json()['results']) >= 3:
                    options.append(discord.SelectOption(
                        label="Gif 3"
                    ),)
                if len(response.json()['results']) >= 4:
                    options.append(discord.SelectOption(
                        label="Gif 4"
                    ),)
                if len(response.json()['results']) >= 5:
                    options.append(discord.SelectOption(
                        label="Gif 5"
                    ),)
                if len(response.json()['results']) >= 6:
                    options.append(discord.SelectOption(
                        label="Gif 6"
                    ),)
                if len(response.json()['results']) >= 7:
                    options.append(discord.SelectOption(
                        label="Gif 7"
                    ),)
                if len(response.json()['results']) >= 8:
                    options.append(discord.SelectOption(
                        label="Gif 8"
                    ),)

                async def dropdown_callback(interaction):
                    if (dropdown.values[0] == "Gif 1"):
                        await interaction.response.edit_message(embed=embedOne)
                    if (dropdown.values[0] == "Gif 2"):
                        await interaction.response.edit_message(embed=embedTwo)
                    if (dropdown.values[0] == "Gif 3"):
                        await interaction.response.edit_message(embed=embedThree)
                    if (dropdown.values[0] == "Gif 4"):
                        await interaction.response.edit_message(embed=embedFour)
                    if (dropdown.values[0] == "Gif 5"):
                        await interaction.response.edit_message(embed=embedFive)
                    if (dropdown.values[0] == "Gif 6"):
                        await interaction.response.edit_message(embed=embedSix)
                    if (dropdown.values[0] == "Gif 7"):
                        await interaction.response.edit_message(embed=embedSeven)
                    if (dropdown.values[0] == "Gif 8"):
                        await interaction.response.edit_message(embed=embedEight)

                dropdown = Select(placeholder="Choose Gif Image", min_values=1, max_values=1, options=options)
                dropdown.callback = dropdown_callback
                view.add_item(dropdown)

                await message.delete()
                await message.channel.send(embed=embedOne, view=view)

def setup(bot):
    bot.add_cog(gifsearch(bot))