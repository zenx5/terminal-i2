import { TYPE_OPTION } from "../../tools/constant.js";
import OptionBase from "./OptionBase.js";
import inputMixin from "./inputMixin.js";
import boolMixin from "./boolMixin.js";
import selectMixin from "./selectMixin.js";
import numberMixin from "./numberMixin.js";
import customMixin from "./customMixin.js";
export default class Options extends customMixin(numberMixin(selectMixin(boolMixin(inputMixin(OptionBase))))) {
    actionOption(option, key) {
        switch (option.type) {
            case TYPE_OPTION.BOOL: return this.actionBool(option, key);
            case TYPE_OPTION.NUMBER: return this.actionNumber(option, key);
            case TYPE_OPTION.SELECT: return this.actionSelect(option, key);
            case TYPE_OPTION.INPUT: return this.actionInput(option, key);
            case TYPE_OPTION.CUSTOM: return this.actionCustom(option, key);
            default: return option;
        }
    }
    renderLabel(option) {
        switch (option.type) {
            case TYPE_OPTION.INPUT: return this.renderLabelInput(option);
            case TYPE_OPTION.BOOL: return this.renderLabelBool(option);
            case TYPE_OPTION.NUMBER: return this.renderLabelNumber(option);
            case TYPE_OPTION.SELECT: return this.renderLabelSelect(option);
            case TYPE_OPTION.CUSTOM: return this.renderLabelCustom(option);
            default: return option.label;
        }
    }
}
