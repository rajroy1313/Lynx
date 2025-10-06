/** @format
 *
 * Arrkiii By Ozuma xd
 * © 2024 Arrkiii Development
 *
 */

const {
  EmbedBuilder,
  MessageFlags,
  CommandInteraction,
  Client,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
} = require("discord.js");

module.exports = {
  name: "help",
  description: "Help Menu!",
  userPrams: [],
  botPrams: ["EMBED_LINKS"],

  run: async (client, interaction, prefix) => {
    await interaction.deferReply({
      ephemeral: false,
    });

    const ozuma = await client.users.fetch("1029065620878282792");

    const neww = "<:ne:1225330110392045648><:w_:1225330091446505553>";

    const embed = new client.embed()
      .d(
        `Hey ${interaction.member}, I'm ${client.user}!
- **A complete Music Bot for your server**
- **Providing you the best quality music**`,
      )
      .addFields({
        name: `${client.emoji.search} **__My Commands:__**`,
        value: `
> ${client.emoji.autoresponder} \`:\` **Autoresponder**
> ${client.emoji.config} \`:\` **Config**
> ${client.emoji.fun} \`:\` **Fun**
> ${client.emoji.information} \`:\` **Information**
> ${client.emoji.moderation} \`:\` **Moderation**
> ${client.emoji.music} \`:\` **Music**
> ${client.emoji.pfp} \`:\` **Pfps**
> ${client.emoji.playlist} \`:\` **Playlists**
> ${client.emoji.profile} \`:\` **Profile**
> ${client.emoji.role} \`:\` **Role**
> ${client.emoji.voice} \`:\` **Voice**
        `,
      })
      .img(client.config.links.arrkiii)
      .thumb(interaction.member.displayAvatarURL())
      .setFooter({
        text: `Made with 💞 by ${ozuma.tag}`,
        iconURL: interaction.member.displayAvatarURL({ dynamic: true }),
      });

    const buttonRow = new ActionRowBuilder().addComponents(
      new client.button().s("home", "", client.emoji.home),
    );

    const commandCategories = [
      {
        label: "Autoresponder",
        value: "autoresponder",
        description: "Get all Autoresponder commands",
        emoji: client.emoji.autoresponder,
      },
      {
        label: "Config",
        value: "config",
        description: "Get all Config commands",
        emoji: client.emoji.config,
      },
      {
        label: "Fun",
        value: "fun",
        description: "Get all Fun commands",
        emoji: client.emoji.fun,
      },
      {
        label: "Information",
        value: "information",
        description: "Get all Information commands",
        emoji: client.emoji.information,
      },
      {
        label: "Moderation",
        value: "moderation",
        description: "Get all Moderation commands",
        emoji: client.emoji.moderation,
      },
      {
        label: "Music",
        value: "music",
        description: "Get all Music commands",
        emoji: client.emoji.music,
      },
      {
        label: "Pfp",
        value: "pfp",
        description: "Get all Pfps commands",
        emoji: client.emoji.pfp,
      },
      {
        label: "Playlist",
        value: "playlist",
        description: "Get all Playlist commands",
        emoji: client.emoji.playlist,
      },
      {
        label: "Profile",
        value: "profile",
        description: "Get all Profile commands",
        emoji: client.emoji.profile,
      },
      {
        label: "Role",
        value: "role",
        description: "Get all Role commands",
        emoji: client.emoji.role,
      },
      {
        label: "Voice",
        value: "voice",
        description: "Get all Voice commands",
        emoji: client.emoji.voice,
      },
    ];

    const dropdownRow = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("help_select")
        .setPlaceholder("Select a command category")
        .addOptions(commandCategories),
    );

    const msg = await interaction.editReply({
      embeds: [embed],
      components: [dropdownRow],
    });

    const collector = interaction.channel.createMessageComponentCollector({
      filter: (b) => {
        if (b.user.id === interaction.user.id) return true;
        else
          return b
            .reply({
              content: `${client.emoji.cross} | That's not your session run : \`${prefix}help\` to create your own.`,
              ephemeral: true,
            })
            .catch(() => {});
      },
      time: 60000 * 5,
      idle: 30e3,
    });

    collector.on("collect", async (i) => {
      if (i.isButton() && i.customId === "home") {
        return i.update({
          embeds: [embed],
          components: [dropdownRow],
        });
      } else if (i.isStringSelectMenu()) {
        const selectedCategory = i.values[0];
        const categoryCommands = client.commands
          .filter((cmd) => cmd.category?.toLowerCase() === selectedCategory)
          .map((cmd) => `\`${cmd.name}\``);

        const categoryEmbed = new client.embed()
          .d(
            `${
              categoryCommands.join(", ") ||
              "No commands found for this category."
            }`,
          )
          .t(
            `${client.emoji[selectedCategory]} ${
              selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)
            } Commands`,
          )
          .setFooter({
            text: `Total ${categoryCommands.length} commands.`,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .img(client.config.links.arrkiii);

        await i.update({
          embeds: [categoryEmbed],
          components: [dropdownRow, buttonRow],
        });
      }
    });

    collector.on("end", () => {
      msg.edit({ components: [] });
    });
  },
};
