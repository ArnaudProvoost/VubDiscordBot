import { CommandInteraction, Client } from "discord.js";
import { Command } from "../command";

export const Test : Command = {
    name: "test",
    description : "Ik ben een test command",
    run:async (client:Client,interaction: CommandInteraction) => {
        const content = "Ik ben opgevraagd door:"+interaction.user.username;

        await interaction.followUp({
            ephemeral : true,
            content
        });
    } 
} 