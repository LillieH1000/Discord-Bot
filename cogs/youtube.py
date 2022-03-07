import discord, urllib.parse, datetime, json, httpx, asyncio
from discord.ext import commands

class youtube(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.id == self.bot.user.id:
            return

        async with httpx.AsyncClient() as client:
            for word in message.content.split():
                if "youtube.com" in word:
                    url_data = urllib.parse.urlparse(word)
                    query = urllib.parse.parse_qs(url_data.query)

                    response = await client.get(f'https://returnyoutubedislikeapi.com/votes?videoId={query["v"][0]}')
                    embed = discord.Embed(color=0xFFC0DD, description=f'Views: {str(format(response.json()["viewCount"],",d"))}\nLikes: {str(format(response.json()["likes"],",d"))}\nDislikes: {str(format(response.json()["dislikes"],",d"))}')
                    embed.timestamp = datetime.datetime.now()
                    await message.reply(embed=embed)

                if "youtu.be" in word:
                    shortened = word.replace("/", "").replace("http:", "").replace("https:", "").replace("youtu.be", "")
                    response = await client.get(f'https://returnyoutubedislikeapi.com/votes?videoId={shortened}')
                    embed = discord.Embed(color=0xFFC0DD, description=f'Views: {str(format(response.json()["viewCount"],",d"))}\nLikes: {str(format(response.json()["likes"],",d"))}\nDislikes: {str(format(response.json()["dislikes"],",d"))}')
                    embed.timestamp = datetime.datetime.now()
                    await message.reply(embed=embed)

def setup(bot):
    bot.add_cog(youtube(bot))