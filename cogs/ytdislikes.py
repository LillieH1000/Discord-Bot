import discord
from discord.commands import slash_command
from discord.commands import Option
from discord.ext import commands
import datetime
import requests
import json

class ytdislikes(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @slash_command(guild_ids=[918949427522191361, 881509316392263700])
    async def ytdislikes(self, ctx, videoid: Option(str, "Enter the video id"),):
        response = requests.get(f"https://returnyoutubedislikeapi.com/votes?videoId={videoid}")
        responsejson = response.json()
        embed = discord.Embed(title="YouTube Dislikes", color=0xFFC0DD)
        embed.add_field(name="Dislike Count: ", value=str(responsejson["dislikes"]), inline=False)
        embed.timestamp = datetime.datetime.now()
        await ctx.respond(embed=embed)

def setup(bot):
    bot.add_cog(ytdislikes(bot))