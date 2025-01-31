import { typeOption } from "../index.d"
import { KEYS, TYPE_OPTION } from "../constant"

export default function inputMixin(Base:any){
    return class extends Base {

        input(option:string, defaultOption:boolean = false) {
            return this.item({ label:option , type:TYPE_OPTION.INPUT, value:'' }, defaultOption)
        }

        actionInput(option:typeOption, key:string){
            if( key === KEYS.BACKSPACE ){
                return {
                    ...option,
                    value:option.value?.slice(0,-1)
                }
            }
            else if( key.length === 1 ) {
                return {
                    ...option,
                    value: option.value + key
                }
            }
            return option
        }

        renderLabelInput(option:typeOption){
            return `${option.label}: ${option.value}`
        }
    }
}