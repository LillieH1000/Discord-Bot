import discord, datetime, asyncio
from discord.commands import Option, slash_command
from discord.ext import commands

class memberjoin(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_member_join(self, member):
        guild = member.guild
        if guild.system_channel is not None:
            embed = discord.Embed(color=0xFFC0DD, title=f"{member.name}", description=f"{member.id}")
            embed.set_thumbnail(url=member.avatar.url)
            await guild.system_channel.send(embed=embed)

def setup(bot):
    bot.add_cog(memberjoin(bot))