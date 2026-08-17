/**
 * 导出配置脚本
 * 说明: 根据根目录下/config目录下的配置文件，使用xlsx2json工具导出json文件以及config.d.ts文件 
 * 然后拷贝到/resources/csv目录下
 * 
 * 用法：1命令行执行本脚本
 *      2,vscode安装codeRunner插件，右键Run Code便直接执行
 */
let fs = require('fs');
let child_process = require('child_process');
let ToolUtils = require("./toolUtils");
let rootPath = ToolUtils.getLastPath();
let configPath = rootPath + "/config";
let xlsx2jsonPath = rootPath + "/tool/xlsx2json-master";
let exportPath = xlsx2jsonPath + "/export";

let copyConfig = () => {
    ToolUtils.deleteFolderRecursive(xlsx2jsonPath + "/excel");
    ToolUtils.copyDir(configPath, xlsx2jsonPath + "/excel");
}

let deleteExport = () => {
    ToolUtils.deleteFolderRecursive(exportPath);
};
let exeExportSh = () => {
    child_process.exec(xlsx2jsonPath + "/export.sh", (err, stdout, stderr) => {
        if (err) {
            console.log(stderr);
            console.log("执行export.sh出错!");
        } else {
            console.log(stdout);
            console.log("执行export.sh完毕!");
            remove_config_d_ts();
            // copyJsonToCsv();
        }
    });
}

let remove_config_d_ts = () => {
    let path = rootPath + "/client/config.d.ts";
    fs.access(path, (err) => {
        console.log(err ? '目录/文件不存在' : '文件存在,可以进行读写');
        if (!err) {
            console.error("删除config.d.ts");
            fs.unlink(path, (err1) => {
                if (!err1) make_config_d_ts();
            });
        } else {
            make_config_d_ts();
        }
    });
};

let make_config_d_ts = () => {
    let path = exportPath;
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            var curPath = path + "/" + file;
            if (file.indexOf("d.ts") != -1) {
                fs.readFile(curPath, "utf8", (err, data) => {
                    fs.writeFile(rootPath + "/client/config.d.ts", data, { 'flag': 'a' }, (err) => {
                        if (err) console.error("写入config.d.ts失败!");
                    });
                });
            }
        });
        copyJsonToCsv();
    }
};

let copyJsonToCsv = () => {
    console.error("拷贝json文件到csv成功！111");
    var csvPath = rootPath + "/client/assets/resources/csv";
    if (fs.existsSync(exportPath)) {
        fs.readdirSync(exportPath).forEach(function (file) {
            var curPath = exportPath + "/" + file;
            if (file.indexOf("d.ts") != -1) {
                fs.unlinkSync(curPath);
            }
        });
    }
    ToolUtils.copyDir(exportPath, csvPath);
    console.error("拷贝json文件到csv成功！");
    console.error("脚本执行完毕！");
}

let main = () => {
    copyConfig();
    deleteExport();
    exeExportSh();
}

main();