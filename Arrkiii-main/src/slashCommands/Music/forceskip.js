const {
  EmbedBuilder,
  MessageFlags,
  CommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  name: "forceskip",
  description: "To force skip the current playing song.",
  userPrams: [],
  botPrams: ["EMBED_LINKS"],
  dj: true,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    const player = client.manager.players.get(interaction.guild.id);

    if (!player.queue.current) {
      const thing = new EmbedBuilder()
        .setColor(client.color)
        .setDescription("There Is Nothing In The Queue");
      return interaction.editReply({ embeds: [thing] });
    }
    const song = player.queue.current;

    await player.shoukaku.stopTrack();

    const emojiskip = client.emoji.skip;

    const thing = new EmbedBuilder()
      .setDescription(`${emojiskip} Skipped [${song.title}](${song.uri})`)
      .setColor(client.color);
    return interaction.editReply({ embeds: [thing] });
  },
};
