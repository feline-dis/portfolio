---
title: "Go Radio"
description: "A modern web radio streaming app with real-time playback and YouTube integration"
technologies: ["Go", "React", "TypeScript", "WebSocket", "PostgreSQL", "AWS S3", "Docker"]
featured: true
liveUrl: "https://go-radio-v2.fly.dev"
githubUrl: "https://github.com/feline-dis/go-radio"
images: ["/images/projects/go-radio-v2-1.png"]
publishDate: 2025-05-20
---

# Go Radio

My personal web radio streaming application that I built after being inspired by the folks at [radio.uwu.network](https://radio.uwu.network). It's basically a Spotify jam session but smaller (and cooler).

## What It Does

- **YouTube DLP Integration**: Drop in YouTube URLs and the app handles the rest (downloading, converting, storing)
- **Live Sync**: Everyone listening gets the same track at the same time - sing along with your friends
- **Cloud Storage**: Uses AWS S3 because I didn't want to deal with local file management
- **Persistent Playlists**: PostgreSQL keeps track of everything so your music doesn't disappear

## The Tech Stack

I went with Go for the backend because it's fast and doesn't make me want to throw my computer out the window. The frontend is React with TypeScript because I like my code to yell at me when I mess up.

### Backend
- **Go 1.21+**: Main language - fast, simple, gets stuff done
- **Gorilla WebSocket**: For real-time communication without the headaches
- **PostgreSQL**: Because I needed actual data relationships
- **AWS SDK**: S3 integration for audio storage
- **JWT**: Authentication that doesn't suck

### Frontend
- **React 18**: For the UI that people actually interact with
- **TypeScript**: Catches my mistakes before they become production bugs
- **Vite**: Build tool that's actually fast
- **Tailwind CSS**: Makes things look decent without writing tons of CSS

### Infrastructure
- **Docker**: Containerized everything because deployment consistency matters
- **Fly.io**: Cloud hosting that just works
- **GitHub Actions**: CI/CD that deploys when I push to main

## Cool Stuff I Figured Out

1. **YouTube Audio Extraction**: Built a system that downloads YouTube videos, extracts audio, and stores it in S3. It's surprisingly complicated to do this reliably. Downloading is currently done locally through a separate binary to bypass Googles IP blocks. Could use a residential proxy but that was too much effort/ cost for a side project.

2. **Real-time Sync**: WebSocket implementation that keeps all connected clients in sync. If someone skips a track, everyone skips.

3. **Database Migrations**: Proper PostgreSQL migrations done with Atlas.

4. **Modular Architecture**: Backend and frontend are completely separate, which makes development way easier.

This project taught me a lot about real-time systems, audio processing, and browser audio APIs. It's the kind of project that started simple and ended up being way more complex than I expected, but that's half the fun.

## Known Issues / Future Plans

One major feature on the horizon is **self-hosting**. I want Go Radio to work as a standalone program people can run on their own machines — spin up a local server, share the link, and let friends tunnel in to join their personal radio station. There's already a working branch in progress for this under [feat/self-host](https://github.com/feline-dis/go-radio-v2/tree/feat/self-host).

Right now, this setup isn't fully real-time. Each client fetches the audio via an HTTP GET request, which means playback timing can drift slightly depending on individual network conditions. The server does its best to keep everyone aligned by orchestrating playback via WebSocket messages, but some desync is still possible — especially on weaker connections or if someone’s on hotel Wi-Fi.

In the future, I’m interested in exploring **true real-time audio** streaming solutions like:

- **WebRTC**: Built for peer-to-peer media, could help reduce latency
- **HLS (HTTP Live Streaming)**: Already battle-tested by big players like Twitch and YouTube
- **Raw WebSocket Streaming**: Sending audio chunks directly over the socket, though this comes with buffering and codec headaches

I don’t need this to be perfect — it’s a social radio app, not NASA comms — but improving sync and latency is definitely on the roadmap. Stay tuned.
