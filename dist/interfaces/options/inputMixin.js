import { KEYS, TYPE_OPTION } from "../../tools/constant.js";
export default function inputMixin(Base) {
    return class extends Base {
        input(option, configArg) {
            const defaultConfig = { value: '', defaultSelection: false, clickable: false };
            const config = Array.isArray(configArg) ? { value: configArg } : configArg;
            const { value, defaultSelection, clickable } = Object.assign(defaultConfig, config);
            return this.item({
                label: option,
                type: TYPE_OPTION.INPUT,
                value,
                clickable
            }, defaultSelection);
        }
        actionInput(option, key) {
            if (key === KEYS.BACKSPACE) {
                return {
                    ...option,
                    value: option.value?.slice(0, -1)
                };
            }
            else if (key.length === 1) {
                return {
                    ...option,
                    value: option.value + key
                };
            }
            return option;
        }
        renderLabelInput(option) {
            return `${option.label}: [bgBlack][white] ${option.value} [white][/bgBlack] `;
        }
    };
}
