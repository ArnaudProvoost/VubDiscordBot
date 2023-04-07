import { Command } from "./command";
import { Aanwezig } from "./commands/aanwezig";
import { Menu } from "./commands/menu";
import { Throw } from "./commands/throw";

export const Commands: Command[] = [Throw,Aanwezig,Menu];