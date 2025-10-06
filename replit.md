# Overview

Arrkiii is a feature-rich Discord bot built with Discord.js v14, designed to provide comprehensive server management, entertainment, and music streaming capabilities. The bot uses a hybrid sharding architecture for scalability and MongoDB for persistent data storage. It includes advanced music playback (Kazagumo + Shoukaku), anti-nuke protection, automation tools, moderation features, and aesthetic UI elements powered by Canvas libraries.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes

**Date**: October 6, 2025

**Setup and Dependency Installation**:
- Installed Node.js 20 runtime environment
- Installed all npm dependencies (407 packages including discord.js, kazagumo, canvafy, etc.)
- Installed system dependency `libuuid` required for canvas library functionality
- Configured Discord Bot workflow to run from Arrkiii-main directory
- Created .gitignore file to exclude node_modules and temporary files from version control

**Bot Status**:
- All modules loading successfully (155 prefix commands, 41 slash commands)
- All event handlers initialized (Anti-Nuke: 26, AutoMod: 6, Client: 10, Lavalink: 4, Player: 9)
- Database connection established successfully
- Bot requires valid Discord token to be updated in `src/config.js`

# System Architecture

## Core Bot Architecture

**Problem**: Need to handle multiple Discord servers efficiently with scalable architecture.

**Solution**: Hybrid sharding system using `discord-hybrid-sharding` package with cluster management.

**Implementation Details**:
- Entry point: `Shard.js` launches cluster manager
- Main bot client: `index.js` initializes the MusicBot client
- Custom client class (`MusicClient`) extends Discord.js Client with additional properties
- Shard configuration supports auto-sharding with configurable clusters
- Respawn and restart capabilities for fault tolerance

**Pros**: Scalable across multiple processes, automatic load distribution, fault recovery
**Cons**: Increased complexity in development and debugging

## Command System

**Problem**: Support both prefix-based and slash commands with organized structure.

**Solution**: Dual command system with separate loaders and collections.

**Implementation Details**:
- Prefix commands stored in `client.commands` Collection
- Slash commands stored in `client.slashCommands` Collection
- Category-based organization (Antinuke, Automod, Config, Fun, Image, etc.)
- Command loaders in `/src/loaders/` directory
- Custom prefix per guild stored in MongoDB
- Permission validation and cooldown management built-in

**Alternatives Considered**: Single command type only
**Pros**: Flexibility for users, backward compatibility, organized structure
**Cons**: Dual maintenance overhead

## Music System

**Problem**: Provide high-quality, low-latency music streaming with playlist support.

**Solution**: Kazagumo player manager built on top of Shoukaku (Lavalink client).

**Implementation Details**:
- Lavalink nodes configured in `config.js`
- Custom search engines (YouTube, Spotify, SoundCloud, Deezer, YouTube Music)
- Player state management with 24/7 mode support
- Autoplay functionality with similarity detection
- Playlist support with MongoDB persistence
- Audio filters and queue management
- Custom music card rendering (musicard, songcard libraries)

**Pros**: Professional audio quality, multiple source support, rich features
**Cons**: Requires external Lavalink server, complex setup

## Security & Moderation

**Problem**: Protect servers from malicious actions and manage content.

**Solution**: Multi-layered security with Anti-Nuke and AutoMod systems.

**Implementation Details**:
- **Anti-Nuke**: Detects mass bans, role deletions, channel manipulations
  - Configurable whitelist for users/roles
  - Extra owners system for delegation
  - Logging to designated channels
- **AutoMod**: Anti-spam, anti-link with customizable thresholds
  - Message rate limiting with configurable timeframes
  - Whitelist exceptions for trusted users/roles
- Permission-based access control throughout

**Pros**: Comprehensive protection, granular control
**Cons**: Requires careful configuration to avoid false positives

## Automation Features

**Problem**: Reduce manual server management tasks.

**Solution**: Event-driven automation modules.

**Implementation Details**:
- **Auto-responder**: Keyword-triggered custom responses
- **Auto-react**: Automatic emoji reactions to keywords
- **Auto-role**: Role assignment for humans/bots on join
- **Voice roles**: Role assignment based on voice channel activity
- **247 Mode**: Persistent player connections
- **Welcome system**: Customizable welcome messages with embeds and images

**Pros**: Reduces moderator workload, enhances user experience
**Cons**: Can create spam if misconfigured

## UI & Canvas System

**Problem**: Create visually appealing graphics for user engagement.

**Solution**: Multiple canvas libraries for different use cases.

**Implementation Details**:
- **Canvafy**: Profile cards, Instagram-style posts, ship images
- **Canvacard**: Rank cards with banner support
- **Canvas-based**: Welcome banners, achievement images
- Custom embed builder with chainable methods (`src/custom/embed.js`)
- Custom button builder with style shortcuts (`src/custom/button.js`)

**Pros**: Professional appearance, user engagement
**Cons**: Resource intensive, requires image processing

## Data Storage

**Problem**: Persist configuration, user data, and automation rules.

**Solution**: MongoDB with Mongoose ODM.

**Implementation Details**:
- Connection string in `config.js`
- Schema-based models in `/src/schema/` directory
- Key schemas:
  - Guild settings: prefix, setup, welcome, roles
  - User data: badges, profiles, playlists, blacklist
  - Security: antinuke, antilink, antispam configurations
  - Automation: auto-responder, auto-react, voice roles
  - Music: 247 mode, presets, playlists

**Pros**: Flexible schema, scalable, rich querying
**Cons**: Requires external database, potential latency

## Event System

**Problem**: Handle Discord events and custom logic efficiently.

**Solution**: Organized event loaders with category separation.

**Implementation Details**:
- Event loaders in `/src/loaders/`:
  - `loadClients.js`: Core Discord events
  - `loadAntinukes.js`: Security events
  - `loadAutoMods.js`: Moderation events
  - `loadPlayers.js`: Music player events
  - `loadNodes.js`: Lavalink node events
- Event files define `name` and `run` function
- Automatic event registration on bot startup

**Pros**: Organized, maintainable, easy to extend
**Cons**: Multiple event files to manage

## Utility Systems

**Problem**: Provide helper functions and common utilities.

**Solution**: Centralized utility modules.

**Implementation Details**:
- Logger with color-coded output (`src/utils/logger.js`)
- Time/number conversion utilities (`src/utils/convert.js`)
- Text to emoji converter for fun commands
- Progress bar generator for music player
- Welcome message builder with template support

**Pros**: Code reusability, consistent behavior
**Cons**: None significant

# External Dependencies

## Discord Integration
- **discord.js v14.19.3**: Core Discord API wrapper
- **discord-hybrid-sharding v2.2.5**: Cluster and shard management
- **@discordjs/builders**: Command and component builders
- **dokdo v1.0.1**: Developer console/REPL tool

## Music Services
- **kazagumo v3.2.2**: Music player manager
- **kazagumo-spotify v2.1.1**: Spotify source plugin
- **shoukaku v4.1.1**: Lavalink client
- **@flytri/lyrics-finder v1.0.7**: Song lyrics fetching
- **Lavalink Server**: External audio processing server (configured in config.js)

## Database
- **mongoose v8.11.0**: MongoDB ODM
- **MongoDB Atlas**: Cloud database (connection string in config.js)

## Image Processing
- **canvacard v6.0.4**: Rank cards and profile images
- **canvafy v7.2.0**: Instagram posts, ship images
- **musicard v2.0.5**: Music player cards
- **musicard-quartz v1.0.0**: Alternative music card theme
- **songcard v1.4.1**: Song information cards

## External APIs
- **@top-gg/sdk v3.1.6**: Top.gg bot list integration
- **topgg-autoposter v2.0.2**: Automatic stats posting
- **@iamtraction/google-translate v2.0.1**: Translation service
- **axios v1.8.1**: HTTP requests for external APIs
- **quickchart-js v3.1.3**: Chart generation

## Utilities
- **moment v2.30.1**: Date/time manipulation
- **moment-duration-format v2.3.2**: Duration formatting
- **moment-timezone v0.5.47**: Timezone support
- **archiver v7.0.1**: File compression
- **delay v6.0.0**: Async delay utility
- **undici v7.4.0**: HTTP client

## Third-party Service Integrations
- **Spotify API**: Music source (credentials in config.js)
- **Top.gg API**: Bot voting and statistics (token in config.js)
- **Discord Webhooks**: Logging system (URLs in config.js)
- **Various image APIs**: Meme, animal pictures (waifu.pics, reddit, etc.)