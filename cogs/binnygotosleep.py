import discord
from discord.commands import Option, slash_command
from discord.ext import commands
import datetime
import asyncio
import pytz

class binnygotosleep(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.bgtask = self.bot.loop.create_task(self.binny_go_to_sleep())

    async def binny_go_to_sleep(self):
        await self.bot.wait_until_ready()
        channel = self.bot.get_channel(925409964695105606)
        while not self.bot.is_closed():
            if datetime.datetime.now(pytz.timezone('Australia/Brisbane')).strftime("%H:%M") == "00:00":
                await channel.send("<@294956096353730570> It's time to go to sleep!")
            await asyncio.sleep(60)

def setup(bot):
    bot.add_cog(binnygotosleep(bot))