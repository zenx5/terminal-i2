import { KEYS } from "./constant";
import { cleanTerminal, catchArrows, writeTerminal } from "./terminal";

type typeOptionsMenu = {
    title?: string,
    options?: string[],
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

export default class Menu {
    isTemp: boolean = false;
    title: string;
    options: string[] = [];
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
        this.options = options as string[];
        this.markedOption = markedOption as number;
        this.colorTitle = colorTitle as string;
        this.colorOption = colorOption as string;
        this.bgColorOption = bgColorOption as string;
        this.colorOptionHover = colorOptionHover as string;
        this.bgColorOptionHover = bgColorOptionHover as string;
    }

    addOption(option: string) {
        this.options.push(option);
    }

    changeTitle(title: string) {
        this.title = title;
    }

    head(title: string) {
        this.isTemp = true;
        this.title = title;
        return this;
    }

    item(option:string, defaultOption:boolean = false) {
        this.options.push(option);
        if( defaultOption ){
            this.markedOption = this.options.length - 1;
        }
        return this;
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
                (opt, index) =>
                index===option-1 ?
                colored(bgColorOptionHover,colorOptionHover,opt) :
                opt
            )
            .join('\n')
        await writeTerminal(`[${colorTitle}]${this.title}[/${colorTitle}]\n${colored(bgColorOption, colorOption, optionsText)}\n`)
        return this
    }



}