import discord, datetime, json, random, httpx, asyncio
from discord.commands import Option, slash_command
from discord.ext import commands
from discord.ui import Button, View

class other(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @slash_command(description="Posts a random cat picture")
    async def cat(self, ctx, source: Option(str, "Choose cat pics source", choices=["Nekos.Life", "AlexFlipnote.Dev"])):
        await ctx.defer()
        async with httpx.AsyncClient() as client:
            if source == "Nekos.Life":
                response = await client.get(f'https://nekos.life/api/v2/img/meow')
                embed = discord.Embed(title="Cat Pics", color=0xFFC0DD)
                embed.set_image(url=response.json()["url"])
                embed.timestamp = datetime.datetime.now()

                vieworiginalimage = Button(label="View Original Image", url=f"{response.json()['url']}", style=discord.ButtonStyle.grey)

                view = View(timeout=None)
                view.add_item(vieworiginalimage)

                await ctx.send_followup(embed=embed, view=view)
            if source == "AlexFlipnote.Dev":
                response = await client.get(f'https://api.alexflipnote.dev/cats')
                embed = discord.Embed(title="Cat Pics", color=0xFFC0DD)
                embed.set_image(url=response.json()["file"])
                embed.timestamp = datetime.datetime.now()

                vieworiginalimage = Button(label="View Original Image", url=f"{response.json()['file']}", style=discord.ButtonStyle.grey)

                view = View(timeout=None)
                view.add_item(vieworiginalimage)

                await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Posts a random dog picture")
    async def dog(self, ctx, source: Option(str, "Choose dog pics source", choices=["Dog.Ceo", "Nekos.Life", "AlexFlipnote.Dev"])):
        await ctx.defer()
        async with httpx.AsyncClient() as client:
            if source == "Dog.Ceo":
                response = await client.get(f'https://dog.ceo/api/breeds/image/random')
                embed = discord.Embed(title="Dog Pics", color=0xFFC0DD)
                embed.set_image(url=response.json()["message"])
                embed.timestamp = datetime.datetime.now()
                
                vieworiginalimage = Button(label="View Original Image", url=f"{response.json()['message']}", style=discord.ButtonStyle.grey)

                view = View(timeout=None)
                view.add_item(vieworiginalimage)

                await ctx.send_followup(embed=embed, view=view)
            if source == "Nekos.Life":
                response = await client.get(f'https://nekos.life/api/v2/img/woof')
                embed = discord.Embed(title="Dog Pics", color=0xFFC0DD)
                embed.set_image(url=response.json()["url"])
                embed.timestamp = datetime.datetime.now()

                vieworiginalimage = Button(label="View Original Image", url=f"{response.json()['url']}", style=discord.ButtonStyle.grey)

                view = View(timeout=None)
                view.add_item(vieworiginalimage)

                await ctx.send_followup(embed=embed, view=view)
            if source == "AlexFlipnote.Dev":
                response = await client.get(f'https://api.alexflipnote.dev/dogs')
                embed = discord.Embed(title="Dog Pics", color=0xFFC0DD)
                embed.set_image(url=response.json()["file"])
                embed.timestamp = datetime.datetime.now()

                vieworiginalimage = Button(label="View Original Image", url=f"{response.json()['file']}", style=discord.ButtonStyle.grey)

                view = View(timeout=None)
                view.add_item(vieworiginalimage)

                await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Posts a random birb picture")
    async def birb(self, ctx):
        await ctx.defer()
        async with httpx.AsyncClient() as client:
            response = await client.get(f'https://api.alexflipnote.dev/birb')
            embed = discord.Embed(title="Birb Pics", color=0xFFC0DD)
            embed.set_image(url=response.json()["file"])
            embed.timestamp = datetime.datetime.now()
            
            vieworiginalimage = Button(label="View Original Image", url=f"{response.json()['file']}", style=discord.ButtonStyle.grey)

            view = View(timeout=None)
            view.add_item(vieworiginalimage)

            await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Posts a random neko picture")
    async def neko(self, ctx, source: Option(str, "Choose neko pics source", choices=["Nekos.Life", "Waifu.Pics", "Nekos.Best"])):
        await ctx.defer()
        async with httpx.AsyncClient() as client:
            if source == "Nekos.Life":
                response = await client.get(f'https://nekos.life/api/v2/img/neko')
                embed = discord.Embed(title="Neko Pics", color=0xFFC0DD)
                embed.set_image(url=response.json()["url"])
                embed.timestamp = datetime.datetime.now()
                
                vieworiginalimage = Button(label="View Original Image", url=f"{response.json()['url']}", style=discord.ButtonStyle.grey)

                view = View(timeout=None)
                view.add_item(vieworiginalimage)

                await ctx.send_followup(embed=embed, view=view)
            if source == "Waifu.Pics":
                response = await client.get(f'https://api.waifu.pics/sfw/neko')
                embed = discord.Embed(title="Neko Pics", color=0xFFC0DD)
                embed.set_image(url=response.json()["url"])
                embed.timestamp = datetime.datetime.now()
                
                vieworiginalimage = Button(label="View Original Image", url=f"{response.json()['url']}", style=discord.ButtonStyle.grey)

                view = View(timeout=None)
                view.add_item(vieworiginalimage)

                await ctx.send_followup(embed=embed, view=view)
            if source == "Nekos.Best":
                response = await client.get(f'https://nekos.best/api/v2/neko')
                embed = discord.Embed(title="Neko Pics", color=0xFFC0DD)
                embed.set_image(url=response.json()["results"][0]["url"])
                embed.timestamp = datetime.datetime.now()
                
                vieworiginalimage = Button(label="View Original Image", url=f"{response.json()['results'][0]['url']}", style=discord.ButtonStyle.grey)

                view = View(timeout=None)
                view.add_item(vieworiginalimage)

                await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Posts a random coffee picture")
    async def coffee(self, ctx):
        await ctx.defer()
        async with httpx.AsyncClient() as client:
            response = await client.get(f'https://coffee.alexflipnote.dev/random.json')
            embed = discord.Embed(title="Coffee Pics", color=0xFFC0DD)
            embed.set_image(url=response.json()["file"])
            embed.timestamp = datetime.datetime.now()
            
            vieworiginalimage = Button(label="View Original Image", url=f"{response.json()['file']}", style=discord.ButtonStyle.grey)

            view = View(timeout=None)
            view.add_item(vieworiginalimage)

            await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Posts a random goose picture")
    async def goose(self, ctx):
        await ctx.defer()
        async with httpx.AsyncClient() as client:
            response = await client.get(f'https://nekos.life/api/v2/img/goose')
            embed = discord.Embed(title="Goose Pics", color=0xFFC0DD)
            embed.set_image(url=response.json()["url"])
            embed.timestamp = datetime.datetime.now()
            
            vieworiginalimage = Button(label="View Original Image", url=f"{response.json()['url']}", style=discord.ButtonStyle.grey)

            view = View(timeout=None)
            view.add_item(vieworiginalimage)

            await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Posts a random chuck norris joke")
    async def chucknorris(self, ctx):
        await ctx.defer()
        async with httpx.AsyncClient() as client:
            response = await client.get(f'https://api.chucknorris.io/jokes/random')
            embed = discord.Embed(color=0xFFC0DD)
            embed.set_thumbnail(url=response.json()["icon_url"])
            embed.add_field(name="Chuck Norris", value=response.json()["value"], inline=False)
            embed.timestamp = datetime.datetime.now()
            await ctx.send_followup(embed=embed)

    @slash_command(description="Posts a random waifu pic")
    async def waifu(self, ctx):
        await ctx.defer()
        async with httpx.AsyncClient() as client:
            response = await client.get(f'https://api.waifu.pics/sfw/waifu')
            embed = discord.Embed(title="Waifu Pics", color=0xFFC0DD)
            embed.set_image(url=response.json()["url"])
            embed.timestamp = datetime.datetime.now()
            
            vieworiginalimage = Button(label="View Original Image", url=f"{response.json()['url']}", style=discord.ButtonStyle.grey)

            view = View(timeout=None)
            view.add_item(vieworiginalimage)

            await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Posts a random duck pic")
    async def duck(self, ctx):
        await ctx.defer()
        async with httpx.AsyncClient() as client:
            response = await client.get(f'https://random-d.uk/api/v2/random')
            embed = discord.Embed(title="Duck Pics", color=0xFFC0DD)
            embed.set_image(url=response.json()["url"])
            embed.timestamp = datetime.datetime.now()
            
            vieworiginalimage = Button(label="View Original Image", url=f"{response.json()['url']}", style=discord.ButtonStyle.grey)

            view = View(timeout=None)
            view.add_item(vieworiginalimage)

            await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Posts a random fox pic")
    async def fox(self, ctx):
        await ctx.defer()
        async with httpx.AsyncClient() as client:
            response = await client.get(f'https://randomfox.ca/floof/')
            embed = discord.Embed(title="Fox Pics", color=0xFFC0DD)
            embed.set_image(url=response.json()["image"])
            embed.timestamp = datetime.datetime.now()
            
            vieworiginalimage = Button(label="View Original Image", url=f"{response.json()['image']}", style=discord.ButtonStyle.grey)

            view = View(timeout=None)
            view.add_item(vieworiginalimage)

            await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Posts a random megumin pic")
    async def megumin(self, ctx):
        await ctx.defer()
        async with httpx.AsyncClient() as client:
            response = await client.get(f'https://api.waifu.pics/sfw/megumin')
            embed = discord.Embed(title="Megumin Pics", color=0xFFC0DD)
            embed.set_image(url=response.json()["url"])
            embed.timestamp = datetime.datetime.now()
            
            vieworiginalimage = Button(label="View Original Image", url=f"{response.json()['url']}", style=discord.ButtonStyle.grey)

            view = View(timeout=None)
            view.add_item(vieworiginalimage)

            await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Role a dice with any sides you define")
    async def dice(self, ctx, sides: Option(int, "How many sides is the dice")):
        await ctx.defer()
        embed = discord.Embed(title="Dice", description=f"You rolled a {random.randint(1, sides):,}", color=0xFFC0DD)
        embed.timestamp = datetime.datetime.now()
        await ctx.send_followup(embed=embed)

    @slash_command(description="Pat a user")
    async def pat(self, ctx, user: discord.Member):
        await ctx.defer(ephemeral=True)
        async with httpx.AsyncClient() as client:
            response = await client.get(f'https://api.waifu.pics/sfw/pat')
            embed = discord.Embed(color=0xFFC0DD)
            embed.set_image(url=response.json()["url"])
            embed.timestamp = datetime.datetime.now()

            vieworiginalimage = Button(label="View Original Image", url=f"{response.json()['url']}", style=discord.ButtonStyle.grey)

            view = View(timeout=None)
            view.add_item(vieworiginalimage)

            await ctx.send(content=f"{user.mention}", embed=embed, view=view)
            await ctx.send_followup(f"Successfully patted the user", ephemeral=True)

    @slash_command(description="Posts a random dad joke")
    async def dadjoke(self, ctx):
        await ctx.defer()
        async with httpx.AsyncClient() as client:
            headers = {'Accept': 'application/json'}
            response = await client.get(f'https://icanhazdadjoke.com/', headers=headers)
            embed = discord.Embed(color=0xFFC0DD, title="Dad Joke", description=f"{response.json()['joke']}")
            embed.timestamp = datetime.datetime.now()
            await ctx.send_followup(embed=embed)

    @slash_command(description="Posts a random axolotl pic")
    async def axolotl(self, ctx):
        await ctx.defer()
        async with httpx.AsyncClient() as client:
            response = await client.get(f'https://axoltlapi.herokuapp.com/')
            embed = discord.Embed(title="Axolotl Pics", color=0xFFC0DD)
            embed.set_image(url=response.json()["url"])
            embed.timestamp = datetime.datetime.now()
            
            vieworiginalimage = Button(label="View Original Image", url=f"{response.json()['url']}", style=discord.ButtonStyle.grey)

            view = View(timeout=None)
            view.add_item(vieworiginalimage)

            await ctx.send_followup(embed=embed, view=view)

def setup(bot):
    bot.add_cog(other(bot))