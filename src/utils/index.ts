import * as vscode from 'vscode';

const logStatement = (text: string) => {
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
			vscode.window.showErrorMessage('Can\'t insert log statement because no document is open');
			return;
	}

	const selection = editor.selection;

	const range = new vscode.Range(selection.start, selection.end);

	editor.edit((statement) => {
			statement.replace(range, text);
	});
};

export const logStatementMethod = async (method: string) => {		
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		return;
	}
	
	const selection = editor.selection;

	const textSelected = editor.document.getText(selection);
	
	await vscode.commands.executeCommand('editor.action.insertLineAfter');

	if(!textSelected) {
		logStatement(`console.${method}()`);
		return;
	};
		
	const hasOnlyOneArgument = method === 'table' ||method === 'time' || method === 'timeEnd';

	const statementToLog = hasOnlyOneArgument ? `console.${method}(${textSelected});` : `console.${method}('${textSelected}: ', ${textSelected})`;
	logStatement(statementToLog);
};
