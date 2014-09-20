#!/bin/sh

while getopts i: OPT
do
  case $OPT in
    "i" ) INHERIT="$OPTARG" ;;
  esac
done

shift `expr $OPTIND - 1`

# for TARGET in $@
# do
#     PATH=`echo $TARGET | sed -e 's/\./\//g'` 
#     mkdir -p $PATH
#     echo $PATH
# done

for TARGET in $@; do

    P=$(echo $TARGET | sed -e 's/\./\//g') 
    B=$(basename $P)
    mkdir -p $P
    
    # JavaScript
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
    # And require it
    if ! grep -Fq $TARGET ./zoy/all.js; then
        cat <<__EOT__ >> ./zoy/all.js
            
goog.require('$TARGET');
goog.exportSymbol('$TARGET', $TARGET);
__EOT__
    fi

    # Soy
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

    # Stylus
    cat <<__EOT__ > $P/$B.styl 2>&1
// write style
__EOT__
    STYLUS_PATH=$(echo $P | sed -e 's/^zoy\///g')
    if ! grep -Fq ${STYLUS_PATH} ./zoy/all.styl; then
        echo @import \'$STYLUS_PATH\' >> ./zoy/all.styl
    fi

done
