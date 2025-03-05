import * as vscode from 'vscode';

let logHistory: string[] = [];
let logPanel: vscode.WebviewPanel | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('[Easy Console] Extensão ativada');

    const commands = ['log', 'debug', 'table', 'info', 'dir', 'trace', 'count', 'time', 'timeEnd', 'warn', 'error'];
    
    commands.forEach(cmd => {
        let command = vscode.commands.registerCommand(`easy-console.${cmd}`, logStatementMethod.bind(null, cmd));
        context.subscriptions.push(command);
        console.log(`[Easy Console] Comando registrado: easy-console.${cmd}`);
    });

    let showLogHistory = vscode.commands.registerCommand('easy-console.showLogHistory', () => {
        console.log('[Easy Console] Abrindo painel de histórico');
        createLogPanel(context);
    });

    let removeLogs = vscode.commands.registerCommand('easy-console.removeAllLogs', () => {
        console.log('[Easy Console] Removendo todos os logs');
        removeAllLogs();
    });

    context.subscriptions.push(showLogHistory, removeLogs);
}

const logStatement = (text: string) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('Can\'t insert log statement because no document is open');
        return;
    }

    logHistory.push(text);
    console.log('[Easy Console] Log adicionado ao histórico:', text);

    const selection = editor.selection;
    const range = new vscode.Range(selection.start, selection.end);

    editor.edit((statement) => {
        statement.replace(range, text);
    });

    if (logPanel) {
        updateLogPanel();
    }
};

const getLogFormat = (method: string, variable: string, format: string): string => {
    switch (format) {
        case 'timestamp':
            return `console.${method}('[${new Date().toISOString()}]', ${variable});`;
        case 'json':
            return `console.${method}(JSON.stringify(${variable}, null, 2));`;
        default:
            return `console.${method}('${variable}: ', ${variable});`;
    }
};

export const logStatementMethod = async (method: string) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const selection = editor.selection;
    const textSelected = editor.document.getText(selection);
    await vscode.commands.executeCommand('editor.action.insertLineAfter');

    if (!textSelected) {
        logStatement(`console.${method}()`);
        return;
    }

    const config = vscode.workspace.getConfiguration('easyConsole');
    const format = config.get<string>('logFormat', 'default');
    const statementToLog = getLogFormat(method, textSelected, format);
    logStatement(statementToLog);
};

export const getLogHistory = () => logHistory;

export const updateLogPanel = () => {
    if (logPanel) {
        logPanel.webview.html = getLogPanelContent();
    }
};

export const createLogPanel = (context: vscode.ExtensionContext) => {
    if (!logPanel) {
        logPanel = vscode.window.createWebviewPanel(
            'logHistory',
            'Log History',
            vscode.ViewColumn.Two,
            { enableScripts: true }
        );

        logPanel.onDidDispose(() => {
            logPanel = undefined;
        }, null, context.subscriptions);
    }
    logPanel.webview.html = getLogPanelContent();
    logPanel.reveal(vscode.ViewColumn.Two);
};

const getLogPanelContent = () => {
    return `
        <html>
        <body>
            <h2>Log History</h2>
            <ul>
                ${logHistory.map(log => `<li>${log}</li>`).join('')}
            </ul>
        </body>
        </html>
    `;
};

export const removeAllLogs = async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const text = document.getText();

    const updatedText = text.replace(/console\.\w+\(.*?\);?/g, '');

    const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(text.length)
    );

    editor.edit(editBuilder => {
        editBuilder.replace(fullRange, updatedText);
    });

    vscode.window.showInformationMessage('All console logs removed!');
};

