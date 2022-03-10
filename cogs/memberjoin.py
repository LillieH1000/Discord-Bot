import discord, datetime, asyncio
from discord.ext import commands

class memberjoin(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_member_join(self, member):
        guild = member.guild
        embed = discord.Embed(color=0xFFC0DD, title=f"{member.name}")
        if member.avatar != None:
            embed.set_thumbnail(url=member.avatar.url)
        embed.add_field(name=f"Member ID:", value=f"{member.id}", inline=False)
        embed.add_field(name=f"Account Created:", value=f"{member.created_at.strftime('%B %-d, %Y')}", inline=False)
        embed.timestamp = datetime.datetime.now()
        if guild.id == 326739046531596289:
            charizguild = self.bot.get_guild(326739046531596289)
            charizjoinlog = charizguild.get_channel(440106057344483339)
            await charizjoinlog.send(embed=embed)
        else:
            if guild.system_channel is not None:
                await guild.system_channel.send(embed=embed)

def setup(bot):
    bot.add_cog(memberjoin(bot))