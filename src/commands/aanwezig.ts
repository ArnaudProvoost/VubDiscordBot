import { Channel, Client, CommandInteraction, MessageReaction, ReactionManager, TextChannel, User } from "discord.js";
import { Command } from "src/command";
import { addAanwezigheidUsername, getLastAanwezigheidUsername, getUsername } from "../data/userdb_operations";


export const Aanwezig: Command = {
    name: "aanwezig",
    description: "Geef aan of je aanwezig bent.",
    run: async (client: Client, interaction: CommandInteraction) => {
        var content = `<@${interaction.user.id}> is aanwezig.`
        var date = new Date()
        var day = date.getDate()
        var user = getUsername(interaction.user.username)
        if (typeof user != 'string') {
            if (getLastAanwezigheidUsername(user.name) == day) {
                content = `Goed geprobeerd <@${interaction.user.id}>. Je bent al aanwezig. @here pas op <@${interaction.user.id}> probeert te cheaten.`
            }
            else {
                addAanwezigheidUsername(interaction.user.username, day)
            }
        }
        else {
            addAanwezigheidUsername(interaction.user.username, day)
        }

        await interaction.followUp({
            ephemeral: true,
            content
        })
    }
}