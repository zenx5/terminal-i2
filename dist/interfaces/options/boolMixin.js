import { KEYS, TYPE_OPTION } from "../../tools/constant.js";
export default function boolMixin(Base) {
    return class extends Base {
        bool(option, configArg) {
            const defaultConfig = { value: [false, true], defaultSelection: false, clickable: false };
            const config = Array.isArray(configArg) ? { value: configArg } : configArg;
            const { value, defaultSelection, clickable } = Object.assign(defaultConfig, config);
            return this.item({
                label: option,
                type: TYPE_OPTION.BOOL,
                value: value.slice(0, 2),
                clickable
            }, defaultSelection);
        }
        renderLabelBool(option) {
            const [currentValue] = option.value;
            return `${option.label} [bgBlack] [white]<[/white] ${currentValue} [white]>[/white] [/bgBlack]`;
        }
        actionBool(option, key) {
            if (key !== KEYS.LEFT && key !== KEYS.RIGHT)
                return option;
            return {
                ...option,
                value: option.value.sort(() => -1)
            };
        }
    };
}
