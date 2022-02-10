import discord, urllib.parse, datetime, json, aiohttp, asyncio
from discord.commands import Option, slash_command
from discord.ext import commands
from discord.ui import Button, View

class tweaksearch(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.id == self.bot.user.id:
            return

        if message.content.startswith("[[") & message.content.endswith("]]"):

            message_content = message.content[2:-2]

            async with aiohttp.ClientSession() as session:
                async with session.get(f'https://api.canister.me/v1/community/packages/search?query={urllib.parse.quote(message_content)}&limit=1&responseFields=name,description,author,price,packageIcon,depiction,repository.name,repository.uri') as resp:
                    response = await resp.json()
                    try:
                        embed = discord.Embed(color=0xFFC0DD)
                        if (response['data'][0]['packageIcon'] is not None):
                            embed.set_thumbnail(url=response['data'][0]['packageIcon'])
                        if (response['data'][0]['name'] is not None and response['data'][0]['description'] is not None):
                            embed.add_field(name=f"{response['data'][0]['name']}", value=f"{response['data'][0]['description']}", inline=False)
                        if (response['data'][0]['author'] is not None):
                            embed.add_field(name="Author: ", value=f"{response['data'][0]['author']}", inline=False)
                        if (response['data'][0]['price'] is not None):
                            embed.add_field(name="Price: ", value=f"{response['data'][0]['price']}", inline=False)
                        if (response['data'][0]['repository']['name'] is not None and response['data'][0]['repository']['uri'] is not None):
                            embed.add_field(name="Repository: ", value=f"[{response['data'][0]['repository']['name']}]({response['data'][0]['repository']['uri']})", inline=False)
                        embed.timestamp = datetime.datetime.now()

                        viewdepictionbutton = Button(label="View Depiction", url=f"{response['data'][0]['depiction']}", style=discord.ButtonStyle.grey)
                        addrepotopackagemanagerbutton = Button(label="Add Repo To Package Manager", url=f"https://sharerepo.stkc.win/?repo={response['data'][0]['repository']['uri']}", style=discord.ButtonStyle.grey)

                        view = View(timeout=None)
                        if (response['data'][0]['depiction'] is not None):
                            view.add_item(viewdepictionbutton)
                        if (response['data'][0]['repository']['uri'] is not None):
                            view.add_item(addrepotopackagemanagerbutton)

                        await message.reply(embed=embed, view=view)
                    except:
                        await message.reply("No package/tweak found")

def setup(bot):
    bot.add_cog(tweaksearch(bot))