#!/bin/bash
# /Applications/CocosCreator.app/Contents/MacOS/CocosCreator --path "./" --build "startScene=de6d47e5-011f-4c10-a385-1cd318777662"

# DIR="$( cd "$( dirname "$0"  )" && pwd  )"
# echo $0
# echo $dirname

# echo "Shell 传递参数实例！";
# echo "执行的文件名：$0";
# echo "第一个参数为：$1";
# echo "第二个参数为：$2";
echo "------------> 开始构建";
echo ""

/Applications/CocosCreator.app/Contents/MacOS/CocosCreator --path "../" --build "platform=wechatgame"

echo ""
echo "-------------> 构建结束";
echo ""

# echo "开始执行压缩图片脚本";
# node ./MakeTinify.js