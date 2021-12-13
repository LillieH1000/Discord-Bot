import discord
from discord.commands import slash_command
from discord.commands import Option
from discord.ext import commands
import datetime
import requests
import json

class pronoundb(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @slash_command(guild_ids=[918949427522191361, 881509316392263700])
    async def pronouns(self, ctx, user: discord.Member):
        response = requests.get(f"https://pronoundb.org/api/v1/lookup?platform=discord&id={user.id}")
        responsejson = response.json()
        if responsejson["pronouns"] == "unspecified":
            pronoun = "unspecified"
        if responsejson["pronouns"] == "hh":
            pronoun = "he/him"
        if responsejson["pronouns"] == "hi":
            pronoun = "he/it"
        if responsejson["pronouns"] == "hs":
            pronoun = "he/she"
        if responsejson["pronouns"] == "ht":
            pronoun = "he/they"
        if responsejson["pronouns"] == "ih":
            pronoun = "it/him"
        if responsejson["pronouns"] == "ii":
            pronoun = "it/its"
        if responsejson["pronouns"] == "is":
            pronoun = "it/she"
        if responsejson["pronouns"] == "it":
            pronoun = "it/they"
        if responsejson["pronouns"] == "shh":
            pronoun = "she/he"
        if responsejson["pronouns"] == "sh":
            pronoun = "she/her"
        if responsejson["pronouns"] == "si":
            pronoun = "she/it"
        if responsejson["pronouns"] == "st":
            pronoun = "she/they"
        if responsejson["pronouns"] == "th":
            pronoun = "they/he"
        if responsejson["pronouns"] == "ti":
            pronoun = "they/it"
        if responsejson["pronouns"] == "ts":
            pronoun = "they/she"
        if responsejson["pronouns"] == "tt":
            pronoun = "they/them"
        if responsejson["pronouns"] == "any":
            pronoun = "Any pronouns"
        if responsejson["pronouns"] == "other":
            pronoun = "Other pronouns"
        if responsejson["pronouns"] == "ask":
            pronoun = "Ask me my pronouns"
        if responsejson["pronouns"] == "avoid":
            pronoun = "Avoid pronouns, use my name"
        embed = discord.Embed(title="PronounDB", color=0xFFC0DD)
        embed.add_field(name=f"Pronouns of {user.name}: ", value=pronoun, inline=False)
        embed.timestamp = datetime.datetime.now()
        await ctx.respond(embed=embed, delete_after=30.0)

def setup(bot):
    bot.add_cog(pronoundb(bot))