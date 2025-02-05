import { TYPE_OPTION } from "../../tools/constant";
import { typeOption } from "../../index.d";
import OptionBase from "./OptionBase";
import inputMixin from "./inputMixin";
import boolMixin from "./boolMixin";
import selectMixin from "./selectMixin";
import numberMixin from "./numberMixin";
import customMixin from "./customMixin";

export default class Options extends customMixin(numberMixin(selectMixin(boolMixin(inputMixin(OptionBase))))) {

    actionOption( option:typeOption, key:string ):typeOption {
        switch( option.type ) {
            case TYPE_OPTION.BOOL: return this.actionBool(option, key)
            case TYPE_OPTION.NUMBER: return this.actionNumber(option, key)
            case TYPE_OPTION.SELECT: return this.actionSelect(option, key)
            case TYPE_OPTION.INPUT: return this.actionInput(option, key)
            case TYPE_OPTION.CUSTOM: return this.actionCustom(option, key)
            default: return option
        }
    }

    renderLabel(option:typeOption):string {
        switch( option.type ) {
            case TYPE_OPTION.INPUT: return this.renderLabelInput(option)
            case TYPE_OPTION.BOOL: return this.renderLabelBool(option)
            case TYPE_OPTION.NUMBER: return this.renderLabelNumber(option)
            case TYPE_OPTION.SELECT: return this.renderLabelSelect(option)
            case TYPE_OPTION.CUSTOM: return this.renderLabelCustom(option)
            default: return option.label
        }
    }


}