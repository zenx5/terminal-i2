import { exit } from "process";
import { readTerminal, writeTerminal } from "../tools/terminal";
import { createDialog, createMenu } from "../index";

const dialog = createDialog({ title:"Saludo", description:`Hola mundo! en especial a Octavio` })
dialog.render()
exit(0)