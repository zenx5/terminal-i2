import { TYPE_OPTION } from "../../tools/constant";
import { typeOption, typeOptionGeneral } from "../../index.d";


export default class OptionBase {
    public options:typeOption[] = []
    public markedOption:number = 0

    addOption(option: string|typeOption, type:typeOptionGeneral = TYPE_OPTION.LABEL  ) {
        if( typeof option === 'string' ) {
            this.options.push({
                label:option,
                type,
                value: '',
                defaultSelection: false,
                clickable: true
            })
        }
        else{
            this.options.push(Object.assign({
                type: TYPE_OPTION.LABEL,
                defaultSelection: false,
                clickable : true
            },option));
        }
    }

    item(option:string|typeOption, defaultOption:boolean = false) {
        this.addOption(option)
        if( defaultOption ) this.markedOption = this.options.length - 1;
        return this;
    }
}