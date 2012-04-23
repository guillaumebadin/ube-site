#!/bin/sh


version="v12";
lessc='bin/less.js/bin/lessc';
compressor="/usr/bin/java -jar bin/compiler.jar";
yuicompressor="/usr/bin/java -jar bin/yuicompressor-2.4.7.jar"
cssOption=""
jsOption=""


#CSS Optimisations
${lessc} ../public/stylesheets/lib/bootstrap.less ../public/stylesheets/main.css
${yuicompressor} ${cssOption}  ../public/stylesheets/main.css > ../public/stylesheets/main.${version}.css


# JS Optimisations
${compressor} ${jsOption} \
     ../public/javascripts/after/jquery.history.js \
     ../public/javascripts/after/jquery.placeholder.js \
     ../public/javascripts/after/webube.util.js \
     ../public/javascripts/after/jquery.easing.1.3.js \
     ../public/javascripts/after/jquery.coda-slider-2.1.js > ../public/javascripts/after.${version}.js

