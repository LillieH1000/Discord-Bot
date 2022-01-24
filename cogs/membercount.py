import discord, datetime, asyncio
from discord.commands import Option, slash_command
from discord.ext import commands

class membercount(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.bgtask = self.bot.loop.create_task(self.member_count())

    async def member_count(self):
        await self.bot.wait_until_ready()
        townofsalemguild = self.bot.get_guild(416350699794857986)
        charizguild = self.bot.get_guild(326739046531596289)
        worfguild = self.bot.get_guild(820991252970995722)
        lillieguild = self.bot.get_guild(918949427522191361)
        townofsalemmemberchannel = self.bot.get_channel(772878081907884072)
        charizmemberchannel = self.bot.get_channel(879526082154496012)
        worfmemberchannel = self.bot.get_channel(902396491321180170)
        lilliememberchannel = self.bot.get_channel(932817405556690944)
        while not self.bot.is_closed():
            await townofsalemmemberchannel.edit(name=f"Members: {townofsalemguild.member_count}")
            await charizmemberchannel.edit(name=f"Members: {charizguild.member_count}")
            await worfmemberchannel.edit(name=f"Members: {worfguild.member_count}")
            await lilliememberchannel.edit(name=f"Members: {lillieguild.member_count}")
            await asyncio.sleep(60)

def setup(bot):
    bot.add_cog(membercount(bot))