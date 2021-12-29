import discord
import json
import os

bot = discord.Bot()

# Config Loader

config = open('config.json')
data = json.load(config)
token = data['token']

# Events

@bot.event
async def on_ready():
    print(f"Logged in as {bot.user.name}");
    await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name="Piplup"))

# Run

for filename in os.listdir('./cogs'):
  if filename.endswith('.py'):
    bot.load_extension(f'cogs.{filename[:-3]}')
bot.run(token)