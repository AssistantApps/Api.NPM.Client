const path = require('path');
const fs = require('fs');

const filesInDir = (folder) => {
    const directoryPath = path.join(__dirname, folder);
    const filesAndFolders = fs.readdirSync(directoryPath, { withFileTypes: true });

    let importStrs = [];
    for (const fileOrDir of filesAndFolders) {
        if (fileOrDir.isDirectory()) {
            const dirFilesAndFolders = filesInDir(`${folder}/${fileOrDir.name}`);
            importStrs = [...importStrs, ...dirFilesAndFolders];
        } else {
            const filePath = `${folder}/${fileOrDir.name}`.replace('../src/', './').replace('.ts', '');
            if (filePath.includes('/tests/')) continue;
            importStrs.push(`export { } from '${filePath}';`);
        }
    }
    return importStrs;
}

const lines = filesInDir('../src');
for (const line of lines) {
    console.log(line);
}