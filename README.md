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

```
sudo apt install ffmpeg nodejs
```

```
npm install pm2@latest -g
```

```
npm install discord.js@latest @discordjs/voice@latest sodium-native@latest @discordjs/opus@latest underscore@latest dayjs@latest r6api.js@latest
```