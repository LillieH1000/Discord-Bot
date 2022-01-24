import discord, json
from discord.commands import Option, slash_command, permissions
from discord.ext import commands

class admin(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    # Guilds Loader

    guildconfig = open('guilds.json')
    data = json.load(guildconfig)
    guildscount = 0
    guildids = ""
    for guild in data["guilds"]:
        guildids += guild
        guildscount += 1
        if (len(data["guilds"]) != guildscount):
            guildids += str(",")

    @slash_command(guild_ids=[int(x) for x in guildids.split(",")], description="clears chat of defined message count picture", default_permission=False)
    @permissions.is_owner()
    async def clear(self, ctx, amount: Option(int, "Enter amount of messages to delete")):
        await ctx.defer()
        await ctx.channel.purge(limit=amount)
        await ctx.send_followup("Cleared Messages", delete_after=30.0)

def setup(bot):
    bot.add_cog(admin(bot))