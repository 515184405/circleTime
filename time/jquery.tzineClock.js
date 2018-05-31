/*!
 * jquery.tzineClock.js - Tutorialzine Colorful Clock Plugin
 *
 * Copyright (c) 2009 Martin Angelov
 * http://tutorialzine.com/
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Launch  : December 2009
 * Version : 1.0
 * Released: Monday 28th December, 2009 - 00:00
 */

(function($){
	
	// A global array used by the functions of the plug-in:
	var gVars = {},opts;

	// Extending the jQuery core:
	$.fn.tzineClock = function(opt){
	
		// "this" contains the elements that were selected when calling the plugin: $('elements').tzineClock();
		// If the selector returned more than one element, use the first one:
		
		var container = this;
	
		if(!container)
		{
			try{
				console.log("Invalid selector!");
			} catch(e){}
			
			return false;
		}
		
		if(!opt) opt = {}; 
		
		var defaults = {
			colors : ['circle1','circle2','circle3','circle4'],
                //圆内显示的文本
            words : ['Days','Hours','Minutes','Seconds']
			/* Additional options will be added in future versions of the plugin. */
		};
		
		/* Merging the provided options with the default ones (will be used in future versions of the plugin): */
		opts = $.extend({},defaults,opt);

		// Calling the setUp function and passing the container,
		// will be available to the setUp function as "this":
		setUp.call(container);
		
		return this;
	}
	
	function setUp()
	{
		// The colors of the dials:
		//判断是否为ie浏览器
        var isIE = function() { //ie?
            if (!!window.ActiveXObject || "ActiveXObject" in window){
                return true;
            }else{
                return false;
            }
        }
		var tmp;
		for(var i=0;i<opts.colors.length;i++)
		{
			// Creating a new element and setting the color as a class name:
			
			tmp = $('<div>').attr('class',opts.colors[i]+' clock').html(
				'<div class="display"></div>'+

				'<div class="date-word">'+opts.words[i]+'</div>'+

				'<div class="front left"></div>'+
				
				'<div class="rotate left">'+
					'<div class="bg left"></div>'+
				'</div>'+
				
				'<div class="rotate right">'+
					'<div class="bg right"></div>'+
				'</div>'
			);
			// Appending to the container:
			$(this).append(tmp);

			if(isIE()){
	            tmp.css({
	               'background':tmp.find('.bg.left').css('background-image')
	            })
				tmp.find('.front').remove();
				tmp.find('.bg').remove();
			}
		}

		

		// 兼容safari浏览器
		function getTs(time){
			var arr = time.split(/[- :]/),
				_date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]),
				timeStr = Date.parse(_date)
			return timeStr
		}

		var _self = $(this);
		var dateArr = [];
		for(var i =0; i < _self.length; i++){
			var currentElement = $(_self[i]);
			var dateTime = $(_self[i]).attr('data-time');
			var type = $(_self[i]).attr('data-type');
			var leftDate = getTs(dateTime);
			(function(currentElement,leftDate,type){

				var timer = setInterval(function(){
				var currentDate = +(new Date());
				var times = leftDate - currentDate;
				if(type == 'time'){
					currentElement.children('.circle1').remove();
					h = parseInt(times/1000/60/60);
					m = parseInt(times/1000/60%60);
					s = parseInt(times/1000%60);
					animation(currentElement.children('.circle4'), s, 60);
					animation(currentElement.children('.circle3'), m, 60);
					animation(currentElement.children('.circle2'), h, 24);
				}else{
					d = parseInt(times/1000/60/60/24);
					h = parseInt(times/1000/60/60%24);
					m = parseInt(times/1000/60%60);
					s = parseInt(times/1000%60);
					animation(currentElement.children('.circle4'), s, 60);
					animation(currentElement.children('.circle3'), m, 60);
					animation(currentElement.children('.circle2'), h, 24);
					animation(currentElement.children('.circle1'), d, 365);
				}
				
			},1000);

			})(currentElement,leftDate,type)
		}
	}
	
	function animation(clock, current, total)
	{
		// Calculating the current angle:
		var angle = (360/total)*(current);
		if(current > total){
			angle = 360;
		}
		clock.rotateLeft = clock.children('.rotate.left');
		clock.rotateRight = clock.children('.rotate.right');
		clock.display = clock.children('.display');
	
		var element;

		if(current==0)
		{
			// Hiding the right half of the background:
			clock.rotateRight.hide();
			
			// Resetting the rotation of the left part:
			rotateElement(clock.rotateLeft,0);
		}
		if(angle<=180)
		{
			// The left part is rotated, and the right is currently hidden:
			element = clock.rotateLeft;
			clock.rotateRight.hide();
		}
		else
		{
			// The first part of the rotation has completed, so we start rotating the right part:
			clock.rotateRight.show();
			clock.rotateLeft.show();
			
			rotateElement(clock.rotateLeft,180);
			
			element = clock.rotateRight;
			angle = angle-180;
		}

		if(current <= 0){
			clock.display.html('00');
			return;
		}
		rotateElement(element,angle);
		
		// Setting the text inside of the display element, inserting a leading zero if needed:
		clock.display.html(current<10?'0'+current:current);
	}
	
	function rotateElement(element,angle)
	{
		// Rotating the element, depending on the browser:
		var rotate = 'rotate('+angle+'deg)';
		
		if(element.css('MozTransform')!=undefined)
			element.css('MozTransform',rotate);
			
		else if(element.css('WebkitTransform')!=undefined)
			element.css('WebkitTransform',rotate);
	
		// A version for internet explorer using filters, works but is a bit buggy (no surprise here):
		else if(element.css("filter")!=undefined)
		{
			var cos = Math.cos(Math.PI * 2 / 360 * angle);
			var sin = Math.sin(Math.PI * 2 / 360 * angle);
			
			element.css("filter","progid:DXImageTransform.Microsoft.Matrix(M11="+cos+",M12=-"+sin+",M21="+sin+",M22="+cos+",SizingMethod='auto expand',FilterType='nearest neighbor')");
	
			element.css("left",-Math.floor((element.width()-100)/2));
			element.css("top",-Math.floor((element.height()-100)/2));
		}
	
	}
	
})(jQuery)