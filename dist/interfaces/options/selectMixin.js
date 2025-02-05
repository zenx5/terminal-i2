import { KEYS, TYPE_OPTION } from "../../tools/constant.js";
export default function selectMixin(Base) {
    return class extends Base {
        select(option, configArg) {
            const defaultConfig = { value: [], defaultSelection: false, clickable: false, compat: false };
            const config = Array.isArray(configArg) ? { value: configArg } : configArg;
            const { value, defaultSelection, clickable, compat } = Object.assign(defaultConfig, config);
            return this.item({
                label: option,
                type: TYPE_OPTION.SELECT,
                value: [0, ...value],
                clickable,
                compat
            }, defaultSelection);
        }
        actionSelect(option, key) {
            if (key !== KEYS.LEFT && key !== KEYS.RIGHT)
                return option;
            const [currentOption, ...options] = option.value;
            const step = Number(key === KEYS.RIGHT && currentOption !== options.length - 1) - Number(key === KEYS.LEFT && currentOption !== 0);
            return {
                ...option,
                value: [currentOption + step, ...options]
            };
        }
        renderLabelSelect(option) {
            const [currentOption, ...options] = option.value;
            const limitLabel = '[white]' + (option.compat ? '|  ---  |' : '|') + '[white]';
            const arrowLeft = currentOption === 0 ? limitLabel : '[white]<[/white]';
            const arrowRight = currentOption === options.length - 1 ? limitLabel : '[white]>[/white]';
            const limitStart = currentOption >= 1 ? currentOption - 1 : currentOption;
            const limitEnd = currentOption + 2;
            const optionLabels = options.map((value, index) => index === currentOption ? `[bgGreen] ${value} [/bgGreen]` : ` ${value} `)
                .slice(option.compat ? limitStart : 0, option.compat ? limitEnd : options.length)
                .join(' [white]|[/white] ');
            return `${option.label}  [bgBlack] ${arrowLeft} ${optionLabels} ${arrowRight} [/bgBlack]`;
        }
    };
}
