import "./index.d"
import { KEYS, TYPE_OPTION } from "./constant";
import { cleanTerminal, catchArrows, writeTerminal } from "./terminal";

export type typeOptionsMenu = {
    title?: string,
    options?: typeOption[],
    markedOption?: number
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

    addOption(option: string|typeOption, type:typeOptionLabel|typeOptionInput = TYPE_OPTION.LABEL  ) {
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

    async render(waitEnter = true){
        let isReturn = false
        let isArrow = false
        let option = this.markedOption + 1
        if( this.options.length === 0 ) return 0
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
            if( response.name === KEYS.DOWN ){
                option = option === this.options.length ? 1 : option+1
            }

        } while(isArrow || waitEnter && !isReturn )
        if( this.isTemp ) {
            this.isTemp = false;
            this.title = ""
            this.options = []
        }
        return option
    }

    async renderInput(waitEnter = true){
        let isReturn = false
        let isArrow = false
        let option = this.markedOption + 1
        if( this.options.length === 0 ) return [0, '']
        do {
            const isInput = this.options[ option -1 ].type
            const canDelete = this.options[ option -1 ]?.value !== ''
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
            else if( !response.isArrow && response.name && isInput ) {
                if( response.name === KEYS.BACKSPACE && canDelete ){
                    this.options[ option - 1 ].value = this.options[ option - 1 ].value?.slice(0,-1)
                }
                else if( response.name.length === 1 ) {
                    this.options[ option - 1 ].value += response.name
                }
            }
        } while(isArrow || waitEnter && !isReturn )
        const { value } = this.options[ option - 1 ]
        if( this.isTemp ) this.clean()
        return [option, value]
    }

    clean(){
        this.isTemp = false;
        this.title = ""
        this.options = []
    }

    async renderMenu(option:number){
        const bgColorOptionHover = this.bgColorOptionHover
        const colorOptionHover = this.colorOptionHover
        const bgColorOption = this.bgColorOption
        const colorOption = this.colorOption
        const colorTitle = this.colorTitle

        function colored(bgColor:any, color:any, opt:string){
            if( bgColor === '' ) return `[${color}]${opt}[/${color}]`
            return `[${bgColor}][${color}]${opt}[/${color}][/${bgColor}]`
        }

        const optionsText = this.options
            .map(
                (opt, index) =>{
                    const text = opt.type===TYPE_OPTION.INPUT ? `${opt.label}: ${opt.value}` : opt.label
                    return (index!==option-1) ? text : colored(bgColorOptionHover,colorOptionHover,text)
                }
            )
            .join('\n')
        await writeTerminal(`[${colorTitle}]${this.title}[/${colorTitle}]\n${colored(bgColorOption, colorOption, optionsText)}\n`, this.x, this.y)
        return this
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