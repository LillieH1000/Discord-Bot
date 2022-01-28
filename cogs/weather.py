import discord, datetime, json, random, aiohttp, asyncio, pytz
from discord.commands import Option, slash_command
from discord.ext import commands
from discord.ui import Button, View
from geopy.adapters import AioHTTPAdapter
from geopy.geocoders import Nominatim

class weather(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    # Guilds Loader

    guildconfig = open('guilds.json')
    data = json.load(guildconfig)
    guildscount = 0
    guildids = ""
    for guild in data["guilds"]:
        guildids += guild
        guildscount += 1
        if (len(data["guilds"]) != guildscount):
            guildids += str(",")

    @slash_command(guild_ids=[int(x) for x in guildids.split(",")], description="Get the current weather from an area")
    async def weather(self, ctx, city: Option(str, "Enter the City"), province: Option(str, "Enter the Province/Territory/State"), country: Option(str, "Enter the Country")):
        await ctx.defer()
        async with Nominatim(
            user_agent="Selene_Discord_Bot",
            adapter_factory=AioHTTPAdapter,
        ) as geolocator:
            location = await geolocator.geocode(f"{city.lower()},{province.lower()},{country.lower()}")

            async with aiohttp.ClientSession() as session:
                async with session.get(f'https://api.weatherapi.com/v1/current.json?q={location.latitude},{location.longitude}&key=5437620069ee48a0ae821912222801') as resp:
                    response = await resp.json()
                    
                    embed = discord.Embed(title=f"{response['location']['name']}", description=f"{response['current']['condition']['text']}", color=0xFFC0DD)
                    embed.set_thumbnail(url=f"https:{response['current']['condition']['icon']}")
                    embed.add_field(name=f"Temperature", value=f"{response['current']['temp_c']} °C | {response['current']['temp_f']} °F", inline=False)
                    embed.add_field(name=f"Wind", value=f"{response['current']['wind_kph']} km/h | {response['current']['wind_mph']} m/h", inline=False)
                    embed.timestamp = datetime.datetime.now()

                    await ctx.send_followup(embed=embed)

def setup(bot):
    bot.add_cog(weather(bot))