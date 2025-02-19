/*
game.js for Perlenspiel 3.3.x
Last revision: 2018-10-14 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-18 Worcester Polytechnic Institute.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with the Perlenspiel devkit. If not, see <http://www.gnu.org/licenses/>.
*/

/*
This JavaScript file is a template for creating new Perlenspiel 3.3.x games.
By default, all event-handling function templates are COMMENTED OUT (using block-comment syntax), and are therefore INACTIVE.
Uncomment and add code to the event handlers required by your project.
Any unused event-handling function templates can be safely deleted.
Refer to the tutorials and documentation at <https://ps3.perlenspiel.net> for details.
*/

/*
The following comment lines are for JSHint <https://jshint.com>, a tool for monitoring code quality.
You may find them useful if your development environment is configured to support JSHint.
If you don't use JSHint (or are using it with a configuration file), you can safely delete these lines.
*/

/* jshint browser : true, devel : true, esversion : 5, freeze : true */
/* globals PS : true */

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/
let colors = [PS.COLOR_RED, PS.COLOR_ORANGE, 
	PS.COLOR_YELLOW, PS.COLOR_GREEN, PS.COLOR_BLUE,PS.COLOR_VIOLET] //colors to cycle through

let colIndex = 0 //index within colors array
let clicked = false //is mouse held?
let DIM = 10 //grid size

var me = ( function () {

	var exports = {
   
	init : function () {
		PS.gridSize( DIM, DIM ); // init grid
		
		PS.gridColor( PS.COLOR_WHITE );
		
		PS.statusColor( PS.COLOR_VIOLET );
		PS.statusText( "Click and Drag to Draw" );
		
		PS.color(PS.ALL, PS.ALL, colors[0]);
		PS.alpha(PS.ALL, PS.ALL, 0);
		PS.data(PS.ALL, PS.ALL, [colors[0], 0]); //current color and current color number
		PS.border(PS.ALL, PS.ALL, 0);
		PS.border(PS.ALL, 0, {top: 1});
		PS.border(0, PS.ALL, {left: 1});
		PS.border(DIM - 1, PS.ALL, {right: 1});
		PS.border(PS.ALL, DIM - 1, {bottom: 1});

		
	} 	
};
	
	// Return the 'exports' object as the value
	// of this function, thereby assigning it
	// to the global G variable. This makes
	// its properties visible to Perlenspiel.
   
	return exports;
   } () );

PS.init = me.init;

/*
PS.touch ( x, y, data, options )
Called when the left mouse button is clicked over bead(x, y), or when bead(x, y) is touched.
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.touch = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!	

	clicked = true;

};

/*
PS.release ( x, y, data, options )
Called when the left mouse button is released, or when a touch is lifted, over bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.release() event handler:



PS.release = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!
	clicked = false;
};



/*
PS.enter ( x, y, button, data, options )
Called when the mouse cursor/touch enters bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.enter() event handler:



PS.enter = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	//closest neighbors to current cell mouse is in
	var neighbors = [];
	var tleft = {x: -1, y: -1}; 
	var t = {x: 0, y: -1}; 
	var tright = {x: 1, y: -1}; 
	var left = {x: -1, y: 0};  
	var right = {x: 1, y: 0}; 
	var bright = {x: -1, y: 1}; 
	var b = {x: 0, y: 1}; 
	var bleft = {x: 1, y: 1}; 
	neighbors.push(tleft, t, tright, left, right, bright, b, bleft);

	//only change colors when mouse is held down
	if(!clicked){
		return;
	}

	//error checking for grid bounds
	if(x >= 0 && y >= 0 && x <= DIM && y <= DIM){
		var mainIndex = PS.data(x, y)[1];
		//gradually increase opacity of main cell 
		var a = PS.alpha(x, y) + 75 < 255? PS.alpha(x, y) + 75 : 255; 
		var mainA = (mainIndex == colors.length - 1 ? 255 : a);
		PS.alpha(x, y, mainA);
		
	}
	

	//neighbors
	neighbors.forEach((el) => {
		var nX = x + el.x;
		var nY = y + el.y;

		
		if(nX >= 0 && nY >= 0 && nX < DIM && nY < DIM){
			//var currentColor = PS.data(nX, nY)[0];
			var colorIndex = PS.data(nX, nY)[1];
			
			//PS.debug("width: " + PS.gridSize().width);
			//PS.debug("x: " + nX + " y: " + nY + " ");
			var al = PS.alpha(nX, nY); //current neighbor alpha
			var newAl = 0;
			
			if(al + 20 < 255){ //stay same color and increase opacity at lesser rate than main cell
				newAl = al + 20;
			} else { //time to change color of that cell
				colorIndex++;
				//error checking grid size
				if(nX >= 0 && nY >= 0 && nX <= DIM && nY <= DIM){
					PS.data(nX, nY, [colors[colorIndex], colorIndex]); //udpate cell data with new color
				}

				PS.color(nX, nY, colors[colorIndex]);
				newAl = (colorIndex == colors.length - 1 ? 255 : 20);
				//newAl = 20;
			}

			PS.alpha(nX, nY, newAl);	
				
		}
		
	});

};



/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.exit() event handler:



PS.exit = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!
	// if(colIndex){
	// 	channel = PS.audioPause( channel ); // restart it

	// }
};



/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.exitGrid() event handler:

/*

PS.exitGrid = function( options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.
};

*/

/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.keyDown() event handler:

/*

PS.keyDown = function( key, shift, ctrl, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is pressed.
};

*/

/*
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.keyUp() event handler:

/*

PS.keyUp = function( key, shift, ctrl, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.
};

*/

/*
PS.input ( sensors, options )
Called when a supported input device event (other than those above) is detected.
This function doesn't have to do anything. Any value returned is ignored.
[sensors : Object] = A JavaScript object with properties indicating sensor status; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: Currently, only mouse wheel events are reported, and only when the mouse cursor is positioned directly over the grid.
*/

// UNCOMMENT the following code BLOCK to expose the PS.input() event handler:

/*

PS.input = function( sensors, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code lines to inspect first parameter:

//	 var device = sensors.wheel; // check for scroll wheel
//
//	 if ( device ) {
//	   PS.debug( "PS.input(): " + device + "\n" );
//	 }

	// Add code here for when an input event is detected.
};

*/

/*
PS.shutdown ( options )
Called when the browser window running Perlenspiel is about to close.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: This event is generally needed only by applications utilizing networked telemetry.
*/

// UNCOMMENT the following code BLOCK to expose the PS.shutdown() event handler:

/*

PS.shutdown = function( options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to verify operation:

	// PS.debug( "“Dave. My mind is going. I can feel it.”\n" );

	// Add code here to tidy up when Perlenspiel is about to close.
};

*/
