import { KEYS } from "../tools/constant"
import { catchArrows, writeTerminal } from "../tools/terminal"

type VoidAction = ()=>void

type typeAction = {
    key: string
    label: string
    onAction: VoidAction
}

export class Dialog {
    title:string = ""
    description:string = ""
    actions:typeAction[] = []
    position:{ x:number, y:number }= { x:0, y:0 }
    width:number = 0
    bgColor:string = 'bgGreen'

    constructor(title:string, description:string, bgColor:string = 'bgGreen'){
        this.title = title
        this.description = description
        this.bgColor = bgColor
    }

    moveTo(x:number, y:number) {
        this.position = { x, y }
        return this
    }

    addAction(key:typeAction|string, label:string = '', onAction:()=>void = ()=>{}) {
        if( typeof key === 'string' ) {
            this.actions.push({
                key,
                label,
                onAction
            })
        }else{
            this.actions.push(key)
        }
    }

    action(newAction:typeAction){
        this.actions.push( newAction )
        return this
    }

    removeAction(key:string) {
        this.actions = this.actions.filter( (action:typeAction) => action.key!==key )
    }

    async render() {
        let isReturn = false
        let isArrow = false
        const maxLength = Math.max( this.title.length, this.description.length ) + 20
        const line = new Array(Math.floor(maxLength*3/2)).fill('#').join('')
        this.width = line.length
        let markedOptionOffset = 1
        do{
            writeTerminal(
                line + '\n'+
                this.cover("", line) + '\n' +
                this.cover(this.title, line) + '\n' +
                this.cover(this.description, line)+ '\n' +
                this.renderActions(line, markedOptionOffset - 1 ) +
                this.cover("", line) + '\n' +
                line + '\n', this.position.x, this.position.y
            )
            const response = await catchArrows() as { isArrow: boolean, name: string }
            isArrow = response.isArrow
            isReturn = response.name === KEYS.RETURN
            if( response.name === KEYS.LEFT ){
                markedOptionOffset = markedOptionOffset === 1 ? this.actions.length : markedOptionOffset - 1
            }
            else if( response.name === KEYS.RIGHT ){
                markedOptionOffset = markedOptionOffset === this.actions.length ? 1 : markedOptionOffset + 1
            }
        } while(isArrow || !isReturn )
        const { key, onAction } = this.actions[ markedOptionOffset - 1 ]
        return { key, onAction }
    }

    renderActions(line:string, selected:number) {
        const backgroundColor = this.bgColor
        let stringActions = ''
        if( this.actions.length === 0 ) return ''
        this.actions.forEach( (action, index) => {
            const indexTrue = index+1
            const separator = indexTrue%3 ? '|' : '\n'
            const last = indexTrue===this.actions.length
            const label = index===selected ? `[${backgroundColor}] ${this.actions[index].label} [/${backgroundColor}]` : ` ${this.actions[index].label} `
            stringActions += label + (!last  ? separator : '')
        })

        const finalActions = stringActions.split('\n')
            .map( lineAction => {
                const isSelectedInclude = lineAction.includes(backgroundColor)
                return this.cover(`|${lineAction}|`, line, isSelectedInclude ? backgroundColor.length*2 + 5 : 0)
            })
            .join('\n')
        return this.cover('', line) + '\n' + finalActions + '\n'
    }


    private cover(text:string, line:string, offset = 0) {
        const empty = text===''
        let blankLength = line.length + offset - 4
        const wrapperLength = Math.floor(blankLength - text.length)/2
        const rounded = wrapperLength%2
        const fixWrapperLength = rounded ? Math.floor(wrapperLength) : wrapperLength
        const lineBlank = new Array(blankLength).fill(' ').join('')
        return  lineBlank.slice(0, fixWrapperLength) + (empty ? '' : text )
    }
}

export function createDialog({ title, description }:{ title:string, description:string }){
    return new Dialog(title, description)
}