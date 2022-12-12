import { Client, CommandInteraction, userMention, ApplicationCommandOptionData, ApplicationCommandOptionType, Collection, GuildMember } from "discord.js";
import { Command } from "src/command";

const option1: ApplicationCommandOptionData = {
    type: ApplicationCommandOptionType.User,
    name: "user",
    description: "Gebruiker naar wie je de sneeuwbal wilt gooien",
    required: false
};
const dataoptions: ApplicationCommandOptionData[] = [option1];

export const Throw: Command = {
    name: "throw",
    description: "Gooi een sneeuwbal om deze persoon wakker te houden.",
    options: dataoptions,
    run :async (client:Client, interaction: CommandInteraction) => {
        var member : any = undefined;
        if (interaction.options.getUser("user") == undefined) {
            const members = interaction.guild?.members.cache
            const members_count = interaction.guild?.members.cache.size !== undefined ? interaction.guild?.members.cache.size : 0;
            const random = Math.floor(Math.random() * members_count);
            member = members?.at(random) 
        }
        else {
            member = interaction.guild?.members.cache.at(parseInt(interaction.options.getUser("user")!.id))
            member = interaction.options.getUser("user");
        }
        
        const content = userMention(interaction.user.id) + ` gooide een sneeuwbal naar <@${member?.id}>`;

        await interaction.followUp({
            ephemeral:true,
            content
        });
    }
}