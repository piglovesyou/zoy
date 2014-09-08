#######################################################################
#
#
#
#######################################################################

USAGE_TEXT="\n
    ---- Pass one of them ---- \n\n\
    setup\n\
    setup_plovr\n\
    setup_closurelibrary\n\
    setup_closurestylesheets\n\
    setup_closuretemplates\n\
    cleanup_lib\n\
    soyweb\n\
    serve\n\
    build\n\
    extract_msg\n\
        \n"

LIBS_DIR=libs/

PLOVR_DIR=${LIBS_DIR}plovr/
PLOVR_REMOTE_DIR=http://plovr.googlecode.com/files/
PLOVR_JAR=plovr-81ed862.jar
PLOVR_JAR_PATH=${PLOVR_DIR}${PLOVR_JAR}

PLOVR_PATH=node_modules/plovr/bin/plovr

CLOSURELIBRARY_DIR=${LIBS_DIR}closure-library/
CLOSURELIBRARY_REMOTE_DIR=http://closure-library.googlecode.com/svn/trunk/

CLOSURESTYLESHEETS_JAR=closure-stylesheets-20111230.jar
CLOSURESTYLESHEETS_DIR=${LIBS_DIR}closure-stylesheets/
CLOSURESTYLESHEETS_REMOTE_DIR=https://closure-stylesheets.googlecode.com/files/
CLOSURESTYLESHEETS_JAR_PATH=${CLOSURESTYLESHEETS_DIR}${CLOSURESTYLESHEETS_JAR}

CLOSURETEMPLATES_DIR=${LIBS_DIR}closure-template/
CLOSURETEMPLATES_REMOTE_DIR=http://closure-templates.googlecode.com/files/
CLOSURETEMPLATES_FOR_JAVA=closure-templates-for-java-latest.zip
CLOSURETEMPLATES_FOR_JS=closure-templates-for-javascript-latest.zip
CLOSURETEMPLATES_MSG_EXTRACTOR=closure-templates-msg-extractor-latest.zip
CLOSURETEMPLATES_SOY_TO_JS_JAR=SoyToJsSrcCompiler.jar 
CLOSURETEMPLATES_SOY_MSG_EXTRACTOR_JAR=SoyMsgExtractor.jar

CLOSURECOMPILER_DIR=${LIBS_DIR}closure-compiler/
CLOSURECOMPILER_REMOTE_DIR=http://dl.google.com/closure-compiler/
CLOSURECOMPILER_ZIP=compiler-latest.zip



cleanup_lib() {
    mkdir ${LIBS_DIR} > /dev/null 2>&1
}

setup_plovr() {
    rm -rf ${PLOVR_DIR}
    wget -P ${PLOVR_DIR} ${PLOVR_REMOTE_DIR}${PLOVR_JAR}
}

setup_closurelibrary() {
    rm -rf ${CLOSURELIBRARY_DIR}
    (cd ${LIBS_DIR} && svn co ${CLOSURELIBRARY_REMOTE_DIR} closure-library)
}

setup_closurestylesheets() {
    rm -rf ${CLOSURESTYLESHEETS_DIR}
    wget -P ${CLOSURESTYLESHEETS_DIR} --no-check-certificate ${CLOSURESTYLESHEETS_REMOTE_DIR}${CLOSURESTYLESHEETS_JAR}
}

wget_unzip_rm() {
    # $1: remote dir
    # $2: zip file name
    # $3: dir extracting into
    wget ${1}${2}
    mkdir -p $3
    unzip -d $3 $2
    rm $2
}

setup_closuretemplates() {
    rm -rf ${CLOSURETEMPLATES_DIR}
    wget_unzip_rm $CLOSURETEMPLATES_REMOTE_DIR $CLOSURETEMPLATES_FOR_JAVA ${CLOSURETEMPLATES_DIR}java
    wget_unzip_rm $CLOSURETEMPLATES_REMOTE_DIR $CLOSURETEMPLATES_FOR_JS ${CLOSURETEMPLATES_DIR}js
    wget_unzip_rm $CLOSURETEMPLATES_REMOTE_DIR $CLOSURETEMPLATES_MSG_EXTRACTOR ${CLOSURETEMPLATES_DIR}msg

    # wget -P ${CLOSURETEMPLATES_DIR} ${CLOSURETEMPLATES_REMOTE_DIR}${CLOSURETEMPLATES_FOR_JAVA}
    # unzip -d ${CLOSURETEMPLATES_DIR}java ${CLOSURETEMPLATES_DIR}${CLOSURETEMPLATES_FOR_JAVA}
    # rm ${CLOSURETEMPLATES_DIR}${CLOSURETEMPLATES_FOR_JAVA}
    # wget -P ${CLOSURETEMPLATES_DIR} ${CLOSURETEMPLATES_REMOTE_DIR}${CLOSURETEMPLATES_FOR_JS}
    # unzip -d ${CLOSURETEMPLATES_DIR}js ${CLOSURETEMPLATES_DIR}${CLOSURETEMPLATES_FOR_JS}
    # rm ${CLOSURETEMPLATES_DIR}${CLOSURETEMPLATES_FOR_JS}
    # wget -P ${CLOSURETEMPLATES_DIR} ${CLOSURETEMPLATES_REMOTE_DIR}${CLOSURETEMPLATES_MSG_EXTRACTOR}
    # unzip -d ${CLOSURETEMPLATES_DIR}msg ${CLOSURETEMPLATES_DIR}${CLOSURETEMPLATES_MSG_EXTRACTOR}
    # rm ${CLOSURETEMPLATES_DIR}${CLOSURETEMPLATES_MSG_EXTRACTOR}
}

setup_closurecompiler() {
    wget_unzip_rm $CLOSURECOMPILER_REMOTE_DIR $CLOSURECOMPILER_ZIP $CLOSURECOMPILER_DIR
}

soyfiles() {
    find "public/app/soy/" -name "*.soy"
}

extract_msg() {
    java -jar \
        ${CLOSURETEMPLATES_DIR}msg/${CLOSURETEMPLATES_SOY_MSG_EXTRACTOR_JAR} \
        --sourceLocaleString en \
        --outputFile extracted_en.xlf $(soyfiles)
    [ $? -eq 0 ] && echo "created."
}



case $1 in

    setup)
        cleanup_lib
        setup_plovr
        setup_closurelibrary
        setup_closurestylesheets
        setup_closuretemplates
        setup_closurecompiler
        ;;

    cleanup_lib) cleanup_lib;;

    setup_plovr) setup_plovr;;

    setup_closurelibrary) setup_closurelibrary;;

    setup_closurestylesheets) setup_closurestylesheets;;

    setup_closuretemplates) setup_closuretemplates;;

    setup_closurecompiler) setup_closurecompiler;;

    soyweb) ${PLOVR_PATH} soyweb --dir ./public;;

    extract_msg) extract_msg;;


    build) java -classpath java/my-soy-function.jar:node_modules/plovr/bin/plovr.jar org.plovr.cli.Main build plovr.json;;

    serve) java -classpath java/my-soy-function.jar:node_modules/plovr/bin/plovr.jar org.plovr.cli.Main serve plovr.json;;

    compile_soyfunction)
        mkdir -p ./java/classes
        javac -d ./java/classes \
              -sourcepath ./java/src \
              -classpath ./node_modules/soynode/node_modules/closure-templates/SoyToJsSrcCompiler.jar \
              -Xlint:deprecation \
              ./java/src/com/piglovesyou/soy/function/SoyFunctionsModule.java
        PWD=`pwd`
        cd java/classes
        jar cvf ../my-soy-function.jar ./com
        ;;

    *) echo -e $USAGE_TEXT;;

esac

