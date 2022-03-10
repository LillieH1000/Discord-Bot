import discord, datetime, asyncio, pytz
from discord.ext import commands

class gotosleep(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.sleepbgtask = self.bot.loop.create_task(self.go_to_sleep())

    async def go_to_sleep(self):
        await self.bot.wait_until_ready()
        binnyalarmguild = self.bot.get_guild(881509316392263700)
        binnyalarmchannel = binnyalarmguild.get_channel(925409964695105606)
        while not self.bot.is_closed():
            if datetime.datetime.now(pytz.timezone('Australia/Brisbane')).strftime("%H:%M") == "00:00":
                await binnyalarmchannel.send("<@294956096353730570> It's time to go to sleep!")
            await asyncio.sleep(60)

def setup(bot):
    bot.add_cog(gotosleep(bot))