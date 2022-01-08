import discord
from discord.commands import Option, slash_command
from discord.ext import commands
from discord.ui import Button, View
import urllib.parse
import datetime
import requests
import json

class tweaksearch(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.id == self.bot.user.id:
            return

        if message.content.startswith("[[") & message.content.endswith("]]"):

            message_content = message.content.replace(" ", "%20")[2:-2]

            response = requests.get(f"https://api.canister.me/v1/community/packages/search?query={urllib.parse.quote(message_content)}&limit=1").json()
            
            try:
                embed = discord.Embed(color=0xFFC0DD)
                if (response['data'][0]['packageIcon'] is not None):
                    embed.set_thumbnail(url=response['data'][0]['packageIcon'])
                embed.add_field(name=f"{response['data'][0]['name']}", value=f"{response['data'][0]['description']}", inline=False)
                embed.add_field(name="Author: ", value=f"{response['data'][0]['author']}", inline=False)
                embed.add_field(name="Repository: ", value=f"{response['data'][0]['repository']['uri']}", inline=False)
                embed.timestamp = datetime.datetime.now()

                addrepotopackagemanagerbutton = Button(label="Add Repo To Package Manager", url=f"https://sharerepo.stkc.win/?repo={response['data'][0]['repository']['uri']}", style=discord.ButtonStyle.grey)

                view = View()
                view.add_item(addrepotopackagemanagerbutton)

                await message.reply(embed=embed, view=view)
            except:
                await message.reply("No package/tweak found")

def setup(bot):
    bot.add_cog(tweaksearch(bot))