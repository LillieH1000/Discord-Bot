import discord, datetime, asyncio
from discord.commands import Option, slash_command
from discord.ext import commands

class logging(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_message_edit(self, before, after):
        filterEmbed = discord.Embed(title="Message Log", description="Message Edited", color=0xFFC0DD)
        filterEmbed.add_field(name=f"Username:", value=before.author.name, inline=False)
        filterEmbed.add_field(name=f"User ID:", value=before.author.id, inline=False)
        filterEmbed.add_field(name=f"Old Message:", value=before.content, inline=False)
        filterEmbed.add_field(name=f"New Message:", value=after.content, inline=False)
        if before.guild.id == 326739046531596289:
            charizguild = self.bot.get_guild(326739046531596289)
            charizlogs = charizguild.get_channel(818424030297325569)
            await charizlogs.send(embed=filterEmbed)
        else:
            messagelogs = discord.utils.get(before.guild.channels, name="message-logs")
            await messagelogs.send(embed=filterEmbed)

    @commands.Cog.listener()
    async def on_message_delete(self, message):
        filterEmbed = discord.Embed(title="Message Log", description="Message Deleted", color=0xFFC0DD)
        filterEmbed.add_field(name=f"Username:", value=message.author.name, inline=False)
        filterEmbed.add_field(name=f"User ID:", value=message.author.id, inline=False)
        filterEmbed.add_field(name=f"Message:", value=message.content, inline=False)
        if message.guild.id == 326739046531596289:
            charizguild = self.bot.get_guild(326739046531596289)
            charizlogs = charizguild.get_channel(818424030297325569)
            await charizlogs.send(embed=filterEmbed)
        else:
            messagelogs = discord.utils.get(message.guild.channels, name="message-logs")
            await messagelogs.send(embed=filterEmbed)

def setup(bot):
    bot.add_cog(logging(bot))