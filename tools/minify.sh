#!/bin/sh


version="v6";
lessc='/Users/guillaumebadin/Documents/pro/sdk/less.js/bin/lessc';
compressor="/usr/bin/java -jar bin/compiler.jar";
yuicompressor="/usr/bin/java -jar bin/yuicompressor-2.4.7.jar"
cssOption=""
jsOption=""


#CSS Optimisations
${lessc} ../public/stylesheets/lib/bootstrap.less ../public/stylesheets/main.css
${yuicompressor} ${cssOption}  ../public/stylesheets/main.css > ../public/stylesheets/main.${version}.css


# JS Optimisations
${compressor} ${jsOption} \
     ../public/javascripts/after/history.js \
     ../public/javascripts/after/webube.util.js \
     ../public/javascripts/after/jqFancyTransitions.1.8.min.js \
     ../public/javascripts/after/jquery.easing.1.3.js \
     ../public/javascripts/after/jquery.transit.js \
     ../public/javascripts/after/jquery.coda-slider-2.1.js > ../public/javascripts/after.${version}.js

