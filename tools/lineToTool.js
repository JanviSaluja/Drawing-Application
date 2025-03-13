//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the 
//pixel array.
function LineToTool(){
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;
    
    
    //available line thickness
    let thickness = [2,4,6,8,10,12,14,16,18,20];
    //current option. changes via the dropvox DOM event handler
    let selectedThickness = thickness[0];
    
	//draws the line to the screen 
	this.draw = function(){
        
        //change the thickness of the pen
        strokeWeight(selectedThickness);
        
		//only draw when mouse is clicked
		if(mouseIsPressed){
			//if it's the start of drawing a new line
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//save the current pixel Array
				loadPixels();
			}

			else{
				//update the screen with the saved pixels to hide any previous
				//line between mouse pressed and released
				updatePixels();
				//draw the line
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}

		else if(drawing){
			//save the pixels with the most recent line and reset the
			//drawing bool and start locations
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};

    this.populateOptions = function() {
        //generates the DOM dropdown box with thickness option
        let thicknessSelect = createSelect();
        for(let i=0; i<thickness.length; i++)
            {
                thicknessSelect.option(thickness[i]);
            }
        thicknessSelect.parent(select(".options"));
        thicknessSelect.changed(() => {
            selectedThickness = thicknessSelect.value();
        });
    }    
    
    //clear the options
    this.unselectTool = function() {
    updatePixels();
    //clear options
    select(".options").html("");
	};
}
