import { TYPE_OPTION } from "../../tools/constant.js";
export default function customMixin(Base) {
    return class extends Base {
        customOptions = [];
        custom(name, option, value, render, action, defaultOption = false) {
            this.customOptions.push({
                name,
                render,
                action
            });
            return this.item({ label: option, type: TYPE_OPTION.CUSTOM, value, name }, defaultOption);
        }
        renderLabelCustom(option) {
            const customOption = this.customOptions.find(item => item.name === option.name);
            if (customOption)
                return customOption.render(option);
            return option.label;
        }
        actionCustom(option, key) {
            const customOption = this.customOptions.find(item => item.name === option.name);
            if (customOption)
                return customOption.action(option, key);
            return option;
        }
    };
}
