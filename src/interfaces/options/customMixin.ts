import { typeOption, RenderFunction, ActionFunction, typeCustomOption } from "../.."
import { TYPE_OPTION } from "../../tools/constant"

export default function customMixin(Base:any){
    return class extends Base{
        customOptions:typeCustomOption[] = []

        custom(name:string, option:string, value:any, render:RenderFunction, action:ActionFunction, defaultOption:boolean = false) {
            this.customOptions.push({
                name,
                render,
                action
            })
            return this.item({ label:option , type:TYPE_OPTION.CUSTOM, value, name }, defaultOption)
        }

        renderLabelCustom(option:typeOption):string{
            const customOption = this.customOptions.find( item => item.name===option.name )
            if( customOption ) return customOption.render(option)
            return option.label
        }

        actionCustom(option:typeOption, key:string ):typeOption{
            const customOption = this.customOptions.find( item => item.name===option.name )
            if( customOption ) return customOption.action(option, key)
            return option
        }
    }
}