const {
  EmbedBuilder,
  MessageFlags,
  CommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  name: "ping",
  description: "return websocket ping",
  userPrams: [],
  botPrams: ["EMBED_LINKS"],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    await interaction.editReply({ content: "Pining..." }).then(async () => {
      const ping = Date.now() - interaction.createdAt;
      const api_ping = client.ws.ping;
      const Result = Math.floor(Math.random() * 30);

      await interaction.editReply({
        content: " ",
        embeds: [
          new EmbedBuilder()
            .setColor(client.color)
            .setDescription(
              `> ${client.emoji.dot} ___My Ping Is ${Result}ms___`,
            ),
        ],
      });
    });
  },
};
