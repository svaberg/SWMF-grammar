# SWMF Configuration

[![Build Status](https://travis-ci.com/svaberg/SWMF-grammar.svg?branch=master)](https://travis-ci.com/svaberg/SWMF-grammar)
![GitHub package.json version](https://img.shields.io/github/package-json/v/svaberg/SWMF-grammar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> This is a Visual Studio Code extension and should be installed from the [VS Code extensions marketplace](https://marketplace.visualstudio.com/items?itemName=svaberg.swmf-grammar)

This extension provides syntax highlighting, outline view, breadcrumbs, and some code completion for [Space Weather Modelling Framework (SWMF)](http://csem.engin.umich.edu/tools/swmf/) configuration files, such as the BATSRUS `PARAM.in` file. The rules are based on the [SWMF manual](http://csem.engin.umich.edu/tools/swmf/documentation/SWMF.pdf) section 3.2.2.

Automatically highlights files ending in `.in` and `.IN`. For files lacking these extensions, the language can be set manually via normal VS Code mechanisms.

![Features demo](images/demo.png)

## Features

* Syntax highlighting;
* Hierarchical document tree in the [outline view](https://code.visualstudio.com/docs/getstarted/userinterface#_outline-view);
* [Breadcrumbs](https://code.visualstudio.com/updates/v1_26#_breadcrumbs) support;
* Toggle comment using `!` as comment character;
* Code folding between `#BEGIN_COMP` and `#END_COMP` markers;
* Autoclosing of `#BEGIN_COMP`.

## Installation

This is a [Visual Studio Code](https://code.visualstudio.com/download) extension. It is best installed from the [on-line extensions marketplace](https://marketplace.visualstudio.com/items?itemName=svaberg.swmf-grammar), or from inside VS Code: Click on `Preferences/Extensions` and type `swmf-grammar` into the search box.

To test the installation, just open a handy SWMF `PARAM.in` file.

Alternatively, the extension can be [built, installed and tested manually](INSTALL.md).
