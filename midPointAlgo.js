const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const maxx = canvas.width = window.innerWidth - 30;
const maxy = canvas.height = window.innerHeight - 30;



const radius = maxy/2-30;

function drawRectangle(x,y){
    c.fillRect(x-25, y-25, 50,50);
}

var p = function(x,y){
    let obj = {x:x,y:y};
    return obj;
};

function coordinatesOfCircle(){
    let o1=[], o2=[], o3=[], o4=[], o5=[], o6=[], o7=[], o8=[];
     
    //Rectangle rotating using mid-point circle roating algorithm
    
    let x=0,y=radius;
    let pk = (5/4)-radius;  //Initial decesion parameter
    o1.push(p(x,y));
    do{
        if(pk<0){
            x++;
            pk += (2*x) + 1;
            o1.push(p(x,y));
            o2.push(p(y,x));
            o3.push(p(x,-y));
            o4.push(p(-y,x));
            o5.push(p(-x,-y));
            o6.push(p(-y,-x));
            o7.push(p(-x,y));
            o8.push(p(y,-x));
        }else {
            x++;y--;
            pk += (2*x) + 1 - (2*y);    //decesion parameter
            o1.push(p(x,y));
            o2.push(p(y,x));
            o3.push(p(x,-y));
            o4.push(p(-y,x));
            o5.push(p(-x,-y));
            o6.push(p(-y,-x));
            o7.push(p(-x,y));
            o8.push(p(y,-x));
        }
    }while(x<y);
    
    //coordinates entered in opposite direction
    o1.reverse();
    o4.reverse();
    o5.reverse();
    o8.reverse();
    return [...o3,...o8,...o2,...o1,...o7,...o4,...o6,...o5];
}

let coordinates = coordinatesOfCircle();
let inc = 0;

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,maxx,maxy);
  
    if(inc >= coordinates.length-1)
        inc = 0;
    
    let tempx=coordinates[inc].x;
    let tempy=coordinates[inc].y;
    c.beginPath();
    c.fillStyle = '#000000';
    //Draw rectangle with shading effect
    drawRectangle(tempx+(maxx/2),tempy+(maxy/2));
    drawRectangle(tempx+(maxx/2),tempy+(maxy/2)-10);
    inc+=10;
}

animate();