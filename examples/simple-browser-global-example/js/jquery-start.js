$(function() {
	prettyPrint();

	var simpleObj = window['simpleObj'];

	$('#btnCallMethodA').click(function() {
		simpleObj.methodA(1, 2);
	})
	
	$('#btnCallMethodB').click(function() {
		simpleObj.methodB(1, (function() {}), ['a', 'b', 'c'], undefined, null);
	})

})