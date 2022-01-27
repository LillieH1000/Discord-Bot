import discord, datetime, asyncio, pytz
from discord.commands import Option, slash_command
from discord.ext import commands

class currentdate(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.datebgtask = self.bot.loop.create_task(self.current_date())

    async def current_date(self):
        await self.bot.wait_until_ready()
        townofsalemdatechannel = self.bot.get_channel(772878026521182248)
        while not self.bot.is_closed():
            await townofsalemdatechannel.edit(name=f"Date: {datetime.datetime.now(pytz.timezone('America/Toronto')).strftime('%B %d, %Y')}")
            await asyncio.sleep(60)

def setup(bot):
    bot.add_cog(currentdate(bot))