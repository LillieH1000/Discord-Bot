import discord, json, datetime
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

    @slash_command(guild_ids=[int(x) for x in guildids.split(",")], description="Clears chat of the defined message count", default_permission=False)
    @permissions.has_any_role("Moderator", "Moderators", "Admin", "Admins")
    async def clear(self, ctx, amount: Option(int, "Enter amount of messages to delete")):
        await ctx.defer()
        await ctx.channel.purge(limit=amount + 1)

    @slash_command(guild_ids=[int(x) for x in guildids.split(",")], description="Mutes the defined user", default_permission=False)
    @permissions.has_any_role("Moderator", "Moderators", "Admin", "Admins")
    async def mute(self, ctx, user: discord.Member, days: Option(int, "Enter amount of days to mute user"), hours: Option(int, "Enter amount of hours to mute user"), minutes: Option(int, "Enter amount of minutes to mute user"), seconds: Option(int, "Enter amount of seconds to mute user")):
        await ctx.defer()
        mutetime = datetime.datetime.now()
        mutetime += datetime.timedelta(days=days, hours=hours, minutes=minutes, seconds=seconds)
        await user.timeout(until=mutetime)
        await ctx.send_followup(f"Muted {user.name}", delete_after=40.0)

def setup(bot):
    bot.add_cog(admin(bot))