import discord, datetime, requests, json
from discord.commands import Option, slash_command
from discord.ext import commands

class pronoundb(commands.Cog):
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

    @slash_command(guild_ids=[int(x) for x in guildids.split(",")], description="Get a users pronouns")
    async def pronouns(self, ctx, user: discord.Member):
        await ctx.defer()
        response = requests.get(f"https://pronoundb.org/api/v1/lookup?platform=discord&id={user.id}").json()
        if response["pronouns"] == "unspecified":
            pronoun = "unspecified"
        if response["pronouns"] == "hh":
            pronoun = "he/him"
        if response["pronouns"] == "hi":
            pronoun = "he/it"
        if response["pronouns"] == "hs":
            pronoun = "he/she"
        if response["pronouns"] == "ht":
            pronoun = "he/they"
        if response["pronouns"] == "ih":
            pronoun = "it/him"
        if response["pronouns"] == "ii":
            pronoun = "it/its"
        if response["pronouns"] == "is":
            pronoun = "it/she"
        if response["pronouns"] == "it":
            pronoun = "it/they"
        if response["pronouns"] == "shh":
            pronoun = "she/he"
        if response["pronouns"] == "sh":
            pronoun = "she/her"
        if response["pronouns"] == "si":
            pronoun = "she/it"
        if response["pronouns"] == "st":
            pronoun = "she/they"
        if response["pronouns"] == "th":
            pronoun = "they/he"
        if response["pronouns"] == "ti":
            pronoun = "they/it"
        if response["pronouns"] == "ts":
            pronoun = "they/she"
        if response["pronouns"] == "tt":
            pronoun = "they/them"
        if response["pronouns"] == "any":
            pronoun = "Any pronouns"
        if response["pronouns"] == "other":
            pronoun = "Other pronouns"
        if response["pronouns"] == "ask":
            pronoun = "Ask me my pronouns"
        if response["pronouns"] == "avoid":
            pronoun = "Avoid pronouns, use my name"
        embed = discord.Embed(title="PronounDB", color=0xFFC0DD)
        embed.add_field(name=f"Pronouns of {user.name}: ", value=pronoun, inline=False)
        embed.timestamp = datetime.datetime.now()
        await ctx.send_followup(embed=embed, delete_after=60.0)

def setup(bot):
    bot.add_cog(pronoundb(bot))