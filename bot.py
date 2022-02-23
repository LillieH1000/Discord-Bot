import discord, json, os

intents = discord.Intents().all()
bot = discord.Bot(intents=intents)

# Config Loader

config = open('config.json')
data = json.load(config)

# Events

@bot.event
async def on_ready():
    print(f"Logged in as {bot.user.name}");
    await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name="Lillie Be Adorable"))

# Run

for filename in os.listdir('./cogs'):
  if filename.endswith('.py'):
    bot.load_extension(f'cogs.{filename[:-3]}')
bot.run(data['token'])