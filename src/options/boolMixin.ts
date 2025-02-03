import { typeOption } from "../index.d"
import { KEYS, TYPE_OPTION } from "../constant"

export default function boolMixin(Base:any){
    return class extends Base{

        bool(option:string, config:any){
            const { value, defaultSelection, clickable } = Object.assign({ value:[false, true], defaultSelection:false, clickable:true },config)

            return this.item({
                label:option,
                type:TYPE_OPTION.BOOL,
                value: value.slice(0,2),
                defaultSelection: defaultSelection,
                clickable: clickable
            })
        }

        renderLabelBool(option:typeOption){
            const [currentValue] = option.value as string[]
            return `${option.label} < ${currentValue} >`
        }

        actionBool(option:typeOption, key:string ){
            if( key!==KEYS.LEFT && key!==KEYS.RIGHT ) return option
            return {
                ...option,
                value: (option.value as string[]).sort( ()=> -1 )
            }
        }
    }
}