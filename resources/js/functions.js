/* game-engine/resources/js/functions.js */
/* Written by, Sohail Qayum Malik[sqm@hackers.pk] */

/*
@color, [R, G, B, A], Each RGBA is a value between 0 and 255 inclusive where, A - The alpha channel and, 0 is transparent and 255 is fully visible 
*/
function setPixelColor(cxt, x, y, color)
{
  var imgData = cxt.getImageData(x, y, 1, 1);
  var rgba = colorToRgba(color);
  imgData.data[0] = rgba[0];
  imgData.data[1] = rgba[1];
  imgData.data[2] = rgba[2];
  imgData.data[3] = rgba[3];
  cxt.putImageData(imgData, x, y);  
}

function getPixelColor(cxt, x, y)
{    
    return rgbaToColor( cxt.getImageData(x, y, 1, 1).data );    
}

function rgbaToColor( rgba )
{
    return ((rgba[0] << 16) | (rgba[1] << 8) | rgba[2]);
}

function colorToRgba( color )
{
    return [((color >> 16) & 255), ((color >> 8) & 255 ), (color & 255), 255];  
}

function isEmpty(cxt, x, y, boundry_color, replacement_color)
{
  return (getPixelColor(cxt, x, y) != boundry_color && getPixelColor(cxt, x, y) != replacement_color);
}

function isFilled(cxt, x, y, boundry_color, replacement_color)
{
    return !isEmpty(cxt, x, y, boundry_color, replacement_color);  
}

/* boundaryFill8Connected() specific helpers */
function clear(mark)
{            
    mark.old_x = mark.x;
    mark.x = 0;
    mark.old_y = mark.y;
    mark.y = 0;
}

function restore(mark) 
{
    mark.x = mark.old_x;
    mark.old_x = 0;
    mark.y = mark.old_y;
    mark.old_y = 0;
}

function isNull(mark)
{
    return (mark.x == 0 && mark.y == 0);
}

/* I died couple of times when I was writing the following... */
function directions(cur, dir)
{   
    var ret = {x: 0, y: 0};
    switch (cur.dir) 
    {
        case DIR_UP: /* IT IS ALL GOOD */
            switch(dir)
            {
                case FRONT:
                    ret.x = cur.x;
                    ret.y = cur.y - 1;
                break;
                case RIGHT:
                    ret.x = cur.x + 1;
                    ret.y = cur.y;
                break;
                case BACK:
                    ret.x = cur.x;
                    ret.y = cur.y + 1;
                break;
                case LEFT:
                    ret.x = cur.x - 1;
                    ret.y = cur.y;
                break;
                case FRONT_RIGHT:
                    ret.x = cur.x + 1;
                    ret.y = cur.y - 1;
                break;
                case FRONT_LEFT:
                    ret.x = cur.x - 1;
                    ret.y = cur.y - 1;                    
                break;
                case BACK_RIGHT:
                    ret.x = cur.x + 1;
                    ret.y = cur.y + 1;
                break;
                case BACK_LEFT:
                    ret.x = cur.x - 1;
                    ret.y = cur.y + 1;
                break;
            }       
        break;
        case DIR_RIGHT: /* IT IS ALL GOOD */         
            switch(dir)
            {
                case FRONT:
                    ret.x = cur.x + 1;
                    ret.y = cur.y;
                break;
                case RIGHT:
                    ret.x = cur.x;
                    ret.y = cur.y + 1;
                break;
                case BACK:
                    ret.x = cur.x - 1;
                    ret.y = cur.y;
                break;
                case LEFT:
                    ret.x = cur.x;
                    ret.y = cur.y - 1;
                break;
                case FRONT_RIGHT:
                    ret.x = cur.x + 1;
                    ret.y = cur.y + 1;
                break;
                case FRONT_LEFT:
                    ret.x = cur.x + 1;
                    ret.y = cur.y - 1;                    
                break;
                case BACK_RIGHT:
                    ret.x = cur.x - 1;
                    ret.y = cur.y + 1;
                break;
                case BACK_LEFT:
                    ret.x = cur.x - 1;
                    ret.y = cur.y - 1;
                break;
            }
        break;
        case DIR_DOWN: /* IT IS ALL GOOD */
            switch(dir)
            {
                case FRONT:
                    ret.x = cur.x;
                    ret.y = cur.y + 1;
                break;
                case RIGHT:
                    ret.x = cur.x - 1;
                    ret.y = cur.y;
                break;
                case BACK:
                    ret.x = cur.x;
                    ret.y = cur.y - 1;
                break;
                case LEFT:
                    ret.x = cur.x + 1;
                    ret.y = cur.y;
                break;
                case FRONT_RIGHT:
                    ret.x = cur.x - 1;
                    ret.y = cur.y + 1;
                break;
                case FRONT_LEFT:
                    ret.x = cur.x + 1;
                    ret.y = cur.y + 1;                    
                break;
                case BACK_RIGHT:
                    ret.x = cur.x - 1;
                    ret.y = cur.y - 1;
                break;
                case BACK_LEFT:
                    ret.x = cur.x + 1;
                    ret.y = cur.y - 1;
                break;
            }        
        break;
        case DIR_LEFT: /* IT IS ALL GOOD */
            switch(dir)
            {
                case FRONT:
                    ret.x = cur.x - 1;
                    ret.y = cur.y;
                break;
                case RIGHT:
                    ret.x = cur.x;
                    ret.y = cur.y - 1;
                break;
                case BACK:
                    ret.x = cur.x + 1;
                    ret.y = cur.y;
                break;
                case LEFT:
                    ret.x = cur.x;
                    ret.y = cur.y + 1;
                break;
                case FRONT_RIGHT:
                    ret.x = cur.x - 1;
                    ret.y = cur.y - 1;
                break;
                case FRONT_LEFT:
                    ret.x = cur.x - 1;
                    ret.y = cur.y + 1;                    
                break;
                case BACK_RIGHT:
                    ret.x = cur.x + 1;
                    ret.y = cur.y - 1;
                break;
                case BACK_LEFT:
                    ret.x = cur.x + 1;
                    ret.y = cur.y + 1;
                break;
            }        
        break;
    }

    /*for (var i = -1; i < 2; i++)
    {
        for (var j = -1; j < 2; j++)
        {
            window.alert("i = " + i + ", j = " + j);
        }
    }*/
    
    return ret;
}
/* boundaryFill8Connected() specific helpers end here */

