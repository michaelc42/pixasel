/* Pop up click box for header.
 * 
$(document).ready(function() {
	console.log("ready!");
	var header = $("#mainheader");
	console.log(header.html());
	header.html("Goodbye");
	console.log(header.html());
	
	header.on("click", function() {
		console.log("You clicked the header!");
	});
	
	header.hover(
		function(e) {
			var $newElem = $("<div><p>You clicked here.</p></div>");
			$newElem.attr("class", "clickbox");
			$(this).mousemove(
				function(e){
					$newElem.css({
						top: e.pageY-74,
						left: e.pageX+10
					});
				}
			);
			
			$newElem.appendTo(".container");
		},
		function(e) {
			console.log("Hover out");
			console.log(e.pageX + " " + e.pageY);
			$(".clickbox").delay(100).fadeOut(200);
		}
	);
	
	$(document).click(
		function(e) {
			var $newElem = $("<div>You clicked here.</div>");
			$newElem.attr("class", "clickbox");
			$newElem.css({
				top: e.pageY,
				left: e.pageX+20
			});
			
			$newElem.appendTo(".container");
			
			$newElem.delay(200).slideUp(200);
		}
	);		
});
*/
/* Using the module pattern with jQuery */
/*
$(document).ready(function() {
	var feature = (function() {
		var name = "Mike";
		var age = 24;
		
		var sayName = function() {
			console.log(name);
		};
		
		var sayAge = function() {
			console.log(age);
		};
		
		return { //returns this object with these functions publicly accessible
			sayName: sayName,
			sayAge: sayAge
		};
	})(); //remember the last to parantheses
	
	feature.sayName();
	feature.sayAge();
	console.log(feature);
}); 
*/

$(document).ready(function() {
	var pixasel = (function() {
		var overlay = $("#pixasel #overlay");
		var container = $("#pixasel");
		var pics = $("#pixasel ul li img"); //array of picture objects
		var picInx = 0;	//picture index
		var buttons = $("#buttons");
		var nextBut;
		var prevBut;
		var height = pics.height();
		var width = pics.width();
		
		var init = function() {
			//DEBUG CODE
			console.log(buttons.children());
			
			//makes it so it will be visible after all the images load
			pics.css("visibility", "visible");
			
			overlay.css({
				visibility: "visible",
				bottom: 0,
				width: width,
				height: height/5
			});
			
			$.each(buttons.children(), function() {
				$(this).css({
					height: height/2.4,
					width: width/12
				});
			});
			
			container.css({
				
				width: pics.width(),
				height: pics.height()
			}); //set max width of container			
						
			buttons.css("visibility", "visible");
			hideOverlay();
			//buttons.hide();
			//hide pics initially
			hideAllPics();
			//show first pic
			showNextPic();
			//bind the buttons
			bindButtons();
			
			container.hover(showOverlay, hideOverlay);
			
			//move arrow when button hovered
			nextBut.hover( function() {
					console.log($(".right_arrow"));
					$(".right_arrow").css({
						left: width/40
					});
				}, function() {
					$(".right_arrow").css({
						left: width/96
					});
				}
			);
			prevBut.hover( function() {
					console.log($(".right_arrow"));
					$(".left_arrow").css({
						right: width/40
					});
				}, function() {
					$(".left_arrow").css({
						right: width/96
					});
				}
			);
			
		};
		
		//make next and previous buttons on pictures
		var bindButtons = function() {
	
			//use this calculation to change button position
			var buttonPos = height/5;
			//console.log(buttonPos);
			prevBut = $("#pixasel #prev");
			nextBut = $("#pixasel #next");
			prevBut.css({
				top: buttonPos,
				left: 0
			});
			nextBut.css({
				top: buttonPos,
				right: 0
			});
			nextBut.on("click", nextPic);
			prevBut.on("click", prevPic);
			
			nextBut.children(".right_arrow").css({
				left: width/96,
				borderTop : width/24+"px solid transparent",
				borderBottom : width/24+"px solid transparent",
				borderLeft : width/24+"px solid black"
			});
			prevBut.children(".left_arrow").css({
				right: width/96,
				borderTop : width/24+"px solid transparent",
				borderBottom : width/24+"px solid transparent",
				borderRight : width/24+"px solid black"

			});
						
		};
		
		//initially hide all pics
		var hideAllPics = function() {
			$.each(pics, function() {
				$(this).hide();
			});
		}
		
		var showNextPic = function() {
			$(pics[picInx]).fadeIn(300); //edit here to control animations
			changeCaption();
		};
		
		var hideLastPic = function() {
			$(pics[picInx]).hide();
		};
		
		var changeCaption = function() {
			var cap = $(pics[picInx]).attr("caption");
			$("#pixasel #overlay p").html(cap);
		};
		
		//Change index when a button is clicked
		var nextPic = function() {
			hideLastPic();
			if(picInx === pics.length-1) {
				picInx = 0;
			} else {
				picInx += 1;
			}
			showNextPic();
			console.log("Pic index is now: " +picInx);
		};
		
		var prevPic = function() {
			hideLastPic();
			if(picInx === 0) {
				picInx = pics.length-1;
			} else {
				picInx -= 1;
			}
			showNextPic();
			console.log("Pic index is now: " +picInx);
		};
		
		/* functions for the overlay */
		var hideOverlay = function() {
			overlay.delay(500).slideUp(200);
			hideButtons();
		};
		
		var showOverlay = function() {
			overlay.slideDown(200);
			showButtons();
		};
		
		/* functions for next a prev button */
		var showButtons = function() {
			buttons.fadeIn(200);
		};
		var hideButtons = function() {
			buttons.delay(500).fadeOut(200);
		};
		
		return { //returns this object with these functions publicly accessible
			init: init
		};
	})(); //remember the last to parantheses
	
	pixasel.init();
});
