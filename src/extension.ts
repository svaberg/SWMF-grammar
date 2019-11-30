'use strict';

// src/extension.ts

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(
        vscode.languages.registerDocumentSymbolProvider(
            {scheme: "file", language: "swmf-config"}, 
            new SwmfConfigDocumentSymbolProvider()
        )
    );
}

class SwmfConfigDocumentSymbolProvider implements vscode.DocumentSymbolProvider {

    private format(cmd: string):string{
        return cmd.substr(1).toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }

    public provideDocumentSymbols(
        document: vscode.TextDocument,
        token: vscode.CancellationToken): Promise<vscode.DocumentSymbol[]> 
        {
        return new Promise((resolve, reject) => 
        {
            let symbols: vscode.DocumentSymbol[] = [];
            let nodes = [symbols]
            let inside_marker = false
            let inside_run = false
            let inside_userinput = false

            let symbolkind_marker = vscode.SymbolKind.Field
            let symbolkind_run = vscode.SymbolKind.Event
            let symbolkind_cmd = vscode.SymbolKind.Function

            for (var i = 0; i < document.lineCount; i++) {
                var line = document.lineAt(i);

                let tokens = line.text.split(" ")

                if (line.text.startsWith("#BEGIN_COMP")) {

                    let marker_symbol = new vscode.DocumentSymbol(
                        this.format(tokens[0]) + " " + tokens[1],
                        'Component',
                        symbolkind_marker,
                        line.range, line.range)


                    nodes[nodes.length-1].push(marker_symbol)
                    if (!inside_marker) {
                        nodes.push(marker_symbol.children)
                        inside_marker = true
                    }
                    // marker_symbol.children.push(_boot)
                }
                else if (line.text.startsWith("#END_COMP")) {
                    // TODO check if nodes has length 1 before popping.
                    if (inside_marker) {
                        nodes.pop()
                        inside_marker = false
                    }
                }
                else if (line.text.startsWith("#RUN") || line.text.startsWith("#END")) {
                    
                    let run_symbol = new vscode.DocumentSymbol(
                        this.format(tokens[0]),
                        'Session separator',
                        symbolkind_run,
                        line.range, line.range)

                    if (inside_run) {
                        nodes.pop()
                    }
    
                    nodes[nodes.length-1].push(run_symbol)
                    nodes.push(run_symbol.children)
                    inside_run = true
                }
                else if (line.text.startsWith("#USERINPUTBEGIN")) {

                    let user_symbol = new vscode.DocumentSymbol(
                        this.format(tokens[0]),
                        'User module',
                        vscode.SymbolKind.Interface,
                        line.range, line.range)


                    nodes[nodes.length-1].push(user_symbol)
                    if (!inside_userinput) {
                        nodes.push(user_symbol.children)
                        inside_userinput = true
                    }
                    // marker_symbol.children.push(_boot)
                }
                else if (line.text.startsWith("#USERINPUTEND")) {
                    // TODO check if nodes has length 1 before popping.
                    if (inside_userinput) {
                        nodes.pop()
                        inside_userinput = false
                    }
                }                
                else if (line.text.startsWith("#")) {
                    let cmd_symbol = new vscode.DocumentSymbol(
                        this.format(tokens[0]),
                        '',
                        symbolkind_cmd,
                        line.range, line.range)

                    nodes[nodes.length-1].push(cmd_symbol)
                }
            }

            resolve(symbols);
        });
    }
}