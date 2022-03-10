import discord, datetime, json, httpx, asyncio
from discord.commands import slash_command
from discord.ext import commands

class pronoundb(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @slash_command(description="Get a users pronouns")
    async def pronouns(self, ctx, user: discord.Member):
        await ctx.defer(ephemeral=True)
        async with httpx.AsyncClient() as client:
            response = await client.get(f'https://pronoundb.org/api/v1/lookup?platform=discord&id={user.id}')
            if response.json()["pronouns"] == "unspecified":
                pronoun = "unspecified"
            if response.json()["pronouns"] == "hh":
                pronoun = "he/him"
            if response.json()["pronouns"] == "hi":
                pronoun = "he/it"
            if response.json()["pronouns"] == "hs":
                pronoun = "he/she"
            if response.json()["pronouns"] == "ht":
                pronoun = "he/they"
            if response.json()["pronouns"] == "ih":
                pronoun = "it/him"
            if response.json()["pronouns"] == "ii":
                pronoun = "it/its"
            if response.json()["pronouns"] == "is":
                pronoun = "it/she"
            if response.json()["pronouns"] == "it":
                pronoun = "it/they"
            if response.json()["pronouns"] == "shh":
                pronoun = "she/he"
            if response.json()["pronouns"] == "sh":
                pronoun = "she/her"
            if response.json()["pronouns"] == "si":
                pronoun = "she/it"
            if response.json()["pronouns"] == "st":
                pronoun = "she/they"
            if response.json()["pronouns"] == "th":
                pronoun = "they/he"
            if response.json()["pronouns"] == "ti":
                pronoun = "they/it"
            if response.json()["pronouns"] == "ts":
                pronoun = "they/she"
            if response.json()["pronouns"] == "tt":
                pronoun = "they/them"
            if response.json()["pronouns"] == "any":
                pronoun = "Any pronouns"
            if response.json()["pronouns"] == "other":
                pronoun = "Other pronouns"
            if response.json()["pronouns"] == "ask":
                pronoun = "Ask me my pronouns"
            if response.json()["pronouns"] == "avoid":
                pronoun = "Avoid pronouns, use my name"
            embed = discord.Embed(title="PronounDB", color=0xFFC0DD)
            embed.add_field(name=f"Pronouns of {user.name}: ", value=pronoun, inline=False)
            embed.timestamp = datetime.datetime.now()
            await ctx.send_followup(embed=embed, ephemeral=True)

def setup(bot):
    bot.add_cog(pronoundb(bot))