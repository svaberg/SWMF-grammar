'use strict';

// src/extension.ts

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(
        vscode.languages.registerDocumentSymbolProvider(
            {language: "swmf-config"}, 
            new SwmfConfigDocumentSymbolProvider()
        )
    );
}

class SwmfConfigDocumentSymbolProvider implements vscode.DocumentSymbolProvider {

    public provideDocumentSymbols(
        document: vscode.TextDocument,
        token: vscode.CancellationToken): Thenable<vscode.DocumentSymbol[]> 
        {
        return new Promise((resolve, reject) => {
            var symbols = [];

            for (var i = 0; i < document.lineCount; i++) {
                var line = document.lineAt(i);

                var marker

                if (line.text.startsWith("#BEGIN_COMP")) {
                    let marker_symbol = {
                        name: line.text.substr(1,13),
                        kind: vscode.SymbolKind.Namespace,
                        location: new vscode.Location(document.uri, line.range)
                    }
                    marker = marker_symbol
                }
                else if (line.text.startsWith("#")) {
                    let boo = line.text.substr(1)

                    symbols.push({
                        name: boo,
                        kind: vscode.SymbolKind.Module,
                        location: new vscode.Location(document.uri, line.range)
                    })
                }
                else {
                    let boo = line.text
                    var regex = /^[1-9]\d{0,2}$/g
                    regex.test("2")
                    symbols.push({
                        name: boo,
                        kind: vscode.SymbolKind.Variable,
                        location: new vscode.Location(document.uri, line.range)
                    })
                }
            }

            resolve(symbols);
        });
    }
}