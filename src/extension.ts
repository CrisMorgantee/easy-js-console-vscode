import * as vscode from 'vscode';
import { logStatementMethod } from './utils';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "easy-console" is now active!');

	let log = vscode.commands.registerCommand('easy-console.log', logStatementMethod.bind(null, 'log'));

	let debug = vscode.commands.registerCommand('easy-console.debug', logStatementMethod.bind(null, 'debug'));

	let table = vscode.commands.registerCommand('easy-console.table', logStatementMethod.bind(null, 'table'));

	let info = vscode.commands.registerCommand('easy-console.info', logStatementMethod.bind(null, 'info'));

	let dir = vscode.commands.registerCommand('easy-console.dir', logStatementMethod.bind(null, 'dir'));

	let trace = vscode.commands.registerCommand('easy-console.trace', logStatementMethod.bind(null, 'trace'));

	let count = vscode.commands.registerCommand('easy-console.count', logStatementMethod.bind(null, 'count'));

	let time = vscode.commands.registerCommand('easy-console.time', logStatementMethod.bind(null, 'time'));

	let timeEnd = vscode.commands.registerCommand('easy-console.timeEnd', logStatementMethod.bind(null, 'timeEnd'));

	let warn = vscode.commands.registerCommand('easy-console.warn', logStatementMethod.bind(null, 'warn'));

	let error = vscode.commands.registerCommand('easy-console.error', logStatementMethod.bind(null, 'error'));

	context.subscriptions.push(log, debug, table, info, dir, trace, count,time, timeEnd, warn, error);
}
