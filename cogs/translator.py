import discord, datetime
from discord.ext import commands
from googletrans import Translator

class translator(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.id == self.bot.user.id:
            return

        translator = Translator()
        translation = translator.translate(message.content, dest='en')

        embed = discord.Embed(color=0xFFC0DD, title="English Translation", description=f"{translation.text}")
        embed.timestamp = datetime.datetime.now()

        if translation.src != "en":
            await message.reply(embed=embed)


def setup(bot):
    bot.add_cog(translator(bot))