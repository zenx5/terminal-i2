import { typeOption } from "../.."
import { KEYS, TYPE_OPTION } from "../../tools/constant"

export default function numberMixin(Base:any){
    return class extends Base {
        number(option:string, config:any, defaultOption:boolean = false) {
            const configNumber = Object.assign({
                value: 0,
                step: 1,
                min: -Infinity,
                max: Infinity
            }, config)
            return this.item({
                label:option,
                type:TYPE_OPTION.NUMBER,
                value: configNumber
            }, defaultOption)
        }

        actionNumber(option:typeOption, key:string){
            if( key!==KEYS.LEFT && key!==KEYS.RIGHT ) return option
            const { value, min, max, step } = option.value
            const direction = step*(Number(key===KEYS.RIGHT && value!==max) - Number(key===KEYS.LEFT && value!==min))
            return {
                ...option,
                value:{
                    ...option.value,
                    value: value + direction
                }
            }
        }

        renderLabelNumber(option:typeOption){
            const { value, min, max, step } = option.value
            const arrowLeft = value === min ? '|' : '<'
            const arrowRight = value === max ? '|' : '>'
            const fixLength = step.toString().split('.').at(1)?.length ?? 0
            return `${option.label}  ${arrowLeft} [bgBlack][yellow] ${value.toFixed(fixLength)} [/yellow][/bgBlack] ${arrowRight} `
        }
    }
}