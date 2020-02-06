# Manual installation

>This is a [Visual Studio Code](https://code.visualstudio.com/download) extension. It is best installed from the [on-line extensions marketplace](https://marketplace.visualstudio.com/items?itemName=svaberg.swmf-grammar), or from inside VS Code `Preferences/Extensions` and search for `swmf-grammar`.

_Alternatively_, the extension can be built and installed manually as in the next section. This should only be required for developers.

## Build the extension

1. Clone the repository and enter into the folder

    ```bash
    git clone git@github.com:svaberg/SWMF-grammar.git
    cd SWMF-grammar
    ```

2. Install the required packages with `npm`

    ```bash
    npm install
    ```

3. Compile with `npm`

    ```bash
    npm run compile
    ```

At this point the extension may be debugged in the Extension Development Host:

```bash
code .
```

followed by the `Debug/Start Debugging` dropdown (or the `F5` key). To observe the extension in action, view the file `demo.in`.

To complete the manual installation, follow the remaining steps to manually create and install the package:

## Package and install the extension

4. Create a package using `vsce`

    ```bash
    vsce package
    ```

    This should generate a `swmf-grammar-?.?.?.vsix` file in the current directory.
5. Manually install the extension in VS Code (you may want to replace the wildcards in the version number)

    ```bash
    code --install-extension swmf-grammar-?.?.?.vsix
    ```

To test the installation, open the current folder in VS Code

```bash
code .
```

and view the file `demo.in`.
