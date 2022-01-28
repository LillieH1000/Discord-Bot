import discord, datetime, json, random, aiohttp, asyncio, pytz
from discord.commands import Option, slash_command
from discord.ext import commands
from discord.ui import Button, View
from geopy.adapters import AioHTTPAdapter
from geopy.geocoders import Nominatim
from timezonefinder import TimezoneFinder

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
    async def weather(self, ctx, city: Option(str, "Enter the City"), province: Option(str, "Enter the Province/Territory/State")):
        await ctx.defer()
        async with Nominatim(
            user_agent="Selene_Discord_Bot",
            adapter_factory=AioHTTPAdapter,
        ) as geolocator:
            location = await geolocator.geocode(f"{city.lower()},{province.lower()}")
            tf = TimezoneFinder()
            timezone = tf.timezone_at(lng=location.longitude, lat=location.latitude)
            currentdate = datetime.datetime.now(pytz.timezone(timezone))
            tomorrowdate = currentdate + datetime.timedelta(days=1)
            aftertomorrowdate = currentdate + datetime.timedelta(days=2)

            async with aiohttp.ClientSession() as session:
                async with session.get(f'https://goweather.herokuapp.com/weather/{city.lower()},{province.lower()}') as resp:
                    response = await resp.json()
                    
                    # Regular View
                    
                    embed = discord.Embed(title=f"{city.capitalize()}", color=0xFFC0DD)
                    embed.add_field(name=f"Current", value=f"{response['description']}\nTemperature: {response['temperature']} / {((int(response['temperature'][0:-3]) * 1.8) + 32):0.1f} °F\nWind: {response['wind']}", inline=False)
                    embed.timestamp = datetime.datetime.now()

                    view = View(timeout=None)

                    # Forecast View

                    embedForecast = discord.Embed(title=f"{city.capitalize()}", color=0xFFC0DD)
                    embedForecast.add_field(name=f"Current", value=f"{response['description']}\nTemperature: {response['temperature']} / {((int(response['temperature'][0:-3]) * 1.8) + 32):0.1f} °F\nWind: {response['wind']}", inline=False)
                    b = 1
                    for a in response['forecast']:
                        if b == 1:
                            embedForecast.add_field(name=currentdate.strftime("%B %d"), value=f"Temperature: {a['temperature']} / {((int(a['temperature'][0:-3]) * 1.8) + 32):0.1f} °F\nWind: {a['wind']}", inline=False)
                        if b == 2:
                            embedForecast.add_field(name=tomorrowdate.strftime("%B %d"), value=f"Temperature: {a['temperature']} / {((int(a['temperature'][0:-3]) * 1.8) + 32):0.1f} °F\nWind: {a['wind']}", inline=False)
                        if b == 3:
                            embedForecast.add_field(name=aftertomorrowdate.strftime("%B %d"), value=f"Temperature: {a['temperature']} / {((int(a['temperature'][0:-3]) * 1.8) + 32):0.1f} °F\nWind: {a['wind']}", inline=False)
                        b += 1
                    embedForecast.timestamp = datetime.datetime.now()

                    viewForecast = View(timeout=None)

                    async def regular_callback(interaction):
                        await interaction.response.edit_message(embed=embed, view=view)

                    async def forecast_callback(interaction):
                        await interaction.response.edit_message(embed=embedForecast, view=viewForecast)

                    showforecast = Button(label="Show 3 Day Forecast", style=discord.ButtonStyle.grey)
                    showforecast.callback = forecast_callback
                    view.add_item(showforecast)

                    hideforecast = Button(label="Hide 3 Day Forecast", style=discord.ButtonStyle.grey)
                    hideforecast.callback = regular_callback
                    viewForecast.add_item(hideforecast)

                    await ctx.send_followup(embed=embed, view=view)

def setup(bot):
    bot.add_cog(weather(bot))