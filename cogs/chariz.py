import discord, datetime, json
from discord.commands import Option, slash_command
from discord.ext import commands

class chariz(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @slash_command(guild_ids=[326739046531596289, 918949427522191361], description="Tells a user the contact info stuff")
    async def contactdev(self, ctx, user: discord.Member):
        await ctx.defer(ephemeral=True)
        embed = discord.Embed(color=0xFFC0DD)
        embed.add_field(name=f"Chariz Notice", value=f"""You need to contact the author regarding this.

If you don’t know how to contact them, follow this:

• Cydia: Search for the package, tap “Author”, and then “Author” again.
• Zebra: Search for the package, then tap the author’s name.
• Sileo: Search for the package, tap the three dots “•••” button, and then “Support”.
• Installer: Search for the package, scroll to the bottom of the page and then tap "Contact".

You may also be able to find them on Twitter, Reddit, or this Discord server.""", inline=False)
        embed.timestamp = datetime.datetime.now()

        await ctx.send(f"{user.mention}", embed=embed)
        await ctx.send_followup(f"Sent the message", ephemeral=True)

def setup(bot):
    bot.add_cog(chariz(bot))