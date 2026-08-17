#!/bin/sh 
cd `dirname $0`;
cd ../build/wechatgame/

ROOT_PATH=./
TMP_ZIP_FILE=temp.tar.gz; 
echo pwd : $(pwd)
# tar -zcvf./${TMP_ZIP_FILE} ../build/wechatgame/res
zip -r ${ROOT_PATH}${TMP_ZIP_FILE} ${ROOT_PATH}res
echo release tar.gz OK
MD5=$(md5 -q ${ROOT_PATH}${TMP_ZIP_FILE}); 
DATE=$(date +%Y%m%d%H%M%S);  
echo FINAL FILE : [res_${DATE}_${MD5}.zip]; 
mv ${ROOT_PATH}${TMP_ZIP_FILE} ${ROOT_PATH}res_${DATE}_${MD5}.zip;

#######
# ftp -niv <<- EOF
# open cdnupload.boomegg.cn
# user mini 459982da9a1b4421122e5dda1880e420
# binary
# prompt
# echo push file to FTP : [cdn_${DATE}_${MD5}.zip]; 
# put cdn_${DATE}_${MD5}.zip cdn_${DATE}_${MD5}.zip
# close
# bye
# EOF
#######

# rm -rf ./cdn_${DATE}_${MD5}.zip;

echo DONE!