import discord, datetime, json, random, aiohttp, asyncio
from discord.commands import Option, slash_command
from discord.ext import commands
from discord.ui import Button, View

class other(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @slash_command(description="Posts a random cat picture")
    async def cat(self, ctx, source: Option(str, "Choose cat pics source", choices=["Nekos.Life", "AlexFlipnote.Dev"])):
        await ctx.defer()
        async with aiohttp.ClientSession() as session:
            if source == "Nekos.Life":
                async with session.get(f'https://nekos.life/api/v2/img/meow') as resp:
                    response = await resp.json()
                    embed = discord.Embed(title="Cat Pics", color=0xFFC0DD)
                    embed.set_image(url=str(response["url"]))
                    embed.timestamp = datetime.datetime.now()

                    vieworiginalimage = Button(label="View Original Image", url=f"{response['url']}", style=discord.ButtonStyle.grey)

                    view = View(timeout=None)
                    if (response["url"] is not None):
                        view.add_item(vieworiginalimage)

                    await ctx.send_followup(embed=embed, view=view)
            if source == "AlexFlipnote.Dev":
                async with session.get(f'https://api.alexflipnote.dev/cats') as resp:
                    response = await resp.json()
                    embed = discord.Embed(title="Cat Pics", color=0xFFC0DD)
                    embed.set_image(url=str(response["file"]))
                    embed.timestamp = datetime.datetime.now()

                    vieworiginalimage = Button(label="View Original Image", url=f"{response['file']}", style=discord.ButtonStyle.grey)

                    view = View(timeout=None)
                    if (response["file"] is not None):
                        view.add_item(vieworiginalimage)

                    await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Posts a random dog picture")
    async def dog(self, ctx, source: Option(str, "Choose dog pics source", choices=["Dog.Ceo", "Nekos.Life", "AlexFlipnote.Dev"])):
        await ctx.defer()
        async with aiohttp.ClientSession() as session:
            if source == "Dog.Ceo":
                async with session.get(f'https://dog.ceo/api/breeds/image/random') as resp:
                    response = await resp.json()
                    embed = discord.Embed(title="Dog Pics", color=0xFFC0DD)
                    embed.set_image(url=str(response["message"]))
                    embed.timestamp = datetime.datetime.now()
                    
                    vieworiginalimage = Button(label="View Original Image", url=f"{response['message']}", style=discord.ButtonStyle.grey)

                    view = View(timeout=None)
                    if (response["message"] is not None):
                        view.add_item(vieworiginalimage)

                    await ctx.send_followup(embed=embed, view=view)
            if source == "Nekos.Life":
                async with session.get(f'https://nekos.life/api/v2/img/woof') as resp:
                    response = await resp.json()
                    embed = discord.Embed(title="Dog Pics", color=0xFFC0DD)
                    embed.set_image(url=str(response["url"]))
                    embed.timestamp = datetime.datetime.now()

                    vieworiginalimage = Button(label="View Original Image", url=f"{response['url']}", style=discord.ButtonStyle.grey)

                    view = View(timeout=None)
                    if (response["url"] is not None):
                        view.add_item(vieworiginalimage)

                    await ctx.send_followup(embed=embed, view=view)
            if source == "AlexFlipnote.Dev":
                async with session.get(f'https://api.alexflipnote.dev/dogs') as resp:
                    response = await resp.json()
                    embed = discord.Embed(title="Dog Pics", color=0xFFC0DD)
                    embed.set_image(url=str(response["file"]))
                    embed.timestamp = datetime.datetime.now()

                    vieworiginalimage = Button(label="View Original Image", url=f"{response['file']}", style=discord.ButtonStyle.grey)

                    view = View(timeout=None)
                    if (response["file"] is not None):
                        view.add_item(vieworiginalimage)

                    await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Posts a random birb picture")
    async def birb(self, ctx):
        await ctx.defer()
        async with aiohttp.ClientSession() as session:
            async with session.get(f'https://api.alexflipnote.dev/birb') as resp:
                response = await resp.json()
                embed = discord.Embed(title="Birb Pics", color=0xFFC0DD)
                embed.set_image(url=str(response["file"]))
                embed.timestamp = datetime.datetime.now()
                
                vieworiginalimage = Button(label="View Original Image", url=f"{response['file']}", style=discord.ButtonStyle.grey)

                view = View(timeout=None)
                if (response["file"] is not None):
                    view.add_item(vieworiginalimage)

                await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Posts a random neko picture")
    async def neko(self, ctx, source: Option(str, "Choose neko pics source", choices=["Nekos.Life", "Waifu.Pics"])):
        await ctx.defer()
        async with aiohttp.ClientSession() as session:
            if source == "Nekos.Life":
                async with session.get(f'https://nekos.life/api/v2/img/neko') as resp:
                    response = await resp.json()
                    embed = discord.Embed(title="Neko Pics", color=0xFFC0DD)
                    embed.set_image(url=str(response["url"]))
                    embed.timestamp = datetime.datetime.now()
                    
                    vieworiginalimage = Button(label="View Original Image", url=f"{response['url']}", style=discord.ButtonStyle.grey)

                    view = View(timeout=None)
                    if (response["url"] is not None):
                        view.add_item(vieworiginalimage)

                    await ctx.send_followup(embed=embed, view=view)
            if source == "Waifu.Pics":
                async with session.get(f'https://api.waifu.pics/sfw/neko') as resp:
                    response = await resp.json()
                    embed = discord.Embed(title="Neko Pics", color=0xFFC0DD)
                    embed.set_image(url=str(response["url"]))
                    embed.timestamp = datetime.datetime.now()
                    
                    vieworiginalimage = Button(label="View Original Image", url=f"{response['url']}", style=discord.ButtonStyle.grey)

                    view = View(timeout=None)
                    if (response["url"] is not None):
                        view.add_item(vieworiginalimage)

                    await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Posts a random coffee picture")
    async def coffee(self, ctx):
        await ctx.defer()
        async with aiohttp.ClientSession() as session:
            async with session.get(f'https://coffee.alexflipnote.dev/random.json') as resp:
                response = await resp.json()
                embed = discord.Embed(title="Coffee Pics", color=0xFFC0DD)
                embed.set_image(url=str(response["file"]))
                embed.timestamp = datetime.datetime.now()
                
                vieworiginalimage = Button(label="View Original Image", url=f"{response['file']}", style=discord.ButtonStyle.grey)

                view = View(timeout=None)
                if (response["file"] is not None):
                    view.add_item(vieworiginalimage)

                await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Posts a random goose picture")
    async def goose(self, ctx):
        await ctx.defer()
        async with aiohttp.ClientSession() as session:
            async with session.get(f'https://nekos.life/api/v2/img/goose') as resp:
                response = await resp.json()
                embed = discord.Embed(title="Goose Pics", color=0xFFC0DD)
                embed.set_image(url=str(response["url"]))
                embed.timestamp = datetime.datetime.now()
                
                vieworiginalimage = Button(label="View Original Image", url=f"{response['url']}", style=discord.ButtonStyle.grey)

                view = View(timeout=None)
                if (response["url"] is not None):
                    view.add_item(vieworiginalimage)

                await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Posts a random chuck norris joke")
    async def chucknorris(self, ctx):
        await ctx.defer()
        async with aiohttp.ClientSession() as session:
            async with session.get(f'https://api.chucknorris.io/jokes/random') as resp:
                response = await resp.json()
                embed = discord.Embed(color=0xFFC0DD)
                embed.set_thumbnail(url=response["icon_url"])
                embed.add_field(name="Chuck Norris", value=response["value"], inline=False)
                embed.timestamp = datetime.datetime.now()
                await ctx.send_followup(embed=embed)

    @slash_command(description="Posts a random waifu pic")
    async def waifu(self, ctx):
        await ctx.defer()
        async with aiohttp.ClientSession() as session:
            async with session.get(f'https://api.waifu.pics/sfw/waifu') as resp:
                response = await resp.json()
                embed = discord.Embed(title="Waifu Pics", color=0xFFC0DD)
                embed.set_image(url=str(response["url"]))
                embed.timestamp = datetime.datetime.now()
                
                vieworiginalimage = Button(label="View Original Image", url=f"{response['url']}", style=discord.ButtonStyle.grey)

                view = View(timeout=None)
                if (response["url"] is not None):
                    view.add_item(vieworiginalimage)

                await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Posts a random duck pic")
    async def duck(self, ctx):
        await ctx.defer()
        async with aiohttp.ClientSession() as session:
            async with session.get(f'https://random-d.uk/api/v2/random') as resp:
                response = await resp.json()
                embed = discord.Embed(title="Duck Pics", color=0xFFC0DD)
                embed.set_image(url=str(response["url"]))
                embed.timestamp = datetime.datetime.now()
                
                vieworiginalimage = Button(label="View Original Image", url=f"{response['url']}", style=discord.ButtonStyle.grey)

                view = View(timeout=None)
                if (response["url"] is not None):
                    view.add_item(vieworiginalimage)

                await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Posts a random fox pic")
    async def fox(self, ctx):
        await ctx.defer()
        async with aiohttp.ClientSession() as session:
            async with session.get(f'https://randomfox.ca/floof/') as resp:
                response = await resp.json()
                embed = discord.Embed(title="Fox Pics", color=0xFFC0DD)
                embed.set_image(url=str(response["image"]))
                embed.timestamp = datetime.datetime.now()
                
                vieworiginalimage = Button(label="View Original Image", url=f"{response['image']}", style=discord.ButtonStyle.grey)

                view = View(timeout=None)
                if (response["image"] is not None):
                    view.add_item(vieworiginalimage)

                await ctx.send_followup(embed=embed, view=view)

    @slash_command(description="Posts a random megumin pic")
    async def megumin(self, ctx):
        await ctx.defer()
        async with aiohttp.ClientSession() as session:
            async with session.get(f'https://api.waifu.pics/sfw/megumin') as resp:
                response = await resp.json()
                embed = discord.Embed(title="Megumin Pics", color=0xFFC0DD)
                embed.set_image(url=str(response["url"]))
                embed.timestamp = datetime.datetime.now()
                
                vieworiginalimage = Button(label="View Original Image", url=f"{response['url']}", style=discord.ButtonStyle.grey)

                view = View(timeout=None)
                if (response["url"] is not None):
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
        async with aiohttp.ClientSession() as session:
            async with session.get(f'https://api.waifu.pics/sfw/pat') as resp:
                response = await resp.json()
                embed = discord.Embed(color=0xFFC0DD)
                embed.set_image(url=str(response["url"]))
                embed.timestamp = datetime.datetime.now()

                vieworiginalimage = Button(label="View Original Image", url=f"{response['url']}", style=discord.ButtonStyle.grey)

                view = View(timeout=None)
                if (response["url"] is not None):
                    view.add_item(vieworiginalimage)

                await ctx.send(content=f"{user.mention}", embed=embed, view=view)
                await ctx.send_followup(f"Successfully patted the user", ephemeral=True)

def setup(bot):
    bot.add_cog(other(bot))