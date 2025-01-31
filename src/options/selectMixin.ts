import { typeOption } from "../index.d"
import { KEYS, TYPE_OPTION } from "../constant"

export default function selectMixin(Base:any){
    return class extends Base {
        select(option:string, selections:string[], defaultOption:boolean = false) {
            return this.item({ label:option, type:TYPE_OPTION.SELECT, value:[0, ...selections] }, defaultOption)
        }

        actionSelect(option:typeOption, key:string){
            if( key!==KEYS.LEFT && key!==KEYS.RIGHT ) return option
            const [currentOption, ...options] = option.value
            const step = Number(key===KEYS.RIGHT && currentOption!==options.length-1) - Number(key===KEYS.LEFT && currentOption!==0)
            return {
                ...option,
                value: [currentOption + step, ...options]
            }
        }

        renderLabelSelect(option:typeOption){
            const [currentOption, ...options] = option.value
            const arrowLeft = currentOption === 0 ? '|' : '<'
            const arrowRight = currentOption === options.length - 1 ? '|' : '>'
            return `${option.label}   ${arrowLeft} ${options.map( (value:string, index:number) => index===currentOption ? `[bgGreen] ${value} [/bgGreen]` : ` ${value} ` ).join(' | ')} ${arrowRight}`
        }
    }
}