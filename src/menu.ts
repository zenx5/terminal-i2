import { typeOption, typeOptionGeneral } from "./index.d"
import { KEYS, TYPE_OPTION } from "./constant";
import { cleanTerminal, catchArrows, writeTerminal } from "./terminal";

export type typeOptionsMenu = {
    title?: string,
    options?: typeOption[],
    markedOption?: number,
    colorTitle?: string,
    colorOption?: string,
    bgColorOption?: string,
    colorOptionHover?: string,
    bgColorOptionHover?: string
}

const defaultOptionsMenu:typeOptionsMenu = {
    title: "",
    options: [],
    markedOption: 1,
    colorTitle: "green",
    colorOption: "white",
    bgColorOption: "",
    colorOptionHover: "red",
    bgColorOptionHover: "bgYellow"
}

export class Menu {
    x: number = 0;
    y: number = 0;
    isTemp: boolean = false;
    title: string;
    options: typeOption[] = [];
    markedOption: number = 0;
    colorTitle: string;
    colorOption: string;
    bgColorOption: string;
    colorOptionHover: string;
    bgColorOptionHover: string;


    constructor(optionsMenu?:typeOptionsMenu) {
        const {
            title,
            options,
            markedOption,
            colorTitle,
            colorOption,
            bgColorOption,
            colorOptionHover,
            bgColorOptionHover,
        } = Object.assign(defaultOptionsMenu, optionsMenu) as typeOptionsMenu
        this.title = title as string;
        this.options = options as typeOption[];
        this.markedOption = markedOption as number;
        this.colorTitle = colorTitle as string;
        this.colorOption = colorOption as string;
        this.bgColorOption = bgColorOption as string;
        this.colorOptionHover = colorOptionHover as string;
        this.bgColorOptionHover = bgColorOptionHover as string;
    }

    position(x:number, y:number){
        this.x = x;
        this.y = y;
        return this
    }

    addOption(option: string|typeOption, type:typeOptionGeneral = TYPE_OPTION.LABEL  ) {
        if( typeof option === 'string' ) {
            this.options.push({
                label:option,
                type
            })
        }
        else{
            this.options.push(option);
        }
    }

    changeTitle(title: string) {
        this.title = title;
    }

    head(title: string) {
        this.isTemp = true;
        this.title = title;
        return this;
    }

    item(option:string|typeOption, defaultOption:boolean = false) {
        this.addOption(option)
        if( defaultOption ){
            this.markedOption = this.options.length - 1;
        }
        return this;
    }

    input(option:string, defaultOption:boolean = false) {
        return this.item({ label:option , type:TYPE_OPTION.INPUT, value:'' }, defaultOption)
    }

    bool(option:string, toggles:[string, string],defaultOption:boolean = false) {
        return this.item({ label:option , type:TYPE_OPTION.BOOL, value:toggles }, defaultOption)
    }

    select(option:string, selections:string[], defaultOption:boolean = false) {
        return this.item({ label:option, type:TYPE_OPTION.SELECT, value:[0, ...selections] }, defaultOption)
    }

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

    async render(waitEnter = true){
        let isReturn = false
        let isArrow = false
        let option = this.markedOption + 1
        if( this.options.length === 0 ) return [0, ''] // Not options found
        do {
            cleanTerminal()
            await this.renderMenu(option)
            const response = await catchArrows() as { isArrow: boolean, name: string }
            cleanTerminal()
            isArrow = response.isArrow
            isReturn = response.name === KEYS.RETURN
            if( response.name === KEYS.UP ){
                option = option === 1 ? this.options.length : option-1
            }
            else if( response.name === KEYS.DOWN ){
                option = option === this.options.length ? 1 : option+1
            }
            else {
                this.options[ option - 1 ] = this.actionOption( this.options[ option - 1 ], response.name )
            }
        } while(isArrow || waitEnter && !isReturn )
        const value = this.options[ option - 1 ].type===TYPE_OPTION.BOOL ? (this.options[ option - 1 ].value as string[])[0] : this.options[ option - 1 ].value
        if( this.isTemp ) this.clean()
        return [ option, value ]
    }

    actionOption( option:typeOption, key:string ) {
        switch( option.type ) {
            case TYPE_OPTION.BOOL:
                if( key!==KEYS.LEFT && key!==KEYS.RIGHT ) return option
                return {
                    ...option,
                    value: (option.value as string[]).sort( ()=> -1 )
                }
            case TYPE_OPTION.NUMBER:{
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
            case TYPE_OPTION.SELECT:
                if( key!==KEYS.LEFT && key!==KEYS.RIGHT ) return option
                const [currentOption, ...options] = option.value
                const step = Number(key===KEYS.RIGHT && currentOption!==options.length-1) - Number(key===KEYS.LEFT && currentOption!==0)
                return {
                    ...option,
                    value: [currentOption + step, ...options]
                }
            case TYPE_OPTION.INPUT:
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
            default:
                return option
        }
    }

    async renderInput(waitEnter = true){
        this.render(waitEnter)
    }

    clean(){
        this.isTemp = false;
        this.title = ""
        this.options = []
    }

    private colored(bgColor:any, color:any, opt:string){
        if( bgColor === '' ) return `[${color}]${opt}[/${color}]`
        return `[${bgColor}][${color}]${opt}[/${color}][/${bgColor}]`
    }

    async renderMenu(option:number){
        const bgColorOptionHover = this.bgColorOptionHover
        const colorOptionHover = this.colorOptionHover
        const bgColorOption = this.bgColorOption
        const colorOption = this.colorOption
        const colorTitle = this.colorTitle

        const optionsText = this.options
            .map(
                (opt, index) =>{
                    const text = this.renderLabel(opt)
                    return (index!==option-1) ? text : this.colored(bgColorOptionHover,colorOptionHover,text)
                }
            )
            .join('\n')
        await writeTerminal(`[${colorTitle}]${this.title}[/${colorTitle}]\n${this.colored(bgColorOption, colorOption, optionsText)}\n`, this.x, this.y)
        return this
    }

    private renderLabel(option:typeOption) {
        switch( option.type ) {
            case TYPE_OPTION.INPUT:
                return `${option.label}: ${option.value}`
            case TYPE_OPTION.BOOL:
                const [currentValue] = option.value as string[]
                return `${option.label} < ${currentValue} >`
            case TYPE_OPTION.NUMBER:{
                const { value, min, max, step } = option.value
                const arrowLeft = value === min ? '|' : '<'
                const arrowRight = value === max ? '|' : '>'
                const fixLength = step.toString().split('.').at(1)?.length ?? 0
                return `${option.label}  ${arrowLeft} [bgBlack][yellow] ${value.toFixed(fixLength)} [/yellow][/bgBlack] ${arrowRight} `
            }
            case TYPE_OPTION.SELECT:
                const [currentOption, ...options] = option.value
                const arrowLeft = currentOption === 0 ? '|' : '<'
                const arrowRight = currentOption === options.length - 1 ? '|' : '>'
                return `${option.label}   ${arrowLeft} ${options.map( (value:string, index:number) => index===currentOption ? `[bgGreen] ${value} [/bgGreen]` : ` ${value} ` ).join(' | ')} ${arrowRight}`
            default:
                return option.label
        }

    }

    async json2menu(json: any) {
        if( json.title ) this.title = json.title
        if( json.colorTitle ) this.colorTitle = json.colorTitle
        if( json.colorOption ) this.colorOption = json.colorOption
        if( json.bgColorOption ) this.bgColorOption = json.bgColorOption
        if( json.colorOptionHover ) this.colorOptionHover = json.colorOptionHover
        if( json.bgColorOptionHover ) this.bgColorOptionHover = json.bgColorOptionHover
        if( json.options ) this.options = json.options
        if( json.markedOption ) this.markedOption = json.markedOption
        return this
    }

    async file2json( file:string ) {
        return new Promise((resolve, reject)=>{
            try{
                const fs = require('fs')
                fs.readFile(file, 'utf8', (err:any, data:string)=>{
                    if( err ) reject(err)
                    resolve(JSON.parse(data))
                })
            }catch(e){
                reject(e)
            }
        })
    }

}

export default function createMenu(config:typeOptionsMenu) {
    return new Menu(config)
}