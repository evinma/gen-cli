const fs = require('fs')
const path = require('path')
const util = require('util')
const writeFilePro = util.promisify(fs.writeFile)
// const minimist = require('minimist')
const chalk = require('chalk')
const ora = require('ora');

const basePath = process.cwd()

const pickParams = (params) => {
    const result = {}
    let key, val
    params.forEach((c) => {
        if (c.startsWith('-')) {
            if (key) {
                result[key] = val
            }
            key = c.slice(1)
        } else {
            val = c
        }
    })
    result[key] = val
    return result
}

const compositionHtml = ({ name } = { name: '' }) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
    
</body>
</html>`
}
// const { argv } = process
// const [,,...params] = argv
// console.log(minimist(params))
// console.log(params)
// const paramsData = pickParams(params)
// console.log(paramsData)

const generateHtml = async (paramsData) => {
    const spinner = ora(`generate ${chalk.green('html')}... \r\n`).start();
    spinner.text = `generate ${chalk.green(`${paramsData.name}.html`)}... \r\n`
    await writeFilePro(path.join(basePath, `${paramsData.name}.html`), compositionHtml(paramsData))

    spinner.succeed(chalk.green('finished !'))
}

module.exports = generateHtml
