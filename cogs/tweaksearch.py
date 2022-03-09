import discord, urllib.parse, datetime, json, httpx, asyncio, re
from discord.ext import commands
from discord.ui import Button, View

class tweaksearch(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.id == self.bot.user.id:
            return

        if message.content.startswith("{{") & message.content.endswith("}}"):

            message_content = message.content[2:-2]

            async with httpx.AsyncClient() as client:
                response = await client.get(f'https://api.canister.me/v1/community/packages/search?query={urllib.parse.quote(message_content)}&limit=1&responseFields=name,description,author,price,packageIcon,depiction,repository.name,repository.uri,latestVersion,identifier')
                try:
                    embed = discord.Embed(color=0xFFC0DD)
                    if (response.json()['data'][0]['packageIcon'] is not None):
                        embed.set_thumbnail(url=response.json()['data'][0]['packageIcon'])
                    embed.add_field(name=f"{response.json()['data'][0]['name']}", value=f"{response.json()['data'][0]['description']}", inline=False)
                    author = re.sub('<[^>]+>', '', response.json()['data'][0]['author'])
                    embed.add_field(name="Author:", value=f"{author}", inline=True)
                    embed.add_field(name="Version:", value=f"{response.json()['data'][0]['latestVersion']}", inline=True)
                    embed.add_field(name="Price:", value=f"{response.json()['data'][0]['price']}", inline=True)
                    embed.add_field(name="Repository:", value=f"[{response.json()['data'][0]['repository']['name']}]({response.json()['data'][0]['repository']['uri']})", inline=True)
                    embed.add_field(name="Bundle ID:", value=f"{response.json()['data'][0]['identifier']}", inline=True)
                    embed.timestamp = datetime.datetime.now()

                    viewdepictionbutton = Button(label="View Depiction", url=f"{response.json()['data'][0]['depiction']}", style=discord.ButtonStyle.grey)
                    addrepotopackagemanagerbutton = Button(label="Add Repo To Package Manager", url=f"https://sharerepo.stkc.win/?repo={response.json()['data'][0]['repository']['uri']}", style=discord.ButtonStyle.grey)

                    view = View(timeout=None)
                    if (response.json()['data'][0]['depiction'] is not None):
                        view.add_item(viewdepictionbutton)
                    if (response.json()['data'][0]['repository']['uri'] is not None):
                        view.add_item(addrepotopackagemanagerbutton)

                    await message.delete()
                    await message.channel.send(embed=embed, view=view)
                except:
                    await message.delete()
                    await message.channel.send("No package/tweak found")

def setup(bot):
    bot.add_cog(tweaksearch(bot))