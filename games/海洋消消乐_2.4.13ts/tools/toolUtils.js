let fs = require('fs');
let child_process = require('child_process');
var path = require("path");
let releasePath = "";

/**删除文件夹 */
var deleteFolderRecursive = function (path) {
    // console.log("删除文件夹", path);
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

//拷贝单个文件
let copyFile = (src, dist) => {
    let source_path = releasePath + src;
    let destination_path = releasePath + dist;
    console.warn("-> source_path: " + source_path);
    console.warn("-> destination_path: " + destination_path);
    fs.copyFile(source_path, destination_path, (err) => {
        if (err) throw err;
        console.warn("-> 拷贝单个文件完毕!");
    });
}

//拷贝文件夹
let copyDir = (src, dist) => {
    let source_path = releasePath + src;
    let destination_path = releasePath + dist;
    console.warn("拷贝文件夹", source_path, destination_path);
    deleteFolderRecursive(destination_path);
    child_process.spawn('cp', ['-r', source_path, destination_path]);
}

/**
 * 获取当前项目根目录
 */
module.exports.getRootPath = function () {
    var currentPath = path.dirname(require.main.filename);
    currentPath = currentPath.replace(/\\+/g, "/");
    var pathArr = currentPath.split("/");
    pathArr.pop();
    return pathArr.join("/");
}

/** 当前项目的所在目录 */
module.exports.getLastPath = function () {
    var currentPath = path.dirname(require.main.filename);
    currentPath = currentPath.replace(/\\+/g, "/");
    var pathArr = currentPath.split("/");
    pathArr.pop();
    pathArr.pop();
    return pathArr.join("/");
}

module.exports.deleteFolderRecursive = deleteFolderRecursive;
module.exports.copyFile = copyFile;
module.exports.copyDir = copyDir;
