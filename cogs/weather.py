import discord, datetime, json, random, aiohttp, asyncio
from discord.commands import Option, slash_command
from discord.ext import commands
from discord.ui import Button, View

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
    async def weather(self, ctx, city: Option(str, "Enter the City"), province: Option(str, "Enter the Province/Territory"), country: Option(str, "Enter the Country")):
        await ctx.defer()
        async with aiohttp.ClientSession() as session:
            async with session.get(f'https://goweather.herokuapp.com/weather/{city.lower()},{province.lower()},{country.lower()}') as resp:
                response = await resp.json()
                
                # Regular View
                
                embed = discord.Embed(title=f"{city.capitalize()}", color=0xFFC0DD)
                embed.add_field(name=f"Current", value=f"{response['description']}\nTemperature: {response['temperature']}\nWind: {response['wind']}", inline=False)
                embed.timestamp = datetime.datetime.now()

                view = View(timeout=None)

                # Forecast View

                embedForecast = discord.Embed(title=f"{city.capitalize()}", color=0xFFC0DD)
                embedForecast.add_field(name=f"Current", value=f"{response['description']}\nTemperature: {response['temperature']}\nWind: {response['wind']}", inline=False)
                for a in response['forecast']:
                    embedForecast.add_field(name=f"Day {a['day']}", value=f"Temperature: {a['temperature']}\nWind: {a['wind']}", inline=False)
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