import { KEYS, TYPE_OPTION } from "../tools/constant.js";
import { cleanTerminal, catchArrows, writeTerminal } from "../tools/terminal.js";
import Options from "./options/MixOption.js";
const defaultOptionsMenu = {
    title: "",
    options: [],
    markedOption: 1,
    colorTitle: "green",
    colorOption: "white",
    bgColorOption: "",
    colorOptionHover: "red",
    bgColorOptionHover: "bgYellow"
};
class Menu extends Options {
    x = 0;
    y = 0;
    isTemp = false;
    title;
    colorTitle;
    colorOption;
    bgColorOption;
    colorOptionHover;
    bgColorOptionHover;
    constructor(optionsMenu) {
        super();
        const { title, options, markedOption, colorTitle, colorOption, bgColorOption, colorOptionHover, bgColorOptionHover, } = Object.assign(defaultOptionsMenu, optionsMenu);
        this.title = title;
        this.options = options;
        this.markedOption = markedOption;
        this.colorTitle = colorTitle;
        this.colorOption = colorOption;
        this.bgColorOption = bgColorOption;
        this.colorOptionHover = colorOptionHover;
        this.bgColorOptionHover = bgColorOptionHover;
    }
    position(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    changeTitle(title) {
        this.title = title;
    }
    head(title) {
        this.isTemp = true;
        this.title = title;
        return this;
    }
    async render(waitEnter = true) {
        let isReturn = false;
        let isArrow = false;
        let markedOptionOffset = this.markedOption + 1;
        if (this.options.length === 0)
            return [-1, null, '']; // Not options found
        do {
            const { clickable } = this.options[markedOptionOffset - 1];
            cleanTerminal();
            await this.renderMenu(markedOptionOffset);
            const response = await catchArrows();
            cleanTerminal();
            isArrow = response.isArrow;
            isReturn = clickable ? response.name === KEYS.RETURN : false;
            if (response.name === KEYS.UP) {
                markedOptionOffset = markedOptionOffset === 1 ? this.options.length : markedOptionOffset - 1;
            }
            else if (response.name === KEYS.DOWN) {
                markedOptionOffset = markedOptionOffset === this.options.length ? 1 : markedOptionOffset + 1;
            }
            else {
                this.options[markedOptionOffset - 1] = this.actionOption(this.options[markedOptionOffset - 1], response.name);
            }
        } while (isArrow || waitEnter && !isReturn);
        const value = this.options[markedOptionOffset - 1].type === TYPE_OPTION.BOOL ? this.options[markedOptionOffset - 1].value[0] : this.options[markedOptionOffset - 1].value;
        const optionClicked = this.options[markedOptionOffset - 1];
        if (this.isTemp)
            this.clean();
        return [markedOptionOffset - 1, optionClicked, value];
    }
    async renderInput(waitEnter = true) {
        return await this.render(waitEnter);
    }
    clean() {
        this.isTemp = false;
        this.title = "";
        this.options = [];
    }
    colored(bgColor, color, opt) {
        if (bgColor === '')
            return `[${color}]${opt}[/${color}]`;
        return `[${bgColor}][${color}]${opt}[/${color}][/${bgColor}]`;
    }
    async renderMenu(option) {
        const bgColorOptionHover = this.bgColorOptionHover;
        const colorOptionHover = this.colorOptionHover;
        const bgColorOption = this.bgColorOption;
        const colorOption = this.colorOption;
        const colorTitle = this.colorTitle;
        const optionsText = this.options
            .map((opt, index) => {
            const text = this.renderLabel(opt);
            return (index !== option - 1) ? text : this.colored(bgColorOptionHover, colorOptionHover, text);
        })
            .join('\n');
        await writeTerminal(`[${colorTitle}]${this.title}[/${colorTitle}]\n${this.colored(bgColorOption, colorOption, optionsText)}\n`, this.x, this.y);
        return this;
    }
    async json2menu(json) {
        if (json.title)
            this.title = json.title;
        if (json.colorTitle)
            this.colorTitle = json.colorTitle;
        if (json.colorOption)
            this.colorOption = json.colorOption;
        if (json.bgColorOption)
            this.bgColorOption = json.bgColorOption;
        if (json.colorOptionHover)
            this.colorOptionHover = json.colorOptionHover;
        if (json.bgColorOptionHover)
            this.bgColorOptionHover = json.bgColorOptionHover;
        if (json.options)
            this.options = json.options;
        if (json.markedOption)
            this.markedOption = json.markedOption;
        return this;
    }
    async file2json(file) {
        return new Promise((resolve, reject) => {
            try {
                const fs = require('fs');
                fs.readFile(file, 'utf8', (err, data) => {
                    if (err)
                        reject(err);
                    resolve(JSON.parse(data));
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
export function createMenu(config) {
    return new Menu(config);
}
