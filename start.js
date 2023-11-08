let[seconds,minutes,hours]=[45,0,0];
let timeref = document.querySelector(".timer-display");
let int=null;

document.getElementById("start-button").addEventListener("click",
() =>{
    if(int!=null){
        clearInterval(int);
    }
    int = setInterval(displaytimer,1000);
});

function displaytimer() {
    seconds-=1;
    if(seconds==0){
        clearInterval(int);
        [seconds,minutes,hours]=[0,0,0];
        timeref.innerHTML="00 : 00 : 00";
        
    }
    let h=hours<1000 ? "0"+hours :hours;
    let m=minutes<1000 ? "0"+minutes :minutes;
    let s=seconds<1000 ? ""+seconds : seconds;

    timeref.innerHTML= `${h} : ${m} : ${s}`;
}
function redirect () {
    setTimeout(myURL, 46000);
    var result = document.getElementsByClassName("buttons");
    result.innerHTML = "";
 }

 function myURL() {
    document.location.href = 'result.html';
 }
 const changeText = document.querySelector("#btn-text");

changeText.addEventListener("click", function() {
  changeText.textContent = "stop";
});