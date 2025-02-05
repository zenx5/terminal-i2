import { KEYS } from "../tools/constant.js";
import { catchArrows, writeTerminal } from "../tools/terminal.js";
export class Dialog {
    title = "";
    description = "";
    actions = [];
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }
    addAction(key, label = '', onAction = () => { }) {
        if (typeof key === 'string') {
            this.actions.push({
                key,
                label,
                onAction
            });
        }
        else {
            this.actions.push(key);
        }
    }
    removeAction(key) {
        this.actions = this.actions.filter((action) => action.key !== key);
    }
    async render() {
        let isReturn = false;
        let isArrow = false;
        const maxLength = Math.max(this.title.length, this.description.length) + 8;
        const line = new Array(Math.floor(maxLength * 3 / 2)).fill('#').join('');
        let markedOptionOffset = 1;
        do {
            writeTerminal(line + '\n' +
                this.cover("", line) + '\n' +
                this.cover(this.title, line) + '\n' +
                this.cover(this.description, line) + '\n' +
                this.renderActions(line, markedOptionOffset - 1) +
                this.cover("", line) + '\n' +
                line + '\n');
            const response = await catchArrows();
            isArrow = response.isArrow;
            isReturn = response.name === KEYS.RETURN;
            if (response.name === KEYS.LEFT) {
                markedOptionOffset = markedOptionOffset === 1 ? 5 : markedOptionOffset - 1;
            }
            else if (response.name === KEYS.RIGHT) {
                markedOptionOffset = markedOptionOffset === 5 ? 1 : markedOptionOffset + 1;
            }
        } while (isArrow || !isReturn);
        const { key, onAction } = this.actions[markedOptionOffset - 1];
        return { key, onAction };
    }
    renderActions(line, selected) {
        let stringActions = '';
        if (this.actions.length === 0)
            return '';
        this.actions.forEach((action, index) => {
            const indexTrue = index + 1;
            const separator = indexTrue % 3 ? '|' : '\n';
            const last = indexTrue === this.actions.length;
            const label = index === selected ? `[bgGreen] ${this.actions[index].label} [/bgGreen]` : ` ${this.actions[index].label} `;
            stringActions += label + (!last ? separator : '');
        });
        const finalActions = stringActions.split('\n')
            .map(lineAction => {
            const isSelectedInclude = lineAction.includes('bgGreen');
            return this.cover(`|${lineAction}|`, line, isSelectedInclude ? 20 : 0);
        })
            .join('\n');
        return this.cover('', line) + '\n' + finalActions + '\n';
    }
    cover(text, line, offset = 0) {
        const empty = text === '';
        let blankLength = line.length + offset - 4;
        const wrapperLength = Math.floor(blankLength - text.length) / 2;
        const rounded = wrapperLength % 2;
        const fixWrapperLength = rounded ? Math.floor(wrapperLength) : wrapperLength;
        const lineBlank = new Array(blankLength).fill(' ').join('');
        return line.slice(0, 2)
            + lineBlank.slice(0, fixWrapperLength)
            + (empty ? ' ' : text)
            + lineBlank.slice(-fixWrapperLength)
            + line.slice(-2);
    }
}
export function createDialog({ title, description }) {
    return new Dialog(title, description);
}
