import discord, datetime
from discord.commands import Option, slash_command
from discord.ext import commands
from discord.ui import Button, View

class admin(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    async def reportlog(self, user, command):
        reportEmbed = discord.Embed(title="Mod Log", description="User Ran Admin Command Without Permission", color=0xFFC0DD)
        reportEmbed.add_field(name=f"Username:", value=user.name, inline=False)
        reportEmbed.add_field(name=f"User ID:", value=user.id, inline=False)
        reportEmbed.add_field(name=f"Command Ran:", value=command, inline=False)
        if user.guild.id == 326739046531596289:
            charizguild = self.bot.get_guild(326739046531596289)
            charizlogs = charizguild.get_channel(818424030297325569)
            await charizlogs.send(embed=reportEmbed)
        else:
            modlogs = discord.utils.get(user.guild.channels, name="mod-logs")
            await modlogs.send(embed=reportEmbed)

    @slash_command(description="Clears chat of the defined message count")
    async def clear(self, ctx, amount: Option(int, "Enter amount of messages to delete")):
        await ctx.defer(ephemeral=True)
        if ctx.interaction.user.guild_permissions.manage_messages:
            await ctx.channel.purge(limit=amount)
            await ctx.send_followup(f"Cleared messages", ephemeral=True)
        else:
            await ctx.send_followup(f"You don't have permission to use this command, this has been logged and sent to the admins", ephemeral=True)
            await self.reportlog(ctx.interaction.user, "/clear")

    @slash_command(description="Mutes the specified user")
    async def mute(self, ctx, user: discord.Member, days: Option(int, "Enter amount of days to mute user"), hours: Option(int, "Enter amount of hours to mute user"), minutes: Option(int, "Enter amount of minutes to mute user"), seconds: Option(int, "Enter amount of seconds to mute user")):
        await ctx.defer(ephemeral=True)
        if ctx.interaction.user.guild_permissions.moderate_members:
            mutetime = datetime.datetime.now()
            mutetime += datetime.timedelta(days=days, hours=hours, minutes=minutes, seconds=seconds)
            await user.timeout(until=mutetime)
            await ctx.send_followup(f"Muted {user.name}", ephemeral=True)
        else:
            await ctx.send_followup(f"You don't have permission to use this command, this has been logged and sent to the admins", ephemeral=True)
            await self.reportlog(ctx.interaction.user, "/mute")

    @slash_command(description="Bans the specified user")
    async def kick(self, ctx, user: discord.Member, reason: Option(str, "Enter the reason")):
        await ctx.defer(ephemeral=True)
        if ctx.interaction.user.guild_permissions.kick_members:
            await user.kick(reason=reason)
            await ctx.send_followup(f"Kicked {user.name}", ephemeral=True)
        else:
            await ctx.send_followup(f"You don't have permission to use this command, this has been logged and sent to the admins", ephemeral=True)
            await self.reportlog(ctx.interaction.user, "/kick")
        
    @slash_command(description="Bans the specified user")
    async def ban(self, ctx, user: discord.Member, reason: Option(str, "Enter the reason")):
        await ctx.defer(ephemeral=True)
        if ctx.interaction.user.guild_permissions.ban_members:
            await user.ban(reason=reason)
            await ctx.send_followup(f"Banned {user.name}", ephemeral=True)
        else:
            await ctx.send_followup(f"You don't have permission to use this command, this has been logged and sent to the admins", ephemeral=True)
            await self.reportlog(ctx.interaction.user, "/ban")

def setup(bot):
    bot.add_cog(admin(bot))