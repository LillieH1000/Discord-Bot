import discord, datetime, json, httpx, asyncio
from discord.commands import Option, slash_command
from discord.ext import commands
from geopy.adapters import AioHTTPAdapter
from geopy.geocoders import Nominatim

class weather(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @slash_command(description="Get the current weather from an area")
    async def weather(self, ctx, city: Option(str, "Enter the City"), province: Option(str, "Enter the Province/Territory/State"), country: Option(str, "Enter the Country"), privacy: Option(str, "Will reply private or publicly to you", choices=["Private", "Public"])):
        if privacy == "Private":
            await ctx.defer(ephemeral=True)
        if privacy == "Public":
            await ctx.defer()
        async with Nominatim(
            user_agent="Selene_Discord_Bot",
            adapter_factory=AioHTTPAdapter,
        ) as geolocator:
            location = await geolocator.geocode(f"{city.lower()},{province.lower()},{country.lower()}")
            mainconfig = open('config.json')
            configdata = json.load(mainconfig)

            async with httpx.AsyncClient() as client:
                response = await client.get(f'https://api.weatherapi.com/v1/current.json?q={location.latitude},{location.longitude}&key={configdata["weatherapikey"]}')
                embed = discord.Embed(title=f"{response.json()['location']['name']}", description=f"{response.json()['current']['condition']['text']}", color=0xFFC0DD)
                embed.set_thumbnail(url=f"https:{response.json()['current']['condition']['icon']}")
                embed.add_field(name=f"Temperature", value=f"{response.json()['current']['temp_c']} °C | {response.json()['current']['temp_f']} °F", inline=False)
                embed.add_field(name=f"Wind", value=f"{response.json()['current']['wind_kph']} km/h | {response.json()['current']['wind_mph']} m/h", inline=False)
                embed.timestamp = datetime.datetime.now()

                if privacy == "Private":
                    await ctx.send_followup(embed=embed, ephemeral=True)
                if privacy == "Public":
                    await ctx.send_followup(embed=embed)

def setup(bot):
    bot.add_cog(weather(bot))