import * as vscode from 'vscode';
import { createLogPanel, logStatementMethod, removeAllLogs } from './utils';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "easy-console" is now active!');

    const commands = ['log', 'debug', 'table', 'info', 'dir', 'trace', 'count', 'time', 'timeEnd', 'warn', 'error'];
    
    commands.forEach(cmd => {
        let command = vscode.commands.registerCommand(`easy-console.${cmd}`, logStatementMethod.bind(null, cmd));
        context.subscriptions.push(command);
    });

    // Register new commands
    let showLogHistory = vscode.commands.registerCommand('easy-console.showLogHistory', () => {
        createLogPanel(context);
    });

    let removeLogs = vscode.commands.registerCommand('easy-console.removeAllLogs', () => {
        removeAllLogs();
    });

    context.subscriptions.push(showLogHistory, removeLogs);
}

export function deactivate() {}