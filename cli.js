#!/usr/bin/env node

const [, , ...args] = process.argv
const colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    fg: {
        Black: "\x1b[30m",
        Red: "\x1b[31m",
        Green: "\x1b[32m",
        Yellow: "\x1b[33m",
        Blue: "\x1b[34m",
        Magenta: "\x1b[35m",
        Cyan: "\x1b[36m",
        White: "\x1b[37m",
        Crimson: "\x1b[38m" //القرمزي
    },
    bg: {
        Black: "\x1b[40m",
        Red: "\x1b[41m",
        Green: "\x1b[42m",
        Yellow: "\x1b[43m",
        Blue: "\x1b[44m",
        Magenta: "\x1b[45m",
        Cyan: "\x1b[46m",
        White: "\x1b[47m",
        Crimson: "\x1b[48m"
    }
};
const prompt = () => {
    return new Promise((resolve, reject) => {
        const stdin = process.openStdin();
        let content = '';
        stdin.addListener('data', d => {
            content += d.toString();
            stdin.end()
            resolve(content)
        });
        stdin.addListener('end', () => {
            resolve(content)
        });
    })
}
if (args.length < 2) {
    console.log(colors.bg.Black, colors.fg.Red, "Invalid arguments: Usage css-inliner source-file-path target-file-path", colors.Reset);

} else {
    const CSSInliner = require('css-inliner');
    const fs = require('fs');
    const sourceFile = args[0];
    const targetFile = args[1];

    (async () => {
        if (fs.existsSync(targetFile)) {
            console.log(colors.bg.Black, colors.fg.Yellow, `File '${targetFile}' exists! Do you want to replace it (yes|no)?`, colors.Reset);
            const input=await prompt();
            if(!/yes/.test(input))
                return;
        }
        if (fs.existsSync(sourceFile)) {
            let html = fs.readFileSync(sourceFile, 'utf8')
            const inliner = new CSSInliner({
                directory: './'
            });
            inliner.on('warning', function (warning) {
                console.log(colors.bg.Black, colors.fg.Yellow, `${warning}`, colors.Reset);
            });
            const result = await inliner.inlineCSSAsync(html)
            fs.writeFileSync(targetFile,result);
            console.log("Finished!")
        } else {
            console.log(colors.bg.Black, colors.fg.Red, `File '${sourceFile}' doesn't exist!`, colors.Reset);
        }

    })();


}