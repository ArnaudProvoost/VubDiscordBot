import axios, { AxiosError } from "axios";
import { ApplicationCommandOptionData, ApplicationCommandOptionType, Client, CommandInteraction} from "discord.js";
import { Command } from "src/command";

const option1: ApplicationCommandOptionData = {
    type: ApplicationCommandOptionType.String,
    name: "user",
    description: "Welke dag wil je het vub menu krijgen",
    required: false
};
const dataoptions: ApplicationCommandOptionData[] = [option1]

export const Menu: Command = {
    name: "menu",
    description: "Wat eten we vandaag?",
    options: dataoptions,
    run: async (client: Client, interaction: CommandInteraction) => {
        var content = getMenu()
        await interaction.followUp({
            ephemeral:true,
            content
        })
    }
}

function getMenu():string {
    var data = fetchPage("https://wearestudent.vub.be/c/8476")
    console.log(data)
    return "todo"
}

function fetchPage(url: string): Promise<string | undefined> {
    const HTMLData = axios
      .get(url)
      .then(res => res.data)
      .catch((error: AxiosError) => {
        console.error(error.toJSON());
      });
  
    return HTMLData;
  }