import discord, datetime, asyncio, pytz
from discord.commands import Option, slash_command
from discord.ext import commands

class gotosleep(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.bgtask = self.bot.loop.create_task(self.go_to_sleep())

    async def go_to_sleep(self):
        await self.bot.wait_until_ready()
        binnyalarmchannel = self.bot.get_channel(925409964695105606)
        worfalarmchannel = self.bot.get_channel(929578974370234388)
        while not self.bot.is_closed():
            if datetime.datetime.now(pytz.timezone('Australia/Brisbane')).strftime("%H:%M") == "00:00":
                await binnyalarmchannel.send("<@294956096353730570> It's time to go to sleep!")
            if datetime.datetime.now(pytz.timezone('Australia/Melbourne')).strftime("%H:%M") == "01:00":
                await worfalarmchannel.send("<@262786101037498369> It's time to go to sleep!")
            await asyncio.sleep(60)

def setup(bot):
    bot.add_cog(gotosleep(bot))