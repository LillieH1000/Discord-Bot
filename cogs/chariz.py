import discord, datetime, asyncio
from discord.commands import slash_command
from discord.ext import commands

class chariz(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.charizbgtask = self.bot.loop.create_task(self.chariz_backgroundtasks())

    async def chariz_backgroundtasks(self):
        await self.bot.wait_until_ready()
        charizguild = self.bot.get_guild(326739046531596289)
        charizlinkedrole = charizguild.get_role(547343519585665025)
        charizlinkedchannel = charizguild.get_channel(879526368541548625)
        chariznewreleasesrole = charizguild.get_role(698463407816573039)
        chariznewreleaseschannel = charizguild.get_channel(879527500659699713)
        while not self.bot.is_closed():
            await charizlinkedchannel.edit(name=f"Linked: {len(charizlinkedrole.members)}")
            await chariznewreleaseschannel.edit(name=f"New Releases: {len(chariznewreleasesrole.members)}")
            await asyncio.sleep(60)

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