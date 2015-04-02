/* game-engine/resources/js/scripts.js */
/* Written by, Sohail Qayum Malik[sqm@hackers.pk] */
 
function drawLine(cxt, x1, y1, x2, y2, color)  {

  var x, y, dx, dy, d, ystep, tmp, steep;   
  
  //This algorithm only deals with lines having shallow slopes. When a line has steep slope then we take the advantage of the fact that steep line can be reflected across the line y = x
  steep = Math.abs(y2 - y1) > Math.abs(x2 - x1); 	  
   
  if ( Math.abs(y2 - y1) > Math.abs(x2 - x1) ) {
  
     steep = 1;
  }
  else {
  
     steep = 0;
  } 
  
  //Yes line has steep slope make it shallow	   
  if ( steep ) {
	  
	//swap(x1, y1) 
    //Because Java for scalar types is pass by value
	tmp = y1;
    y1 = x1;
    x1 = tmp;
		 
    //swap(x2, y2)
    //Because Java for scalar types is pass by value
    tmp = y2;
    y2 = x2;
	x2 = tmp;        		 	  	    
  }
  
  //We always move from left to right(that is x is always incremented)
  if ( x1 > x2 ) {
	  
	//swap(x1, x2);
	//Because Java for scalar types is pass by value
	tmp = x2;
	x2 = x1;
	x1 = tmp;
		
	//swap(y1, y2)
	//Because Java for scalar types is pass by value
	tmp = y2;
	y2 = y1;
	y1 = tmp;
  }
  
  dx = x2 - x1;	  
  dy = Math.abs(y2 - y1);
  //Initial value, the first and the last points are always on the line, so error is zero(2e=2(0)=0)
  //e = dyX - dxY + c
  //eR = dy(X + 1) - dxY + c = e + dy
  //eD = dy(X + 1) - dx(Y + 1) + c = e + dy - dx
  //d = eR + eD
  d = 2*dy - dx;
	  
  //Find out if we'll increment or decrement y
  if ( y1 < y2 ) 
	ystep = 1;
  else
    ystep = -1;

  //Initial values(initial ordinate pair)		 
  x = x1;
  y = y1;
	  
  while ( x <= x2 ) {
	  	 
    //x is reflected as y(transitive) 		 
	if ( steep ) {
	  cxt.fillRect(y, x, 1, 1);
	  setPixelColor(cxt, y, x, color);
	}  
	else {
      cxt.fillRect(x, y, 1, 1);	
      setPixelColor(cxt, x, y, color); 	  
	}  
		
    //We only allow two moves, move to the right, or move diagonally. when we move to the right we only increment x otherwise we increment both(sign of ystep)
	if ( d < 0 ) 
      d = d + 2*dy;
    else {		    
	  d = d + 2*dy - 2*dx;
      y = y + ystep;			
    }
    x = x + 1; 		 		    
   }   	  	  	  	  	  	     
}

function drawCircle(cxt, a, b, r, color) {
 
  //We'll start at the top of the circle
  //First point is always on the circle so error is zero and we know that x is zero and y is r       	  
  var x = 0, y = r, d = 3 - 2*r;
 
  // x is initially zero, x will be same as y at 45(degree) angle
  while( x <= y ) {
         
    // Eight way symmetry of circle
	setPixelColor(cxt, y + a, x + b, color);
    setPixelColor(cxt, x + a, y + b, color);	
	setPixelColor(cxt, x + a, (-1)*y + b, color);
	setPixelColor(cxt, y + a, (-1)*x + b, color);
	setPixelColor(cxt, (-1)*y + a, (-1)*x + b, color);
	setPixelColor(cxt, (-1)*x + a, (-1)*y + b, color);
	setPixelColor(cxt, (-1)*x + a, y + b, color);
	setPixelColor(cxt, (-1)*y + a, x + b, color);
	
    if ( d < 0 ) // move right
      d = d + 4*x + 6;
    else { // move down
      d = d + 4*(x - y) + 10;
      //Since we've started at the top of the circle
      y = y - 1;
    }
         
    // Since we have started at top of the circle
    x = x + 1;                                
  }      
}

/*
  @cxt = context
  @a, b = origin points
  @deg_a, deg_b = start and end points of an arc in degrees  
*/
function drawArc(cxt, a, b, r, deg_a, deg_b, color) {
	  
  var x = 0, y = r, d = 3 - 2*r, i = 0, j;;
  
  var a1x = [];
  var a1y = [];
  
  var a2x = [];
  var a2y = [];
  
  var a3x = [];
  var a3y = [];
  
  var a4x = [];
  var a4y = [];
  
  var a5x = [];
  var a5y = [];
  
  var a6x = [];
  var a6y = [];
  
  var a7x = [];
  var a7y = [];
  
  var a8x = [];
  var a8y = [];
               
  // x is initially zero, x will be same as y at 45(degree) angle
  while( x <= y ) {  
    //setPixelColor(cxt, (-1)*y + a, (-1)*x + b, color); /* 1 */
	a1x[i] = (-1)*y + a;  a1y[i] = (-1)*x + b; 
	//setPixelColor(cxt, (-1)*x + a, (-1)*y + b, color); /* 2 */
	a2x[i] = (-1)*x + a; a2y[i] = (-1)*y + b;
	//setPixelColor(cxt, x + a, (-1)*y + b, color); /* 3 */
    a3x[i] = x + a; a3y[i] = (-1)*y + b;
    //setPixelColor(cxt, y + a, (-1)*x + b, color); /* 4 */
	a4x[i] = y + a; a4y[i] = (-1)*x + b;
	//setPixelColor(cxt, y + a, x + b, color); /* 5 */
	a5x[i] = y + a; a5y[i] = x + b;
	//setPixelColor(cxt, x + a, y + b, color); /* 6 */
	a6x[i] = x + a; a6y[i] = y + b;
	//setPixelColor(cxt, (-1)*x + a, y + b, color); /* 7 */
	a7x[i] = (-1)*x + a; a7y[i] = y + b;
	//setPixelColor(cxt, (-1)*y + a, x + b, color); /* 8 */
	a8x[i] = (-1)*y + a; a8y[i] = x + b; 
		    
    if ( d < 0 ) // move right
      d = d + 4*x + 6;
    else { // move down
      d = d + 4*(x - y) + 10;
      //Since we've started at the top of the circle
      y = y - 1;
    }    
	
    i = i + 1;	
	
    // Since we have started at top of the circle
    x = x + 1;
  }
  
  var cx = new Array(i*8);
  var cy = new Array(i*8);
  
  for ( j = 0; j < i; j++ ) {
    // Eight way symmetry of circle    		
	//setPixelColor(cxt, a1x[j], a1y[j], color); /* 1 */
	cx[j] = a1x[j]; cy[j] = a1y[j];   
	//setPixelColor(cxt, a2x[j], a2y[j], color); /* 2 */
	cx[j + i] = a2x[j]; cy[j + i] = a2y[j]; 
	//setPixelColor(cxt, a3x[j], a3y[j], color); /* 3 */
	cx[j + i*2] = a3x[j]; cy[j + i*2] = a3y[j]; 
	//setPixelColor(cxt, a4x[j], a4y[j], color); /* 4 */
	cx[j + i*3] = a4x[j]; cy[j + i*3] = a4y[j]; 
	//setPixelColor(cxt, a5x[j], a5y[j], color); /* 5 */
	cx[j + i*4] = a5x[j]; cy[j + i*4] = a5y[j];
	//setPixelColor(cxt, a6x[j], a6y[j], color); /* 6 */
	cx[j + i*5] = a6x[j]; cy[j + i*5] = a6y[j];
	//setPixelColor(cxt, a7x[j], a7y[j], color); /* 7 */
	cx[j + i*6] = a7x[j]; cy[j + i*6] = a7y[j];
	//setPixelColor(cxt, a8x[j], a8y[j], color); /* 8 */
    cx[j + i*7] = a8x[j]; cy[j + i*7] = a8y[j];	
  }
  
  //window.alert(( (parseInt((deg_a/360)*(i*8)))).toString() + " ---- " + ((parseInt((deg_b/360)*(i*8)))).toString());
  
  for ( j = parseInt((deg_a/360)*(i*8)); j < parseInt((deg_b/360)*(i*8)); j++ ) {
    setPixelColor(cxt, cx[j], cy[j], color);
  }      
}

// Trigonometric method
// a = length of major axis, b = length of minor axis
// h,k ordinate pair for the center of the ellipse
// x = a * cos(0 to PI/2 radians) + h 
// y = b * sin(0 to PI/2 radians) + k
// In order to rotate on axis, make minor greater than major
function drawEllipse(cxt, h, k, a, b, color) {      
   
  var x = 0, y = 0; 
	  
  //i is the magnitude of increment to radian at each step, this should not be fixed as it is now
  var radian = 0, i = 0.01;

  while ( radian <= Math.PI/2 ) {
	     	  		 		 	    
    x = (a*(Math.cos(radian)));
    y = (b*(Math.sin(radian)));
		 
    //Ellipses have 4 way symmetry
    setPixelColor(cxt, x + h, y + k, color);	  
	setPixelColor(cxt, (-1)*x + h, y + k, color);	 
	setPixelColor(cxt, (-1)*x + h, (-1)*y + k, color);	 
    setPixelColor(cxt, x + h, (-1)*y + k, color);		 

    radian = radian + i;		 		 
  }	  	  	  	  	     
}

// Implementation is easy, just draw four lines
function drawRectangle(cxt, x1, y1, width, height, color) { 
  
  drawLine(cxt, x1, y1, x1 + width, y1, color);
  drawLine(cxt, x1, y1 + height, x1 + width, y1 + height, color);
  drawLine(cxt, x1, y1, x1, y1 + height, color);
  drawLine(cxt, x1 + width, y1, x1 + width, y1 + height, color); 	     
}

function fillRectangle(cxt, x1, y1, width, height, color) {
   
  var x, y;
	  
  if ( width < 2 || height < 2 ) {  
	drawRectangle(graphics, x1, y1, width, height, color);
    return;
  }
	  
  for ( y = 0; y < height + 1; y++ )
	for ( x = 0; x < width + 1; x++ ) 
      setPixelColor(cxt, x1 + x, y1 + y, color);	
}   

function fillCircle(cxt, a, b, r, color) {
   
  var r1;
	  
  for ( r1 = r; r1 > 0; r1-- )	  
	drawCircle(cxt, a, b, r1, color); 	  	  
}   

function boundaryFillLineRun(cxt, x, y, boundary_color, replacement_color) {

  var u = y, d = y + 1; 
  
  while ( isEmpty(cxt, x, u, boundary_color, replacement_color) ) {  
    var l = x - 1, r = x;	
	while ( isEmpty(cxt, l, u, boundary_color, replacement_color) ) {
	  setPixelColor(cxt, l, u, replacement_color);
	  l = l - 1;  
	}
    while ( isEmpty(cxt, r, u, boundary_color, replacement_color) ) {
	  setPixelColor(cxt, r, u, replacement_color);
	  r = r + 1;  
	}
    u = u - 1;
  }
  
  while ( isEmpty(cxt, x, d, boundary_color, replacement_color) ) {  
    var l = x - 1, r = x;	
	while ( isEmpty(cxt, l, d, boundary_color, replacement_color) ) {
	  setPixelColor(cxt, l, d, replacement_color);
	  l = l - 1;  
	}
    while ( isEmpty(cxt, r, d, boundary_color, replacement_color) ) {
	  setPixelColor(cxt, r, d, replacement_color);
	  r = r + 1;  
	}	
    d = d + 1;
  }    
}      

/*
   The earlier implementation is not working, I'm trying to re-implement it in the hope that this time it'll work...
   You can find the pseudo-code of this function in this wikipedia document...
   http://en.wikipedia.org/wiki/Flood_fill
*/
function boundaryFill8Connected(cxt, seed_x, seed_y, boundary_color, replacement_color, width, height) 
{
    /* The state keepers */
    var cur = {dir: DIR_RIGHT, x: seed_x, y: seed_y}, forward = {x: 0, y: 0}, mark = {x: 0, y: 0, old_x: 0, old_y: 0};
    /* Number of adjacent non-diagonal filled pixels */
    var count = 0;    
    var backtrack = false, findloop = false;
    
    var goto_start = true, goto_paint = false;
    /* Will be made true when we are done filling area */
    var done = false;
         
    /* 
	    Pseudo-code
        -----------
	    while front-pixel is empty(color is neither replacement nor boundary)
	        move forward, "horizontally to the right"(we assumed it as default direction) or vertically or upwardly  
	    end while
        
        Please note that we're assuming/considering our front pixel to be the one on the right hand side of the current pixel...
        That is current pixel is (x, y) and the our front pixel would be (x + 1, y)
        Keep in mind that moving towards our right hand side also changes our current direction to right as well(from what ever it was previously)        
    */    
    while (getPixelColor(cxt, cur.x + 1, cur.y) != boundary_color && getPixelColor(cxt, cur.x + 1, cur.y) != replacement_color) 
    {  
        cur.x = cur.x + 1;
    }           
    forward.x = cur.x + 1;
    forward.y = cur.y;
    
/* MAIN LOOP: */    
    while(!done) {    

       /*
          Pseudo-code			
          -----------
          move forward
	      if right-pixel is empty
             if backtrack is true and findloop is false and either front-pixel or left-pixel is empty
                set findloop to true
             end if
             turn right
PAINT:
             move forward
          end if
       */        
       //window.alert("cur = " + cur.x + "," + cur.y + " dir = " + cur.dir + " -|- RIGHT --> " + directions(cur, RIGHT).x + "," + directions(cur, RIGHT).y); 
       
       //setPixelColor(cxt, directions(cur, RIGHT).x, directions(cur, RIGHT).y, GREENCOLOR);
       
       //window.alert("cur = " + cur.x + "," + cur.y + " dir = " + cur.dir + " -|- FRONT --> " + directions(cur, FRONT).x + "," + directions(cur, FRONT).y + " ---- LEFT --> " + directions(cur, LEFT).x + "," + directions(cur, LEFT).y);
       
       //backtrack = true;
       if (goto_start == false && goto_paint == false) 
       {  
          /* move forward */    
          cur.x = forward.x;
          cur.y = forward.y;    
          
          if (isEmpty(cxt, directions(cur, RIGHT).x, directions(cur, RIGHT).y, boundary_color, replacement_color)) 
          {
             if (backtrack == true && findloop == false)
             {                            
                //setPixelColor(cxt, directions(cur, FRONT).x, directions(cur, FRONT).y, GREENCOLOR); 
                //setPixelColor(cxt, directions(cur, LEFT).x, directions(cur, LEFT).y, replacement_color);
                if (isEmpty(cxt, directions(cur, FRONT).x, directions(cur, FRONT).y, boundary_color, replacement_color) || isEmpty(cxt, directions(cur, LEFT).x, directions(cur, LEFT).y, boundary_color, replacement_color)) 
                {
                   findloop = true;
                
                   //window.alert("Hola");
                }             
             }
             /* turn right */
             forward = {x: directions(cur, RIGHT).x, y: directions(cur, RIGHT).y};
             cur.dir = DIR_RIGHT;
             goto_paint = true;          
          }
       }

/* PAINT: */       
       if (goto_paint == true && goto_start == false)
       {
           /* move forward */
           cur.x = forward.x;
           cur.y = forward.y;
           goto_paint = false;
       }           
       
/* START: */       
       goto_start = false;
       /* Set count to number of adjacent non-diagonal, filled pixels(only pixels in front, right, back and left) */ 		 
       if (count != 4)
       {   
          /* TODO, IT IS NOT PART OF THE ORIGINAL Pseudo-code BUT IT IS  NEEDED */
          count = 0;   
          for (var i = 0; i < 2; i++)
          { 		 
             for (var j = -1; j < 2; j+=2)
             {
                if (isFilled(cxt, (cur.x + i*j), (cur.y + j*(i - 1)), boundary_color, replacement_color))
                {		  
                   count = count + 1;        		
                }                                                         
	         }  
          }
       }
                    
       switch(count)
       {        
          case 1:  
            //setPixelColor(cxt, 210, 199, GREENCOLOR);   
            //setPixelColor(cxt, 208, 199, GREENCOLOR);            
            
            //window.alert("cur = " + cur.x + "," + cur.y + " dir = " + cur.dir + " -|- FRONT_LEFT --> " + directions(cur, FRONT_LEFT).x + "," + directions(cur, FRONT_LEFT).y + " ---- BACK_LEFT --> " + directions(cur, BACK_LEFT).x + "," + directions(cur, BACK_LEFT).y); 
            
            if (backtrack == true)
            {
                findloop = true;              
            }
            else if (findloop == true)
            {                                 
                if (isNull(mark))
                {   
                    restore(mark);            
                }                    
            }
            else if (isEmpty(cxt, directions(cur, FRONT_LEFT).x, directions(cur, FRONT_LEFT).y, boundary_color, replacement_color) && isEmpty(cxt, directions(cur, BACK_LEFT).x, directions(cur, BACK_LEFT).y, boundary_color, replacement_color))
            {
                //window.alert("Empty");
                
                clear(mark);                                                                
                                             
                /* turn left */                
                forward = {x: directions(cur, LEFT).x, y: directions(cur, LEFT).y};
                cur.dir = DIR_LEFT;
                /* fill cur */
                setPixelColor(cxt, cur.x, cur.y, replacement_color);
                /* jump to paint */
                goto_paint = true;
                //window.alert("cur = " + cur.x + "," + cur.y + " dir = " + cur.dir + " -|- LEFT --> " + forward.x + "," + forward.y); 
                //setPixelColor(cxt, cur.x, cur.y, replacement_color);                
                //window.alert(cur.dir + " -- " + forward.x + " -- " + forward.y);
            }                
            //window.alert(cur.dir + " -- " + directions(cur, FRONT_LEFT).x + " -- " + directions(cur, FRONT_LEFT).y);
            //window.alert(cur.dir + " -- " + directions(cur, BACK_LEFT).x + " -- " + directions(cur, BACK_LEFT).y);
          break;
          case 2:
             window.alert("2");
          break;
          case 3:
             /*
                Pseudo-code			
                -----------
                clear mark
                turn left
                fill cur
                jump to PAINT
             */
             clear(mark);          
             forward = {x: directions(cur, LEFT).x, y: directions(cur, LEFT).y};
             cur.dir = DIR_LEFT;
             setPixelColor(cxt, cur.x, cur.y, replacement_color);
             goto_paint = true;          
          break;
          case 4:
             /*
                Pseudo-code			
                -----------
                fill cur
                done
             */             
             setPixelColor(cxt, cur.x, cur.y, replacement_color);
             done = true;
          break;
       }
    } // end MAIN LOOP    
}    

function boundaryFill8Connected_old(cxt, seed_x, seed_y, boundary_color, replacement_color, width, height) {
  
  /* Your usual counters */  
  var i, j, count = 0;
  
  /* The state keepers */
  /* State scalars */
  var x = seed_x, y = seed_y,/*forward_move_x, forward_move_y,*/ cur_dir, mark_dir, mark2_dir, turn_around_dir;  
  /* State pairs  */
  var forward_move = new Array(0, 0); 
  /* PLEASE NOTE: ALL DIRECTIONS(front, back, left, right) ARE RELATIVE TO CURRENT DIRECTION */
  var right_pixel = new Array(0, 0), front_pixel = new Array(0, 0), left_pixel = new Array(0, 0), back_pixel = new Array(0, 0), front_left_pixel = new Array(0, 0), back_left_pixel = new Array(0, 0);
  var mark = new Array(0, 0), mark2 = new Array(0, 0), old_mark = new Array(0, 0), old_mark2 = new Array(0, 0);
  
  /* Control flags */
  var jump_to_start = 1, done = 0, backtrack = 0, findloop = 0, jump_to_paint = 0;
  
  /* 
	Pseudo-code
	while front-pixel is empty(color is neither replacement nor boundary)
	  move forward, horizontally to the right or vertically or upwardly  
	end while
  */    
  while ( getPixelColor(cxt, x, y) != boundary_color && getPixelColor(cxt, x, y) != replacement_color ) {  
    x = x + 1;
  } 
  
  /* Not part of the pseudo-code */
  x = x - 1; // When we moved horizontally we ended up on the pixel which has the same color as the boundry does
  
  cur_dir = DIR_RIGHT;
  forward_move[0] = x + 1;  /* Because we are moving in the right direction(got the pun, though it was unintentional :) */
  //forward_move[0] = x;
  forward_move[1] = y;
 
/* MAIN LOOP: */ 
  while ( !done ) {
  	
    if ( !jump_to_start && !jump_to_paint ) {
	
	  /* move forward */
      x = forward_move[0];
	  y = forward_move[1];
      /*
        Pseudo-code			
		if right-pixel is empty
          if backtrack is true and findloop is false and either front-pixel or left-pixel is empty
            set findloop to true
          end if
          turn right
PAINT:
          move forward
        end if
      */
      switch(cur_dir) {
	    case DIR_UP:		  
		  front_pixel[0] = x;
		  front_pixel[1] = y - 1;
		  right_pixel[0] = x + 1;
		  right_pixel[1] = y;
          left_pixel[0] = x - 1;
          left_pixel[1] = y;		  
		break;
		case DIR_RIGHT:
		  front_pixel[0] = x + 1;
		  front_pixel[1] = y;
		  right_pixel[0] = x;
		  right_pixel[1] = y + 1;
		  left_pixel[0] = x;
		  left_pixel[1] = y - 1;
		break;
		case DIR_DOWN:		  
          front_pixel[0] = x;
          front_pixel[1] = y + 1;
		  right_pixel[0] = x - 1;
          right_pixel[1] = y;
          left_pixel[0] = x + 1;
          left_pixel[1] = y;		
		break;
		case DIR_LEFT:		  
		  front_pixel[0] = x - 1;
		  front_pixel[1] = y;
		  right_pixel[0] = x;
		  right_pixel[1] = y - 1;
		  left_pixel[0] = x;
		  left_pixel[1] = y + 1;
		break;
      }
	  
      if ( isEmpty(cxt, right_pixel[0], right_pixel[1], boundary_color, replacement_color) ) {
	    if ( backtrack && !findloop ) {		
		   if ( isEmpty(cxt, front_pixel[0], front_pixel[1], boundary_color, replacement_color) || isEmpty(cxt, left_pixel[0], left_pixel[1], boundary_color, replacement_color) ) {
             findloop = 1;  		   
           }		   
           cur_dir = DIR_RIGHT;
           forward_move[0] = right_pixel[0];
           forward_move[1] = right_pixel[1];		   
		   jump_to_paint = 1;
        }  		
	  }	    
    } /* if !jump_to_start */

    if ( jump_to_paint ) {
	  x = forward_move[0];
      y = forward_move[1];
	  jump_to_paint = 0;	  
	}	
		
/* START: */  
    jump_to_start = 0;
    /* Set count to number of adjacent non vertical pixels(only pixels in front, right, back and left) */ 		 
    for ( i = 0; i < 2; i++ ) { 		 
      for ( j = -1; j < 2; j+=2 ) {
        if ( isFilled(cxt, (x + i*j), (y + j*(i - 1)), boundary_color, replacement_color) ) {		  
          count = count + 1;        		
        }
	  }  
    }
		    
    if ( count != 4 ) {		
      /*
	    Pseudo-code
	    do
          turn right
        While front-pixel is empty		   			   
      */      	  
      do {
		    
		i = forward_move[0];
		j = forward_move[1];
		forward_move[0] = x;
		forward_move[1] = y;

        if ( cur_dir != DIR_LEFT ) {
	      /* Direction was DIR_UP, DIR_RIGHT or DIR_DOWN */		
	      cur_dir = cur_dir + 1; 
		  /* Now it is DIR_RIHGT(from DIR_UP), DIR_DOWN(from DIR_RIGHT) or DIR_LEFT(from DIR_DOWN) */
		  switch( cur_dir ) {
		    case DIR_RIGHT:
			  forward_move[0] = forward_move[0] + 1;
		    break;
		    case DIR_DOWN:
			  forward_move[1] = forward_move[1] + 1;
		    break;
		    case DIR_LEFT:
			  forward_move[0] = forward_move[0] - 1;
		    break;
		  }
        }
        else {
	      /* Direction is DIR_LEFT and we'll reassign it to be DIR_UP */
		  cur_dir = DIR_UP;
		  forward_move[1] = forward_move[1] - 1;
        } 	  	  
      } while ( isEmpty(cxt, i, j, boundary_color, replacement_color) );	
	
      /*
        Pseudo-code
	    do
          turn left
        while front-pixel is filled		   			   
	  */	
	  do {
	
		i = forward_move[0];
		j = forward_move[1];
		forward_move[0] = x;
		forward_move[1] = y;
	  
	    if ( cur_dir != DIR_UP ) {
	  
	      /* Direction is DIR_LEFT, DIR_DOWN, DIR_RIGHT */
		  cur_dir = cur_dir - 1; 
		
		  /* We've now changed the direction from DIR_LEFT to DIR_DOWN, from DIR_DOWN to DIR_RIGHT and from DIR_RIGHT to DIR_UP */
		  /* Now change the forward move coordinates as well */
		
		  switch( cur_dir ) {		  
            case DIR_DOWN: 
			  forward_move[1] = forward_move[1] + 1;
            break;
            case DIR_RIGHT:
			  forward_move[0] = forward_move[0] + 1;
            break;
            case DIR_UP:
			  forward_move[1] = forward_move[1] - 1;
            break;  		  
		  }
	    }
	    else {
	      /* current direction is up, as we're moving left we'll change it to left */
		  cur_dir = DIR_LEFT;
		  forward_move[0] = forward_move[0] - 1;
	    }
	  	  	  
	  } while ( isFilled(cxt, i, j, boundary_color, replacement_color) );
      
	  /* */
	  //done = 1; 
	  
    } /* if count != 4 */
	
	window.alert("count = " + (count).toString() + ", x, y = " + (x).toString() + ", " + (y).toString());
	
	/* PLEASE NOTE: ALL DIRECTIONS(front, back, left, right) ARE RELATIVE TO CURRENT DIRECTION */
	switch ( cur_dir ) {
	  case DIR_UP:
	    back_pixel[0] = x;
        back_pixel[1] = y + 1;		
	    /* Looking straight to the left */
        left_pixel[0] = x - 1;
        left_pixel[1] = y;  		
	    /* Looking diagonally left to the front */
	    front_left_pixel[0] = x - 1; 
		front_left_pixel[1] = y - 1;
		/* Looking diagonally left to the back  */
		back_left_pixel[0] =  x - 1;
		back_left_pixel[1] = y + 1;
		turn_around_dir = DIR_DOWN;
      break;
      case DIR_RIGHT:
	    back_pixel[0] = x - 1;
		back_pixel[1] = y;
	    /* Looking straight to the left */
        left_pixel[0] = x;
        left_pixel[1] = y - 1;  		  
	    /* Looking diagonally left to the front */
	    front_left_pixel[0] = x + 1; 
		front_left_pixel[1] = y - 1;
		/* Looking diagonally left to the back  */
		back_left_pixel[0] = x - 1;
		back_left_pixel[1] = y - 1;
		turn_around_dir = DIR_LEFT;
      break;
      case DIR_DOWN:
	    back_pixel[0] = x;
        back_pixel[1] = y - 1;		
	    /* Looking straight to the left */
        left_pixel[0] = x - 1;
        left_pixel[1] = y;  		  	    
	    /* Looking diagonally left to the front */
	    front_left_pixel[0] = x + 1;
		front_left_pixel[1] = y + 1;
		/* Looking diagonally left to the back  */
		back_left_pixel[0] = x + 1;
		back_left_pixel[1] = y - 1;
		turn_around_dir = DIR_UP;
      break;
      case DIR_LEFT:
	    back_pixel[0] = x + 1;
		back_pixel[1] = y;
	    /* Looking straight to the left */
        left_pixel[0] = x;
        left_pixel[1] = y + 1;  		  
	    /* Looking diagonally left to the front */
	    front_left_pixel[0] = x - 1;
		front_left_pixel[1] = y + 1;
		/* Looking diagonally left to the back  */
		back_left_pixel[0] = x + 1;
		back_left_pixel[1] = y + 1;
		turn_around_dir = DIR_RIGHT;
      break;	  
	}
	
	switch ( count ) {	
	  case 1:
	    /*
          Pseudo-code	
		  if backtrack is true
		    set findloop to true			
        */ 		  
	    if ( backtrack ) {
		  findloop = 1; 
        }
	    /*
          Pseudo-code	
		  else if findloop is true
		    if mark is null
			  restore mark
			endif  
        */  		  
        else if ( findloop ) {
		  if ( mark[0] == 0 && mark[1] == 0 ) {
		    mark[0] = old_mark[0];
			mark[1] = old_mark[1];
		  }
        }		
	    /*
          Pseudo-code	
		  else if front-left-pixel and back-left-pixel are both empty
		    clear mark
			turn left
			fill cur
			jump to paint
        */		  
        else if ( isEmpty(cxt, front_left_pixel[0], front_left_pixel[1], boundary_color, replacement_color) && isEmpty(cxt, back_left_pixel[0], back_left_pixel[1], boundary_color, replacement_color) ) {
		  old_mark[0] = mark[0];
		  old_mark[1] = mark[1];
          mark[0] = 0;
          mark[1] = 0;
          forward_move[0] = left_pixel[0];
          forward_move[1] = left_pixel[1];
		  cur_dir = DIR_LEFT;
          setPixelColor(cxt, x, y, replacement_color);		  
          jump_to_paint = 1;		  
        }
      break;
      case 2:
	  /*
	   Pseudo-code
       if back-pixel is filled
         if front-left-pixel is not filled
           clear mark
		   turn around
           fill cur
           jump to PAINT
         end if       							
	  */
	  if ( isFilled(cxt, back_pixel[0], back_pixel[1], boundary_color, replacement_color) ) {
	    if ( isEmpty(cxt, front_left_pixel[0], front_left_pixel[1], boundary_color, replacement_color ) ) {
		  old_mark[0] = mark[0];
          old_mark[1] = mark[1];
          mark[0] = 0;
          mark[1] = 0;
		  forward_move[0] = back_pixel[0];
		  forward_move[1] = back_pixel[1];
		  cur_dir = turn_around_dir;
		  setPixelColor(cxt, x, y, replacement_color); 
          jump_to_paint = 1;		  
        }	
	  }
	  /*
	   Pseudo-code
	   else if mark is not set
         set mark to cur
         set mark-dir to cur-dir
         clear mark2
         set findloop and backtrack to false

	  */
	  else if ( mark[0] == 0 && mark[1] == 0 ) {	  
	    mark[0] = x;
		mark[1] = y;
		mark_dir = cur_dir;
		old_mark2[0] = mark2[0];
		old_mark2[1] = mark2[1];
		mark2[0] = 0;
		mark2[1] = 0;
		findloop = 0;
		backtrack = 0;		
	  }
	  else {
	    if ( mark2[0] == 0 && mark2[1] == 0 ) {
		  if ( x == mark[0] && y == mark[1] ) {
            if ( cur_dir == mark_dir ) {
			  old_mark[0] = mark[0];
              old_mark[1] = mark[1];
              mark[0] = 0;
              mark[1] = 0;
              cur_dir = turn_around_dir;
			  forward_move[0] = back_pixel[0];
			  forward_move[1] = back_pixel[1];
              setPixelColor(cxt, x, y, replacement_color); 
              jump_to_paint = 1;    			  
            }			
			else {
			  backtrack = 1;
			  findloop = 0;
			  cur_dir = mark_dir;
			}
          }
          else if ( findloop ) {		  
		    mark2[0] = x;
            mark2[1] = y;
            mark2_dir = cur_dir;			
          }
		}
		else {
          if ( cur[0] == mark[0] && cur[1] == mark[1] ) {
		    cur[0] = mark2[0];
            cur[1] = mark2[1];
            cur_dir = mark2_dir;
            old_mark[0] = mark[0];
            old_mark[1] = mark[1];
            old_mark2[0] = mark2[0];
            old_mark2[1] = mark2[1];
            mark[0] = 0;
            mark[1] = 0;
            mark2[0] = 0;
            mark2[1] = 0;
			backtrack = 0;
			cur_dir = turn_around_dir;
			forward_move[0] = back_pixel[0];
			forward_move[1] = back_pixel[1];
      		setPixelColor(cxt, x, y, replacement_color); 
			jump_to_paint = 1;            			
          }
          else if ( cur[0] == mark2[0] && cur[1] == mark2[1] ) {
		    mark[0] = cur[0];
			mark[1] = cur[1];
			cur_dir = mark2_dir;
			mark_dir = mark2_dir;
			old_mark2[0] = mark2[0];
			old_mark2[1] = mark2[1];
			mark2[0] = 0;
			mark2[1] = 0;
          }
		}          				
	  }
      break;
      case 3:
	    /*
          Pseudo-code		  
		    clear mark
		    turn left
		    fill cur
		    jump to PAINT
		*/			
		old_mark[0] = mark[0];
		old_mark[1] = mark[1];
        mark[0] = 0;
        mark[1] = 0;		
		forward_move[0] = left_pixel[0];
        forward_move[1] = left_pixel[1];		
		cur_dir = DIR_LEFT; 
        setPixelColor(cxt, x, y, replacement_color); 
        jump_to_paint = 1;		
      break;
      case 4:
	    /*
          Pseudo-code
		    fill cur
		    done
		*/
	    setPixelColor(cxt, x, y, replacement_color);
        done = 1;           		
      break;
	}
    count = 0;   	
  } /* End while !done */    
}







 
