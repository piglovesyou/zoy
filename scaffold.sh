#!/bin/sh

while getopts i: OPT
do
  case $OPT in
    "i" ) INHERIT="$OPTARG" ;;
  esac
done
shift `expr $OPTIND - 1`

if [[ "$INHERIT" == "" || "$@" == "" ]]; then
    echo USAGE: $ ./scaffold.sh -i goog.ui.InputDatePicker zoy.primitive.device.InputDatePicker
    exit 1
fi

for TARGET in $@; do

    ################################
    # Prepare directory
    P=$(echo $TARGET | sed -e 's/\./\//g')
    B=$(basename $P)
    mkdir -p $P

    ################################
    # Generate JavaScript
    cat <<__EOT__ > $P/$B.js 2>&1
goog.provide('$TARGET');

goog.require('zoy.BaseInterface');
goog.require('$INHERIT');

/**
 * @constructor
 * @extends {$INHERIT}
 * @implements {zoy.BaseInterface}
 */
$TARGET = function(data) {
  goog.base(this);

  this.data = data;
};
goog.inherits($TARGET, $INHERIT);
__EOT__
    # Then require it
    if ! grep -Fq $TARGET ./zoy/all.js; then
        cat <<__EOT__ >> ./zoy/all.js

goog.require('$TARGET');
goog.exportSymbol('$TARGET', $TARGET);
__EOT__
    fi

    ################################
    # Generate  Soy
    cat <<__EOT__ > $P/$B.soy 2>&1
{namespace $TARGET.soy}

/**
 * @param context
 * @param id
 */
{template .main}
  {let \$self: \$context[\$id] /}
  <div {call zoy.common.soy.attribute data="all" /}'>
    {call zoy.common.soy.appendChildren data="all" /}
  </div>
{/template}
__EOT__

    # There must be an inserting point in factory.soy
    INSERT_POINT='inserting point by scaffold.sh'
    if ! grep -Fq "$INSERT_POINT" ./zoy/factory.soy; then
        echo "There is no inserting point in scaffold.sh"
        exit 1
    fi

    # Append calling new soy
    if ! grep -Fq $TARGET ./zoy/factory.soy; then
        INSERT_STRING="    {case '${TARGET}'} {call ${TARGET}.soy.main data=\"all\" /}"
        echo $INSERT_POINT
        sed -i "/${INSERT_POINT}/a  ${INSERT_STRING}" ./zoy/factory.soy
    fi

    ################################
    # Generate Stylus
    cat <<__EOT__ > $P/$B.styl 2>&1
// write style
__EOT__
    # Then import it
    STYLUS_PATH=$(echo $P | sed -e 's/^zoy\///g')
    if ! grep -Fq ${STYLUS_PATH} ./zoy/all.styl; then
        echo @import \'$STYLUS_PATH\' >> ./zoy/all.styl
    fi

done
