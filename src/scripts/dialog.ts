import { exit } from "process";
import { createDialog } from "../index";

const dialog = createDialog({ title:"Saludo", description:`Hola mundo! en especial a Octavio` })
dialog.addAction({ key: 'key__ok', label: 'OK', onAction: () => console.log('hola ok') } )
dialog.addAction({ key: 'key_cancel', label: 'Cancel', onAction: () => console.log('hola cancel') })
dialog.addAction({ key: 'key__info', label: 'Info', onAction: () => console.log('hola info') })
dialog.addAction({ key: 'key__share', label: 'Share', onAction: () => console.log('hola share') })

const { key, onAction } = await dialog.render()

console.log( `key selected is ${key}` )
onAction()

exit(0)