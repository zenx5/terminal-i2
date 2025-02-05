# Terminal i2

## Description
With this module you can create interactive menus in your terminal. Use the `createMenu` class provided by the module for this.
This is a first version and we will add other functionalities.

## Installation
```bash
npm install terminal-i2
pnpm install terminal-i2
```

## Examples
We have added some examples that you can find in our repository, inside the `src/scripts` folder

## Usage

- Type of options menu
    - title: Title of the menu
    - options: Different options that the menu will have
    - markedOption: default option marked
    - colorTitle: color of the title
    - colorOption: color of the options
    - bgColorOption: color of the background of the options
    - colorOptionHover: color of the options when the selector is over
    - bgColorOptionHover: color of the background of the options when the selector is over

- Type of options dialog
    - title: Title of the dialog
    - description: The message you want to display in the dialog

- Example 1
```javascript
    import { createMenu } from 'terminal-i2';
    const menu = createMenu({
        colorTitle: 'red',
        bgColorOption: '',
        colorOption: 'white',
        bgColorOptionHover: 'bgYellow',
        colorOptionHover: 'red',
    });
    const option = await menu
        .head(`[white]Titulo del menu[/white]`)
        .item("Opción 1", true)
        .item("Opción 2")
        .item("Opción 3")
        .render()
```
- Example 2
```javascript
    import { createMenu } from 'terminal-i2';
    const menu = createMenu({
        colorTitle: 'red',
        bgColorOption: '',
        colorOption: 'white',
        bgColorOptionHover: 'bgYellow',
        colorOptionHover: 'red',
        title: 'Titulo del menu',
        options: ['Opción 1', 'Opción 2', 'Opción 3'],
        markedOption: 1
    });
    const option = await menu.render()
```

- Example 3
```javascript
    import { createDialog } from 'terminal-i2';
    const dialog = createDialog({
        title:"Saludo",
        description:`Hola mundo! en especial a Octavio`
    })
    const { key, label, onAction } = await dialog.render()
```