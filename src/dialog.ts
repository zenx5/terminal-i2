import { writeTerminal } from "./terminal"

type VoidAction = ()=>void

type typeAction = {
    key: string
    label: string
    onAction: VoidAction
}

export class Dialog {
    title:string = ""
    description:string = ""
    actions:typeAction[] = [
        {
            key: 'key__ok',
            label: 'OK',
            onAction: () => console.log('hola')
        },
        {
            key: 'key_cancel',
            label: 'Cancel',
            onAction: () => console.log('hola')
        },
        {
            key: 'key__info',
            label: 'Info1',
            onAction: () => console.log('hola')
        }
        ,
        {
            key: 'key__info',
            label: 'Info2',
            onAction: () => console.log('hola')
        }
        ,
        {
            key: 'key__info',
            label: 'Info3',
            onAction: () => console.log('hola')
        }
    ]

    constructor(title:string, description:string){
        this.title = title
        this.description = description
    }

    addAction(key:string, label:string, onAction:()=>void) {
        this.actions.push({
            key,
            label,
            onAction
        })
    }

    removeAction(key:string) {
        this.actions = this.actions.filter( (action:typeAction) => action.key!==key )
    }

    render() {
        const maxLength = Math.max( this.title.length, this.description.length ) + 8
        const line = new Array(Math.floor(maxLength*3/2)).fill('#').join('')
        writeTerminal(
            line+'\n'+
            this.cover("", line) + '\n' +
            this.cover(this.title, line) + '\n' +
            this.cover(this.description, line)+ '\n' +
            this.renderActions(line) +
            this.cover("", line) + '\n' +
            line + '\n'
        )
    }

    renderActions(line:string) {
        const selectIndex = 2
        let stringActions = ''
        this.actions.forEach( (action, index) => {
            const indexTrue = index+1
            const separator = indexTrue%3 ? '|' : '\n'
            const last = indexTrue===this.actions.length
            const label = index===selectIndex ? `[bgGreen] ${this.actions[index].label} [/bgGreen]` : ` ${this.actions[index].label} `
            stringActions += label + (!last  ? separator : '')
        })

        const finalActions = stringActions.split('\n')
            .map( lineAction => {
                const isSelectedInclude = lineAction.includes('bgGreen')
                return this.cover(`|${lineAction}|`, line, isSelectedInclude ? 20 : 0)
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
        return  line.slice(0,2)
                + lineBlank.slice(0, fixWrapperLength)
                + (empty ? ' ' : text )
                + lineBlank.slice(-fixWrapperLength)
                + line.slice(-2) + ' ' + text.length
    }
}

export function createDialog({ title, description }:{ title:string, description:string }){
    return new Dialog(title, description)
}