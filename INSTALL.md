# Installation

>This is a [Visual Studio Code](https://code.visualstudio.com/download) extension. It is best installed from the [on-line extensions marketplace](https://marketplace.visualstudio.com/items?itemName=svaberg.swmf-grammar), or from inside VS Code `Preferences/Extensions` and search for `swmf-grammar`.

_Alternatively_, the extension can be built and installed manually as in the next section. This should only be required for developers.

## Manual installation from source code

1. Clone the repository and enter into the folder

    ```bash
    git clone git@github.com:svaberg/SWMF-grammar.git
    cd SWMF-grammar
    ```

2. Install the required packages with `npm`

    ```bash
    npm install
    ```

3. Create a package using `vsce`

    ```bash
    vsce package
    ```

    This should generate a `swmf-grammar-?.?.?.vsix` file in the current directory.
4. Manually install the extension in VS Code (you may want to replace the wildcards in the version number)

    ```bash
    code --install-extension swmf-grammar-?.?.?.vsix
    ```

To test the installation, open the current folder in VS Code

```bash
code .
```

and view the file `demo.in`.
