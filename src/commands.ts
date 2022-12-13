import { Command } from "./command";
import { Aanwezig } from "./commands/aanwezig";
import { Hello } from "./commands/hello";
import { Throw } from "./commands/throw";

export const Commands: Command[] = [Hello,Throw,Aanwezig];