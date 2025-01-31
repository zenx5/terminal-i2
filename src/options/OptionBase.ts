import { TYPE_OPTION } from "../constant";
import { typeOption, typeOptionGeneral } from "../index.d";


export default class OptionBase {
    options:typeOption[] = []
    markedOption:number = 0

    addOption(option: string|typeOption, type:typeOptionGeneral = TYPE_OPTION.LABEL  ) {
        if( typeof option === 'string' ) {
            this.options.push({
                label:option,
                type,
                value: ''
            })
        }
        else{
            this.options.push(option);
        }
    }

    item(option:string|typeOption, defaultOption:boolean = false) {
        this.addOption(option)
        if( defaultOption ){
            this.markedOption = this.options.length - 1;
        }
        return this;
    }
}