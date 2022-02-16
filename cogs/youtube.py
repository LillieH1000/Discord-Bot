import discord, urllib.parse, datetime, json, aiohttp, asyncio
from discord.commands import Option, slash_command
from discord.ext import commands
from discord.ui import View, Select

class youtube(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.id == self.bot.user.id:
            return

        if "youtube.com" in message.content or "youtu.be" in message.content or "youtube-nocookie.com" in message.content:
            url_data = urllib.parse.urlparse(message.content)
            query = urllib.parse.parse_qs(url_data.query)

            async with aiohttp.ClientSession() as session:
                async with session.get(f'https://returnyoutubedislikeapi.com/votes?videoId={query["v"][0]}') as resp:
                    response = await resp.json()
                    embed = discord.Embed(color=0xFFC0DD, description=f'Views: {str(response["viewCount"])}\nLikes: {str(response["likes"])}\nDislikes: {str(response["dislikes"])}')
                    embed.timestamp = datetime.datetime.now()
                    await message.reply(embed=embed)

def setup(bot):
    bot.add_cog(youtube(bot))