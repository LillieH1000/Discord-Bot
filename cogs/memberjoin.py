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
            embed = discord.Embed(color=0xFFC0DD, title=f"{member.name}")
            if member.avatar != None:
                embed.set_thumbnail(url=member.avatar.url)
            embed.add_field(name=f"Member ID:", value=f"{member.id}", inline=False)
            embed.add_field(name=f"Joined At:", value=f"{member.joined_at}", inline=False)
            embed.timestamp = datetime.datetime.now()
            await guild.system_channel.send(embed=embed)

def setup(bot):
    bot.add_cog(memberjoin(bot))