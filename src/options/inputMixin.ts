import { typeOption } from "../index.d"
import { KEYS, TYPE_OPTION } from "../constant"

export default function inputMixin(Base:any){
    return class extends Base {

        input(option:string,  configArg:typeOption) {
            const defaultConfig = { value:'', defaultSelection:false, clickable:false }
            const config = Array.isArray( configArg ) ? { value:configArg } : configArg
            const {
                value,
                defaultSelection,
                clickable
            } = Object.assign(defaultConfig,config)

            return this.item({
                label:option,
                type:TYPE_OPTION.INPUT,
                value,
                clickable
            }, defaultSelection)
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
            return `${option.label}: [bgBlack][white] ${option.value} [white][/bgBlack] `
        }
    }
}