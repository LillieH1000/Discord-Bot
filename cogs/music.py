import discord
from discord.commands import slash_command
from discord.commands import Option
from discord.ext import commands
from yt_dlp import YoutubeDL
import datetime
import asyncio

class music(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    queue = []

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

    def soundcloud_ytdlp(self, video):
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
            'default_search': 'scsearch',
            'source_address': '0.0.0.0',
        }
        with YoutubeDL(YTDL_OPTIONS) as ytdl:
            try:
                info = ytdl.extract_info(video, download=True)['entries'][0]
            except:
                info = ytdl.extract_info(video, download=True)
        return info['title'], info['url']

    async def audio_player(self, ctx):
        if self.queue:
            FFMPEG_OPTIONS = {
                'before_options': '-reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5',
                'options': '-vn',
            }
            ctx.channel.guild.voice_client.play(discord.PCMVolumeTransformer(discord.FFmpegPCMAudio(self.queue[1], **FFMPEG_OPTIONS)), after=lambda e: asyncio.run_coroutine_threadsafe(self.audio_player(ctx), self.bot.loop))
            ctx.channel.guild.voice_client.source.volume = 0.5
            embed = discord.Embed(title="Music Player", color=0xFFC0DD)
            embed.add_field(name="Now Playing: ", value=self.queue[0], inline=False)
            embed.timestamp = datetime.datetime.now()
            await ctx.respond(embed=embed)
            del self.queue[:2]

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
        if source == "YouTube":
            name, url = self.youtube_ytdlp(video)
        if source == "SoundCloud":
            name, url = self.soundcloud_ytdlp(video)
        self.queue.append(name)
        self.queue.append(url)
        embed = discord.Embed(title="Music Player", color=0xFFC0DD)
        embed.add_field(name="Added To Queue: ", value=name, inline=False)
        embed.timestamp = datetime.datetime.now()
        await ctx.respond(embed=embed)
        if not self.is_playing(ctx):
            await self.audio_player(ctx)

    @slash_command(guild_ids=[918949427522191361, 846702751350390825])
    async def stop(self, ctx):
        if self.is_connected(ctx):
            self.queue.clear()
            ctx.channel.guild.voice_client.stop()
            await ctx.channel.guild.voice_client.disconnect()
            embed = discord.Embed(title="Music Player", color=0xFFC0DD)
            embed.add_field(name="Stopped Playing In: ", value=ctx.author.voice.channel, inline=False)
            embed.timestamp = datetime.datetime.now()
            await ctx.respond(embed=embed)

    @slash_command(guild_ids=[918949427522191361, 846702751350390825])
    async def pause(self, ctx):
        if self.is_connected(ctx):
            if self.is_playing(ctx):
                ctx.channel.guild.voice_client.pause()
                embed = discord.Embed(title="Music Player", color=0xFFC0DD)
                embed.add_field(name="Paused Playing In: ", value=ctx.author.voice.channel, inline=False)
                embed.timestamp = datetime.datetime.now()
                await ctx.respond(embed=embed)

    @slash_command(guild_ids=[918949427522191361, 846702751350390825])
    async def resume(self, ctx):
        if self.is_connected(ctx):
            if not self.is_playing(ctx):
                ctx.channel.guild.voice_client.resume()
                embed = discord.Embed(title="Music Player", color=0xFFC0DD)
                embed.add_field(name="Resumed Playing In: ", value=ctx.author.voice.channel, inline=False)
                embed.timestamp = datetime.datetime.now()
                await ctx.respond(embed=embed)

    @slash_command(guild_ids=[918949427522191361, 846702751350390825])
    async def volume(self, ctx, volume: Option(int, "Enter the volume you want"),):
        if self.is_connected(ctx):
            ctx.channel.guild.voice_client.source.volume = volume / 100
            embed = discord.Embed(title="Music Player", color=0xFFC0DD)
            embed.add_field(name="Test", value=ctx.author.voice.channel, inline=False)
            embed.timestamp = datetime.datetime.now()
            await ctx.respond(embed=embed)

def setup(bot):
    bot.add_cog(music(bot))