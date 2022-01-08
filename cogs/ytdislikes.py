import discord
from discord.commands import Option, slash_command
from discord.ext import commands
import datetime
import requests
import json

class ytdislikes(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    # Guilds Loader

    guildconfig = open('guilds.json')
    data = json.load(guildconfig)
    s = ""
    t = 1
    for x in data:
        y = ""
        y += "guild"
        y += str(t)
        s += data[y]
        if (t != len(data)):
            s += str(",")
        t = t + 1

    @slash_command(guild_ids=[int(x) for x in s.split(",")], description="Get the dislikes count of a YouTube video")
    async def ytdislikes(self, ctx, videoid: Option(str, "Enter the video id"),):
        response = requests.get(f"https://returnyoutubedislikeapi.com/votes?videoId={videoid}").json()
        embed = discord.Embed(title="YouTube Dislikes", color=0xFFC0DD)
        embed.add_field(name="Dislike Count: ", value=str(response["dislikes"]), inline=False)
        embed.timestamp = datetime.datetime.now()
        await ctx.respond(embed=embed)

def setup(bot):
    bot.add_cog(ytdislikes(bot))