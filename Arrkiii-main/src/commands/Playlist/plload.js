const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
  name: "plload",
  aliases: ["plload"],
  category: "Playlist",
  cooldown: 3,
  description: "Play the saved Playlist.",
  args: true,
  usage: "playlist name",
  userPrams: [],
  botPrams: ["EMBED_LINKS"],
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const Name = args[0];

    const data = await db.findOne({
      UserId: message.author.id,
      PlaylistName: Name,
    });

    const name = Name;

    if (!data) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("2f3136")
            .setDescription(
              `${client.emoji.cross} | Playlist not found. Please enter the correct playlist name\n\nDo ${prefix}list To see your Playlist`,
            ),
        ],
      });
    }
    const player = await client.manager.createPlayer({
      guildId: message.guild.id,
      voiceId: message.member.voice.channel.id,
      textId: message.channel.id,
      deaf: true,
    });
    if (!player) return;
    let count = 0;
    const m = await message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("2f3136")
          .setDescription(
            `${client.emoji.tick} | Adding **${data.PlaylistName}** track(s) from your playlist **${name}** to the queue.`,
          ),
      ],
    });

    for (const track of data.Playlist) {
      const s = await player.search(track.uri ? track.uri : track.title, {
        requester: message.author,
      });
      if (s.type === "TRACK") {
        if (player) player.queue.add(s.tracks[0]);
        if (player && !player.playing && !player.paused) await player.play();
        ++count;
      } else if (s.type === "SEARCH") {
        await player.queue.add(s.tracks[0]);
        if (player && !player.playing && !player.paused) await player.play();
        ++count;
      } else if (s.type === "PLAYLIST") {
        await player.queue.add(s.tracks[0]);
        if (player && !player.playing && !player.paused) await player.play();
        ++count;
      }
    }
    if (player && !player.queue.current) player.destroy(message.guild.id);
    if (count <= 0 && m)
      return await m.edit({
        embeds: [
          new EmbedBuilder()
            .setColor("2f3136")
            .setDescription(
              `${client.emoji.cross} | Couldn't add any tracks from your playlist **${name}** to the queue.`,
            ),
        ],
      });
    if (m)
      return await m.edit({
        embeds: [
          new EmbedBuilder()
            .setColor("2f3136")
            .setDescription(
              `${client.emoji.tick} | Added ${count} track(s) from your playlist **${name}** to the queue.`,
            ),
        ],
      });
  },
};
