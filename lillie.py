import discord
from discord.ext import tasks
from yt_dlp import YoutubeDL
import requests
import datetime
import json

# Regular Commands

from discord.ext import commands
bot = commands.Bot(command_prefix="!")

# Slash Commands

# bot = discord.Bot()

# Config Loader

config = open('config.json')
data = json.load(config)
token = data['token']

# Events

@bot.event
async def on_ready():
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

# Commands

def is_connected(ctx):
    voice_client = discord.utils.get(ctx.bot.voice_clients, guild=ctx.guild)
    return voice_client and voice_client.is_connected()

@bot.command()
async def connect(ctx):
    if not is_connected(ctx):
        await ctx.author.voice.channel.connect()
        embed = discord.Embed(title="Music Player", color=0xFFC0DD)
        embed.add_field(name="Connected To: ", value=ctx.author.voice.channel, inline=False)
        embed.timestamp = datetime.datetime.now()
        await ctx.reply(embed=embed)

@bot.command()
async def play(ctx):
    await connect(ctx)
    FFMPEG_OPTIONS = {
        # 'before_options': '-reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5',
        'options': '-vn',
    }
    # ctx.channel.guild.voice_client.volume(0.5)
    ctx.channel.guild.voice_client.play(discord.FFmpegPCMAudio("Curses.mp3", **FFMPEG_OPTIONS))
    await ctx.reply(f"Sheep")

@bot.command()
async def stop(ctx):
    if is_connected(ctx):
        ctx.channel.guild.voice_client.stop()
        await ctx.channel.guild.voice_client.disconnect()
        embed = discord.Embed(title="Music Player", color=0xFFC0DD)
        embed.add_field(name="Stopped Playing In: ", value=ctx.author.voice.channel, inline=False)
        embed.timestamp = datetime.datetime.now()
        await ctx.reply(embed=embed)

@bot.command()
async def pause(ctx):
    ctx.channel.guild.voice_client.pause()
    await ctx.reply(f"Sheep")

@bot.command()
async def resume(ctx):
    ctx.channel.guild.voice_client.resume()
    await ctx.reply(f"Sheep")

# Run

memberbackgroundtask.start()
bot.run(token)