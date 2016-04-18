(function(){
	'use strict';
	var app = angular.module('client', []);

	app.controller('CanvasController', function() {
    			var canvas = document.getElementById('hexCanvas');
            	var ctx = canvas.getContext('2d');

            	var mousePressed = false;
            	var isDragging = false;
    			var originX = 0;
    			var originY = 0;
    			var clickX = 0;
    			var clickY = 0;
    			var moveX = 0;
    			var moveY = 0;

    			// resize the canvas to fill browser window dynamically
    			window.addEventListener('resize', resizeCanvas, false);

    			window.addEventListener('mousedown', function(event){
    				mousePressed = true;
    				clickX = event.pageX;
    				clickY = event.pageY;
    			});

    			window.addEventListener('mouseup', function(){
    				mousePressed = false;
    				clickX = 0;
    				clickY = 0;
    				originX += moveX;
    				originY += moveY;
    				moveX = 0;
    				moveY = 0;
    			});

    			window.addEventListener('mousemove', function(event) {
    				if (mousePressed === true) {
    					isDragging = true; //for later click detection
    					moveX = event.pageX - clickX;
    					moveY = event.pageY - clickY;
    					drawStuff();
    				}
    			});

    			// window.addEventListener('keydown', function (event) {
    			// 	drawStuff();
    			// });

    			// window.addEventListener('keyup', function () {
    			// });

    			function resizeCanvas() {
    	        	canvas.width = window.innerWidth;
	            	canvas.height = window.innerHeight;
            		drawStuff(); 
    			}
    			resizeCanvas();

    			

    			function drawStuff() {
					ctx.clearRect(0, 0, canvas.width, canvas.height);

					var x = originX + moveX;
					var y = originY + moveY;

					for (var i = 0; i < 47; i++) {
						for (var j = 0; j < 47; j++) {
							switch((i+j)%7){
								case 0: ctx.fillStyle="red";
								break;

								case 1: ctx.fillStyle="orange";
								break;

								case 2: ctx.fillStyle="yellow";
								break;

								case 3: ctx.fillStyle="green";
								break;

								case 4: ctx.fillStyle="blue";
								break;

								case 5: ctx.fillStyle="indigo";
								break;

								case 6: ctx.fillStyle="purple";
								break;

								default: ctx.fillStyle="black";
								break;
							}
							if (i%2 === 0) {
								ctx.fillRect(x+(i*50), y+25+(j*50), 50, 50);
							}
							else {	
								ctx.fillRect(x+(i*50), y+(j*50), 50, 50);
							}

						}
					}
    			}
			})();
})();