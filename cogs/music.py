import discord
from discord.commands import slash_command
from discord.commands import Option
from discord.ext import commands
from yt_dlp import YoutubeDL
import datetime

class music(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    def is_connected(self, ctx):
        voice_client = discord.utils.get(ctx.bot.voice_clients, guild=ctx.guild)
        return voice_client and voice_client.is_connected()

    def is_playing(self, ctx):
        voice_client = discord.utils.get(ctx.bot.voice_clients, guild=ctx.guild)
        return voice_client and voice_client.is_playing()

    def youtube_ytdlp(self, video):
        YTDL_OPTIONS = {
            'format': 'bestaudio/best',
            'extractaudio': True,
            'audioformat': 'mp3',
            'outtmpl': 'downloads/%(extractor)s-%(id)s-%(title)s.%(ext)s',
            'restrictfilenames': True,
            'noplaylist': True,
            'nocheckcertificate': True,
            'ignoreerrors': False,
            'logtostderr': False,
            'quiet': True,
            'no_warnings': True,
            'default_search': 'ytsearch',
            'source_address': '0.0.0.0',
        }
        with YoutubeDL(YTDL_OPTIONS) as ytdl:
            try:
                info = ytdl.extract_info(video, download=True)['entries'][0]
            except:
                info = ytdl.extract_info(video, download=True)
        return info['title'], info['url']

    @slash_command(guild_ids=[918949427522191361, 846702751350390825])
    async def connect(self, ctx):
        if not self.is_connected(ctx):
            await ctx.author.voice.channel.connect()
            embed = discord.Embed(title="Music Player", color=0xFFC0DD)
            embed.add_field(name="Connected To: ", value=ctx.author.voice.channel, inline=False)
            embed.timestamp = datetime.datetime.now()
            await ctx.respond(embed=embed)
    
    @slash_command(guild_ids=[918949427522191361, 846702751350390825])
    async def play(self, ctx, source: Option(str, "Choose audio source", choices=["YouTube", "SoundCloud"]), video: Option(str, "Enter video name or url"),):
        await self.connect(self, ctx)
        FFMPEG_OPTIONS = {
            'before_options': '-reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5',
            'options': '-vn',
        }
        name, url = self.youtube_ytdlp(video)
        # queue.append(name)
        # queue.append(url)
        # ctx.channel.guild.voice_client.volume = 0.1
        if not self.is_playing(ctx):
            ctx.channel.guild.voice_client.play(discord.FFmpegPCMAudio(url, **FFMPEG_OPTIONS))
            embed = discord.Embed(title="Music Player", color=0xFFC0DD)
            embed.add_field(name="Now Playing: ", value=name, inline=False)
            embed.timestamp = datetime.datetime.now()
            await ctx.respond(embed=embed)

    @slash_command(guild_ids=[918949427522191361, 846702751350390825])
    async def stop(self, ctx):
        if self.is_connected(ctx):
            ctx.channel.guild.voice_client.stop()
            await ctx.channel.guild.voice_client.disconnect()
            embed = discord.Embed(title="Music Player", color=0xFFC0DD)
            embed.add_field(name="Stopped Playing In: ", value=ctx.author.voice.channel, inline=False)
            embed.timestamp = datetime.datetime.now()
            await ctx.respond(embed=embed)

def setup(bot):
    bot.add_cog(music(bot))