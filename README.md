# VS Code Easy Javascript Console

Insert console statements with commands or simply keyboard shortcuts simply, easily and quickly.
> I recommend checking your existing keyboard shortcuts not to cause conflicts or overwrite them

## Installation

### Visual Studio Marketplace

Launch _Quick Open_:

- [_Linux_](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf): `Ctrl+P`
- [_macOS_](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf): `⌘P`
- [_Windows_](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf): `Ctrl+P`

Paste the following command and press `Enter`:

```shell
ext install crismorgantee.easy-js-console-vscode
```
<br>

## Usage

![](https://media.giphy.com/media/RJMv5dmRoShTUDRRCx/giphy.gif)

<br>

### Console

| Shorts          | Output without selection  | Output with selection                                 |
| --------------- | ------------------------- | ----------------------------------------------------- |
| `alt+ctrl+l →`  | `console.`**log**`()`     | `console.`**log**`('object: ', `*_object_*`)`         |
| `alt+ctrl+d →`  | `console.`**debug**`()`   | `console.`**debug(**`'object: ', `*_object_*`)`       |
| `alt+ctrl+t →`  | `console.`**table**`()`   | `console.`**table**`(`*_object_*`)`                   |
| `alt+ctrl+i →`  | `console.`**info**`()`    | `console.`**info**`('object: ', `*_object_*`)`        |
| `alt+ctrl+c →`  | `console.`**count**`()`   | `console.`**count**`('object: ', `*_objectLength_*`)` |
| `alt+ctrl+m →`  | `console.`**time**`()`    | `console.`**time**`(`*_timeId_*`)`                    |
| `alt+ctrl+n →`  | `console.`**timeEnd**`()` | `console.`**timeEnd**`(`*_timeId_*`)`                 |
| `alt+ctrl+w →`  | `console.`**warn**`()`    | `console.`**warn**`('object: ', `*_object_*`)`        |
| `alt+ctrl+e →`  | `console.`**error**`()`   | `console.`**error**`('object: ', `*_object_*`)`       |


<br>

## License
[MIT License](LICENSE)