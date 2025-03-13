function FreehandTool(){
	//set an icon and a name for the object
	this.icon = "assets/freehand.png";
	this.name = "freehand";

	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;
    
    //available line thickness
    let thickness = [2,4,6,8,10,12,14,16,18,20];
    //current option. changes via the dropvox DOM event handler
    let selectedThickness = thickness[0];

	this.draw = function(){
        
        //change the thickness of the pen
        strokeWeight(selectedThickness)
        
		//if the mouse is pressed
		if(mouseIsPressed){
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		//try and comment out these lines and see what happens!
		else{
			previousMouseX = -1;
			previousMouseY = -1;
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