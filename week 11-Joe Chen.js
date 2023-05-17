const svg = document.getElementById("mysvg");
let imageDiv = document.querySelector('.Image');
let style = getComputedStyle(imageDiv);
let width = parseFloat(style.width);
let height = parseFloat(style.height);


svg.setAttribute("width", '100%');
svg.setAttribute("height", '100%');
svg.setAttribute("style", "background-color: black");

//random color
function makeRGB(){
  let r = Math.round(Math.random() * 255);
  let g = Math.round(Math.random() * 255);
  let b = Math.round(Math.random() * 255);
return 'rgb('+r+','+g+','+b+')';
};

//random number
function randomNum(lower, upper) {
  let num = lower + Math.random()*(upper-lower);
  return num;
}
//makecircle
  function makeCircle(x, y, radius,c) {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", c);
    return circle;
  }
  
  class fallstar{
    constructor(x,y,r,c){
      this.x=x;
      this.y=y;
      this.r=r;
      this.c=c;
      this.svgElement;
      this.animDuration=randomNum(3,8);
      this.targetX=randomNum(0,width);
      this.targetY=randomNum(0,height);
      this.targetC=makeRGB();
    }

    drawstar(){
      this.svgElement=makeCircle(this.x,this.y,this.r);
      svg.appendChild(this.svgElement);
      this.addAnimateX();
      this.addAnimateY();
      this.addAnimateR();
      this.addAnimateC();
    }

    addAnimateC(){
      let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animElement.setAttribute('attributeName','fill');
      animElement.setAttribute('values',this.c + "; " + this.targetC + "; " + 'white');
      animElement.setAttribute('dur',`${this.animDuration}`);
      animElement.setAttribute('repeatCount', 'indefinite');
      this.svgElement.appendChild(animElement);
   }

    addAnimateR(){
      let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animElement.setAttribute('attributeName','r');
      animElement.setAttribute('values',`${this.r};${1.5*this.r};${this.r}`);
      animElement.setAttribute('dur',`${this.animDuration}`);
      animElement.setAttribute('repeatCount', 'indefinite');
      this.svgElement.appendChild(animElement);
    }

    // set direction
    addAnimateX(){
      let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animElement.setAttribute('attributeName','cx');
      animElement.setAttribute('values',`${this.x};${(width/2+this.targetX)/2};${this.targetX}`);
      animElement.setAttribute('dur',`${this.animDuration}`);
      animElement.setAttribute('repeatCount', 'indefinite');
      this.svgElement.appendChild(animElement);
    }
    addAnimateY() { 
      let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animElement.setAttribute('attributeName', 'cy');
      animElement.setAttribute('dur', `${this.animDuration}`);
      animElement.setAttribute('repeatCount', 'indefinite');
      animElement.setAttribute('calcMode', 'spline');
      animElement.setAttribute('keyTimes', '0;0.3;1');
      animElement.setAttribute('keySplines', '0 0.58 1 1;0.42 0 0.8 1');
      animElement.setAttribute('values', `${this.y};${(2*height/2+3*this.targetY)/5};${this.targetY}`);
     
      
      this.svgElement.appendChild(animElement);
    
      if (this.targetY >= height / 2) {
        animElement.setAttribute('values', `${this.y};${(4*height/2+this.targetY)/5};${this.targetY}`);
        
      } else {
        animElement.setAttribute('values', `${this.y};${(2*height/2+3*this.targetY)/5};${height - this.targetY}`);
    
      }
      
      
    }
  }

// set number
  function createStarArray(num){
    let p=[];
    for(let i=0; i<num; i++){
      let px=width/2;
      let py=height/2;
      let psize=randomNum(width * 0.001, width * 0.008);
      let pc=makeRGB();
      p.push(new fallstar(px,py,psize,pc));
    }
    return p;
  }
    
  let stars = createStarArray(200);
  for (let fallstar of stars) {
    fallstar.drawstar();
  }


  function resizeSvg() {
   
    svg.innerHTML = '';
    let imageDiv = document.querySelector('.Image');
    let style = getComputedStyle(imageDiv);
    width = parseFloat(style.width);
    height = parseFloat(style.height);
    let stars = createStarArray(200);
    for (let fallstar of stars) {
      fallstar.drawstar();
    }
  }
  
  window.addEventListener("resize", resizeSvg);
  


  