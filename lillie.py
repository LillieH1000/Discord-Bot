import discord
from discord.ext import tasks
from yt_dlp import YoutubeDL
import requests
import datetime
import json

bot = discord.Bot()

# Config Loader

config = open('config.json')
data = json.load(config)
token = data['token']

# Events

@bot.event
async def on_ready():
    print(f"Logged in as {bot.user.name}");
    await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name="Selene Be Adorable"))

# Tasks

@tasks.loop(seconds=60)
async def memberbackgroundtask():
    lilliesservermember = bot.get_channel(919325611858722817)
    lilliesservermembers = f"Members: {bot.get_guild(918949427522191361).member_count}"
    await lilliesservermember.edit(name=lilliesservermembers)

@memberbackgroundtask.before_loop
async def memberbackgroundtask_before():
    await bot.wait_until_ready()

# Music Commands

queue = []

def is_connected(ctx):
    voice_client = discord.utils.get(ctx.bot.voice_clients, guild=ctx.guild)
    return voice_client and voice_client.is_connected()

def is_playing(ctx):
    voice_client = discord.utils.get(ctx.bot.voice_clients, guild=ctx.guild)
    return voice_client and voice_client.is_playing()

def youtube_ytdlp(arg):
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
            info = ytdl.extract_info(arg, download=True)['entries'][0]
        except:
            info = ytdl.extract_info(arg, download=True)
    return info['title'], info['url']

# def audioplayer():

@bot.slash_command(guild_ids=[918949427522191361, 846702751350390825])
async def connect(ctx):
    if not is_connected(ctx):
        await ctx.author.voice.channel.connect()
        embed = discord.Embed(title="Music Player", color=0xFFC0DD)
        embed.add_field(name="Connected To: ", value=ctx.author.voice.channel, inline=False)
        embed.timestamp = datetime.datetime.now()
        await ctx.respond(embed=embed)

@bot.slash_command(guild_ids=[918949427522191361, 846702751350390825])
async def play(ctx, *, arg):
    await connect(ctx)
    FFMPEG_OPTIONS = {
        'before_options': '-reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5',
        'options': '-vn',
    }
    name, url = youtube_ytdlp(arg)
    queue.append(name)
    queue.append(url)
    # ctx.channel.guild.voice_client.volume = 0.1
    if not is_playing(ctx):
        ctx.channel.guild.voice_client.play(discord.FFmpegPCMAudio(url, **FFMPEG_OPTIONS))
        embed = discord.Embed(title="Music Player", color=0xFFC0DD)
        embed.add_field(name="Now Playing: ", value=name, inline=False)
        embed.timestamp = datetime.datetime.now()
        await ctx.respond(embed=embed)

@bot.slash_command(guild_ids=[918949427522191361, 846702751350390825])
async def stop(ctx):
    if is_connected(ctx):
        ctx.channel.guild.voice_client.stop()
        await ctx.channel.guild.voice_client.disconnect()
        embed = discord.Embed(title="Music Player", color=0xFFC0DD)
        embed.add_field(name="Stopped Playing In: ", value=ctx.author.voice.channel, inline=False)
        embed.timestamp = datetime.datetime.now()
        await ctx.respond(embed=embed)

@bot.slash_command(guild_ids=[918949427522191361, 846702751350390825])
async def volume(ctx, *, arg):
    if is_connected(ctx):
        await ctx.respond(f"Sheep")
        # ctx.channel.guild.voice_client.volume = int(arg) / 100

@bot.slash_command(guild_ids=[918949427522191361, 846702751350390825])
async def pause(ctx):
    ctx.channel.guild.voice_client.pause()
    await ctx.respond(f"Sheep")

@bot.slash_command(guild_ids=[918949427522191361, 846702751350390825])
async def resume(ctx):
    ctx.channel.guild.voice_client.resume()
    await ctx.respond(f"Sheep")

# Run

memberbackgroundtask.start()
bot.run(token)