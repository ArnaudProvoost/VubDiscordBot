import { Client, CommandInteraction } from "discord.js";
import { run } from "node:test";
import { Command } from "src/command";
import { Database } from "../data/db";

interface User {
    name:string;
    totaal:number;
    dag:number;
}

interface DB {
    users: User[]
}

const initial: DB = {
    users: []
}

const db = new Database<DB>('./src/data/data.json', initial)

export const Aanwezig: Command = {
    name: "aanwezig",
    description: "Geef aan of je aanwezig bent.",
    run :async (client:Client, interaction: CommandInteraction) => {
        var content = `<@${interaction.user.id}> is aanwezig.`
        var date = new Date()
        var day = date.getDate()

        if (db.data.users[0] != undefined) {
            var persoonfound = false;
            var persoon
            for (var i in db.data.users) {
                if (db.data.users[i].name == interaction.user.username) {
                    if (db.data.users[i].dag != day) {    
                        db.data.users[i].totaal += 1 
                        db.data.users[i].dag = day
                        persoonfound = true;
                    }
                    else {
                        persoonfound = true;
                        content = `Goed geprobeerd <@${interaction.user.id}>. Je bent al aanwezig. @here Pas op <@${interaction.user.id}> probeert te cheaten.`
                    }
                }
                
            }

            if (!persoonfound) {
                persoon = {
                    name:interaction.user.username,
                    totaal:1,
                    dag: day
                }
                db.data.users.push(persoon)
            }

            db.update({
                users:db.data.users
            })
        }
        else {
            db.update({
                users: [{
                    name:interaction.user.username,
                    totaal:1,
                    dag:day
                }]
            });
        }

        db.commit()

        console.log(db.data)

        await interaction.followUp({
            ephemeral:true,
            content
        })
    }
}