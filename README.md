# Discord Bot
My discord bot written in discord.js for custom private servers.

Features:
- Music player (Supports YouTube, SoundCloud, Bandcamp)
- Discord embed fixer for multiple social medias (Twitter, Reddit, Tiktok, Instagram)
- Built in google safe browsing to delete any url posted that is filtered as dangerous
- YouTube response embed that returns info of a yt url when posted (Views, Likes, Dislikes, Buttons to other platforms for songs -> Apple Music, Audiomack, Deezer, Napster, Pandora, SoundCloud, Spotify, Tidal, YouTube, YouTube Music)
- Response embed for song links to the song on other platforms (Apple Music, Audiomack, Deezer, Napster, Pandora, SoundCloud, Spotify, Tidal, YouTube, YouTube Music)
- Rainbow 6 Siege game commands -> Get player info or server status of Rainbow 6 Siege
- Pokemon command -> Get info about any pokemon including stats, sprites and other info
- Command to get the pronouns of the user from pronoundb
- Member join and leave embed message

-----

Linux Setup (Debian / Ubuntu)

Install [Node.js v21](https://github.com/nodesource/distributions#debian-and-ubuntu-based-distributions)

If you are using python 3.11+ you may have external management popup with pip on user install packages

Fix: [GitHub Comment](https://github.com/pypa/pip/issues/11776#issuecomment-1434892689)

```
sudo apt install make g++ ffmpeg nodejs libtool-bin python3 python3-pip
```

```
python3 -m pip install -U pip yt-dlp
```

```
npm install pm2@latest -g
```

```
npm install discord.js@latest @discordjs/voice@latest sodium-native@latest @discordjs/opus@latest underscore@latest dayjs@latest r6api.js@latest shell-escape@latest
```