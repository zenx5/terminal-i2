import { TYPE_OPTION } from "../../tools/constant.js";
export default class OptionBase {
    options = [];
    markedOption = 0;
    addOption(option, type = TYPE_OPTION.LABEL) {
        if (typeof option === 'string') {
            this.options.push({
                label: option,
                type,
                value: '',
                defaultSelection: false,
                clickable: true
            });
        }
        else {
            this.options.push(Object.assign({
                type: TYPE_OPTION.LABEL,
                defaultSelection: false,
                clickable: true
            }, option));
        }
    }
    item(option, defaultOption = false) {
        this.addOption(option);
        if (defaultOption)
            this.markedOption = this.options.length - 1;
        return this;
    }
}
