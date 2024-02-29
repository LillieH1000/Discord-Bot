# Discord Bot
My discord bot written in discord.js for custom private servers.

-----

Linux Setup

-----

Debian / Ubuntu

Install [Node.js v21](https://github.com/nodesource/distributions#debian-and-ubuntu-based-distributions)

```
sudo apt install make g++ ffmpeg
```

Continue to npm section

-----

Arch

Install [Node Version Manager](https://github.com/nvm-sh/nvm#installing-and-updating)

```
nvm list-remote
```

Install [Node.js v21](https://wiki.archlinux.org/title/Node.js)

```
sudo pacman -S make base-devel ffmpeg gcc glibc linux-api-headers
```

Continue to npm section

-----

npm

```
npm install pm2@latest -g
```
(^ Run as sudo if needed)

```
npm install
```