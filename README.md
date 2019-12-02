# SWMF configuration file syntax

> This is a Visual Studio Code extension and should be installed from the [VS Code extensions marketplace](https://marketplace.visualstudio.com/items?itemName=svaberg.swmf-grammar)

This extension provides syntax highlighting, outline view, and some code completion for [Space Weather Modelling Framework (SWMF)](http://csem.engin.umich.edu/tools/swmf/) configuration files, such as the BATSRUS `PARAM.in` file. The rules are based on the [SWMF manual](http://csem.engin.umich.edu/tools/swmf/documentation/SWMF.pdf) section 3.2.2.

Automatically highlights files ending in `.in` and `.IN`.

![Features demo](images/demo.png)

## Features

 * Syntax highlighting 
 * Hierarchical document tree in outline view.
 * Toggle comment using `!` as comment character.
 * Code folding between `#BEGIN_COMP` and `#END_COMP` markers.
 * Autoclosing of `#BEGIN_COMP`.

## Installation

This is a [Visual Studio Code](https://code.visualstudio.com/download) extension. It is best installed from the [on-line extensions marketplace](https://marketplace.visualstudio.com/items?itemName=svaberg.swmf-grammar), or from inside VS Code `Preferences/Extensions` and search for `swmf-grammar`.

### Alternative installation from source code

This should only be required for developers. 

1.  Clone the repository and enter into the folder
    ```bash
    git clone git@github.com:svaberg/SWMF-grammar.git 
    cd SWMF-grammar
    ```
2.  Install the required packages
    ```bash
    npm install
    ```
3.  Create a package
    ```bash
    vsce package
    ```
    This should generate a `.vsix` file in the current directory.
4.  Manually install the extension in VS Code (you may want to replace the wildcards in the version number)
    ```bash
    code --install-extension swmf-grammar-?.?.?.vsix
    ```

To test the installation, open the current folder in VS Code
```bash
code .
```
and view the file `demo.in`.