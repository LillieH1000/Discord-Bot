# Discord Bot
My discord bot written in discord.js

Invite my bot: [Invite](https://discord.com/api/oauth2/authorize?client_id=1065377660303310859&permissions=8&scope=bot%20applications.commands)

Features:
- Music player (Supports YouTube, SoundCloud, Bandcamp)
- Discord embed fixer for multiple social medias (Twitter, Tiktok, Instagram)
- Built in google safe browsing to delete any url posted that is filtered as dangerous
- YouTube response embed that returns info of a yt url when posted (Views, Likes, Dislikes, Buttons to other platforms for songs -> Apple Music, Audiomack, Deezer, Napster, Pandora, SoundCloud, Spotify, Tidal, YouTube, YouTube Music)
- Response embed for song links to the song on other platforms (Apple Music, Audiomack, Deezer, Napster, Pandora, SoundCloud, Spotify, Tidal, YouTube, YouTube Music)
- Admin commands (kick, ban, mute, unmute)
- Rainbow 6 Siege game commands -> Get player info or server status of Rainbow 6 Siege
- Pokemon command -> Get info about any pokemon including stats, sprites and other info
- Command to get the pronouns of the user from pronoundb
- Member join and leave embed message
- Anime picture commands
- Animal picture commands
- Coffee pictures command

Mores features and commands coming soon.

Invidual servers may request features such as member count, date, etc since those are currently hardcoded.

-----

Linux Setup

```
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
```

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
npm install discord.js@latest @discordjs/rest@latest discord-api-types@latest @discordjs/voice@latest @discordjs/opus@latest opusscript@latest ffmpeg-static@latest sodium@latest sodium-native@latest libsodium-wrappers@latest tweetnacl@latest underscore@latest dayjs@latest r6api.js@latest shell-escape@latest
```