/*
* File : ColumnLayout JS
* @author : Harsh Kothari
* 
* Editted by : Dishant Chavda
* date : 11-01-2016
*/

var wrapperWidth = 0;
var qsbWidth = 0; 
var blocks = [];
var index = 0;
var minHeight = 0;
var margin = 20;
var colCount = 0;
var start = 0;

/* 
 This is count block function. The main task of this function to decide
 how many block will be needed.
*/
var countBlock = function(){
	wrapperWidth = $('.wrapper').outerWidth();
	qsbWidth = $('.qsb').outerWidth();
	colCount = Math.floor( wrapperWidth/(qsbWidth + margin) );

	// Find middle point
	var middleWidth = $(window).width() / 2;
	console.log(middleWidth);
	// Find even or odd Block
	var isEven = colCount % 2 == 0;

	if(isEven){
		var half = colCount / 2;
		start = ( margin / 2 ) + ( half * ( qsbWidth + margin ) ) - margin;
		start = middleWidth - start;
	}
	else{
		var half = parseInt(colCount / 2);
		start = ( qsbWidth / 2 ) + ( half * ( qsbWidth + margin ) );
		start = middleWidth - start;
	}

	for( var i = 0; i < colCount; i++ )
		blocks[i] = 60;
	// set blocks according to x and y coordinated calculated
	setBlocks();
	// get height of the parent div and than set it so it do not collapse and hide other divs bellow it.
	var wrapperHeight = Math.max.apply(Math, blocks);
	$(".wrapper").css("height",wrapperHeight + 'px');
}

/* 
 Main task of this function is to set the block properly
*/

var setBlocks = function(){
	$('.qsb').each(function(){

		min = Math.min.apply(Math, blocks);
		index = $.inArray(min, blocks);
		var left = ( index * (qsbWidth + margin) ) + start ;
		var top = min + margin;

		if( index == 0 )
			left = start;
		$(this).css({
			'top' : top + 'px',
			'left' : left + 'px'
		})
		blocks[index] = top + $(this).outerHeight();
	})
}
