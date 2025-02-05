import { exit } from "process";
import { createMenu } from "../interfaces/menu.js";
const menu = createMenu({
    colorTitle: 'white',
    bgColorOption: '',
    colorOption: 'white',
    bgColorOptionHover: 'bgCyanBright',
    colorOptionHover: 'black',
});
const templates = [
    "[yellow]Vanilla[/yellow]",
    "[green]Vue[/green]",
    "[blue]React[/blue]",
    "[magentaBright]Preat[/magentaBright]",
    "[red]Lit[/red]",
    "[red]Svelte[/red]",
    "[blue]Solid[/blue]",
    "[blue]Qwik[/blue]",
    "[red]Angular[/red]",
    "Others",
];
const [option, value] = await menu
    .head("[bgBlue][white]Vite Project Launcher[/white][/bgBlue]\n")
    .input(" Project name", { defaultSelection: true })
    .bool(" Typescript:", { value: ["[green]Si[/green]", "[red]No[/red]"] })
    .bool(" Init Git:  ", { value: ["[green]Si[/green]", "[red]No[/red]"] })
    .select(" Select a framework:", { value: templates, clickable: false, compat: true })
    .item(" [blue]Ok[/blue]")
    .item(" [red]Cancel[/red]")
    .render();
exit(0);
