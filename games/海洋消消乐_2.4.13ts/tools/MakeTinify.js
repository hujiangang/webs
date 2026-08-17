/**
 * 功能：压缩构建出来的工程下的图片
 */


const tinify = require('tinify');
// const apiKey = require('./api_key');
const fs = require('fs');
// const path = require('path');
// API Key
/**如果没有压缩，可能是apiKey的500次数用完，需要更换 */
tinify.key = "k9jXGUjTRZF14t1XBpyqSFGLEUh0lcFg";// "i9cUPGXlVZPIE0P0S8vO1iO_7a8ecQai";//gmail //"k9jXGUjTRZF14t1XBpyqSFGLEUh0lcFg"; //outlook


// 执行图片压缩任务，返回promise对象
const task = file => {
    const source = tinify.fromFile(file.fromFile);
    source.toFile(file.toFile, () => {
        console.warn("compressed ->", file.toFile);
    });
    return source._url;
}
// 通过输入文件夹和输出文件夹，返回一个数组
const fromDir = (inDir, outDir, _files = []) => {
    const files = fs.readdirSync(inDir);
    let needFileName = ['png', 'jpg', "PNG"];

    for (let file of files) {
        let fileArr = file.split(".");
        const filePath = `${inDir}/${file}`;
        const toFilePath = `${outDir}/${file}`;

        if (needFileName.indexOf(fileArr[fileArr.length - 1]) == -1 && !fs.statSync(filePath).isDirectory()) {
            continue;
        }
        if (fs.statSync(filePath).isDirectory()) {
            fromDir(filePath, toFilePath, _files)
        } else {
            // try {
            //     fs.accessSync(toFilePath);
            // } catch (err) {
            _files.push({
                fromFile: filePath,
                toFile: toFilePath,
            });
            // }
        }
    }
    return _files;
}

const rootDir = require("./toolUtils").getRootPath();
/** 想要压缩某个文件夹下的所有图片，更换这个路径就可以 */
// const screenshotDir = rootDir + "/bin/res/atlas";
// const screenshotDir = "/Users/cim/Documents/workspace/soe/client/build/wechatgame/res/raw-assets";
const screenshotDir = rootDir +"/assets/resources/texture/map/ui";
// console.error(rootDir);
const files = fromDir(screenshotDir, screenshotDir);
console.log("开始压缩", files)

// 遍历数组，顺序执行各任务
if (files.length === 0) {
    return;
}
let current = task(files[0]);
for (let i = 1; i < files.length; i++) {
    current = current.then(task(files[i]));
}