#!/usr/bin/env node

var data    = require('./data.js');
var program = require('commander');
var colors  = require('colors');

program
    .version('0.0.3')
    .parse(process.argv);

// Remove node arguments
process.argv.splice(0, 2);

process.argv.forEach(function(word) {
    var output = colors.white(word.toUpperCase() + ' => ');
    if (is_reserved(word)) {
        output += colors.red('reserved');
    } else if (is_keyword(word)) {
    	output += colors.yellow('keyword');
    } else {
        output += colors.green('not reserved');
    }
    console.log(output);
});

function is_reserved(word) {
    return (data.reserved.indexOf(word.toUpperCase()) != -1);
}

function is_keyword(word) {
	return (data.keywords.indexOf(word.toUpperCase()) != -1);
}