import discord, datetime, json, random
from discord.commands import Option, slash_command
from discord.ext import commands
from discord.ui import Button, View

class help(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @slash_command(description="This is a help command")
    async def help(self, ctx, help: Option(str, "Choose help category", choices=["Admin", "Automod", "Music", "Other", "Pokemon", "Pronouns", "Other", "TweakSearch", "Weather"])):
        await ctx.defer()
        await ctx.send_followup(f"Being worked on")

def setup(bot):
    bot.add_cog(help(bot))