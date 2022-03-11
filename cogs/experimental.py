import discord, datetime, pyttsx3
from discord.commands import Option, slash_command
from discord.ext import commands

class experimental(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @slash_command(guild_ids=[416350699794857986, 918949427522191361], description="Experimental voice stuff")
    async def tts(self, ctx, voice: Option(str, "Choose voice", choices=["Female", "Male"]), text: Option(str, "Enter text to speech")):
        await ctx.defer(ephemeral=True)

        engine = pyttsx3.init()
        voices = engine.getProperty('voices')
        if voice == "Female":
            engine.setProperty('voice', voices[1].id)
        if voice == "Male":
            engine.setProperty('voice', voices[0].id)
        engine.save_to_file(text, 'speech.mp3')
        engine.runAndWait()

        source = await discord.FFmpegOpusAudio.from_probe("speech.mp3")
        ctx.channel.guild.voice_client.play(source)

        await ctx.send_followup(f"Sent the command", ephemeral=True)

def setup(bot):
    bot.add_cog(experimental(bot))