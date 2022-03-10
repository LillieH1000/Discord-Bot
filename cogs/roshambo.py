import discord, datetime, random
from discord.commands import slash_command
from discord.ext import commands
from discord.ui import Button, View

class roshambo(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @slash_command(description="Play roshambo")
    async def roshambo(self, ctx):
        await ctx.defer()
        embed = discord.Embed(title="Roshambo", description="You dare challenge me to roshambo", color=0xFFC0DD)
        embed.timestamp = datetime.datetime.now()

        embedWin = discord.Embed(title="Roshambo", description="He he he, I win, normally I would mute you for losing but you're lucky i'm feeling nice today", color=0xFFC0DD)
        embedWin.timestamp = datetime.datetime.now()

        embedLose = discord.Embed(title="Roshambo", description="How dare you beat me in roshambo, you won't be so lucky next time, you win nothing", color=0xFFC0DD)
        embedLose.timestamp = datetime.datetime.now()

        embedTie = discord.Embed(title="Roshambo", description="How dare you tie with me in roshambo, you won't be so lucky next time, I will leave for now", color=0xFFC0DD)
        embedTie.timestamp = datetime.datetime.now()

        view = View(timeout=None)

        async def callback(interaction):
            result = random.randint(1, 3)
            if result == 1:
                await interaction.response.edit_message(embed=embedWin, view=None)
            if result == 2:
                await interaction.response.edit_message(embed=embedLose, view=None)
            if result == 3:
                await interaction.response.edit_message(embed=embedTie, view=None)

        rockbutton = Button(label="Rock", style=discord.ButtonStyle.grey)
        rockbutton.callback = callback
        view.add_item(rockbutton)

        paperbutton = Button(label="Paper", style=discord.ButtonStyle.grey)
        paperbutton.callback = callback
        view.add_item(paperbutton)

        scissorsbutton = Button(label="Scissors", style=discord.ButtonStyle.grey)
        scissorsbutton.callback = callback
        view.add_item(scissorsbutton)

        await ctx.send_followup(embed=embed, view=view)

def setup(bot):
    bot.add_cog(roshambo(bot))