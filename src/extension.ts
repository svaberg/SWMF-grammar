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
            let inside_cmd = false

            for (var i = 0; i < document.lineCount; i++) {
                var line = document.lineAt(i);

                if (line.text.startsWith("#BEGIN_COMP")) {
                    let marker_symbol = new vscode.DocumentSymbol(
                        line.text.substr(1,13),
                        'Marker',
                        vscode.SymbolKind.Class,
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
                        line.text.substr(1,4),
                        'Session',
                        vscode.SymbolKind.Subroutine,
                        line.range, line.range)

                    if (inside_run) {
                        nodes.pop()
                    }
    
                    nodes[nodes.length-1].push(run_symbol)
                    nodes.push(run_symbol.children)
                    inside_run = true
                }
                else if (line.text.startsWith("#")) {
                    let marker_symbol = new vscode.DocumentSymbol(
                        line.text.substr(1,13).toLowerCase(),
                        'Command',
                        vscode.SymbolKind.Constructor,
                        line.range, line.range)


                    nodes[nodes.length-1].push(marker_symbol)
                    // nodes.push(marker_symbol.children)
                    // marker_symbol.children.push(_boot)
                    inside_cmd = true
                }
            }

            // Need this otherwise the outline view just says
            // "Loading document symbols for <file>..." forever.
            resolve(symbols);
        });
    }
}