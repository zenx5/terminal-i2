import { typeOption } from "../index.d"
import { KEYS, TYPE_OPTION } from "../constant"

export default function selectMixin(Base:any){
    return class extends Base {
        select(option:string, configArg:typeOption|string[]) {
            const defaultConfig = { value:[], defaultSelection:false, clickable:true, compat:false }
            const config = Array.isArray( configArg ) ? { value:configArg } : configArg
            const {
                value,
                defaultSelection,
                clickable,
                compat
            } = Object.assign(defaultConfig,config)

            return this.item({
                label:option,
                type:TYPE_OPTION.SELECT,
                value:[0, ...value],
                clickable,
                compat
            },defaultSelection)
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
            const limitLabel = option.compat ? '|  ---  |' : '|'
            const arrowLeft = currentOption === 0 ? limitLabel : '<'
            const arrowRight = currentOption === options.length - 1 ? limitLabel : '>'
            const limitStart = currentOption>=1 ? currentOption - 1 : currentOption
            const limitEnd = currentOption + 2
            const optionLabels = options.map( (value:string, index:number) => index===currentOption ? `[bgGreen] ${value} [/bgGreen]` : ` ${value} ` )
                                        .slice( option.compat ? limitStart : 0, option.compat ? limitEnd : options.length)
                                        .join(' | ')
            return `${option.label}  [bgBlack] ${arrowLeft} ${optionLabels} ${arrowRight} [/bgBlack]`
        }
    }
}