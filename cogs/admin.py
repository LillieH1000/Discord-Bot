import discord
from discord.commands import Option, slash_command, permissions
from discord.ext import commands
from discord.ui import Button, View
import json

class admin(commands.Cog):
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

    @slash_command(guild_ids=[int(x) for x in s.split(",")], description="clears chat of defined message count picture", default_permission=False)
    @permissions.is_owner()
    async def clear(self, ctx, amount: Option(int, "Enter amount of messages to delete")):
        await ctx.defer()
        await ctx.channel.purge(limit=amount)
        await ctx.send_followup("Cleared Messages", delete_after=30.0)

def setup(bot):
    bot.add_cog(admin(bot))