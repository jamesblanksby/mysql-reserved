#!/usr/bin/env node

var data    = require('./data.js');
var program = require('commander');
var term    = require('terminal-kit').terminal;

var count = []
	count['reserved']   = 0;
	count['keyword']    = 0;
	count['unreserved'] = 0;

program
    .version('0.0.7')
    .parse(process.argv);

process.stdin.on('data', function (text) {
    var words = text.toString().replace('\n', '').split(' ');

    if (words[0] === '\\q' || words[0] === 'exit') {
    	term.white('\nSession Statistics\n');
    	term.red('Reserved: ');
    	term.column(13);
    	term.white(count['reserved'] + '\n');

    	term.yellow('Keyword: ');
    	term.column(13);
    	term.white(count['keyword'] + '\n');

    	term.green('Unreserved: ');
    	term.column(13);
    	term.white(count['unreserved'] + '\n\n');

    	process.exit();
    }

    term.previousLine(1);
    
    words.forEach(function(word) {
	    term.white(word.toUpperCase() + ' => ');
	    if (is_reserved(word)) {
	        term.red('reserved');
	        count['reserved']++;
	    } else if (is_keyword(word)) {
	    	term.yellow('keyword');
	    	count['keyword']++;
	    } else {
	        term.green('unreserved');
	        count['unreserved']++;
	    }
	    term('\n');
	});
});

function is_reserved(word) {
    return (data.reserved.indexOf(word.toUpperCase()) != -1);
}

function is_keyword(word) {
	return (data.keywords.indexOf(word.toUpperCase()) != -1);
}