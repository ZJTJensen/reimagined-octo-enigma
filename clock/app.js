let date = new Date().getTime();
let hour = 0;
let minute = 0;
let seconds = 0;

function run (){
let now = new Date().getTime();
let nownow = Math.ceil(now /1000);
let startDate = Math.ceil(date /1000);
let totalTime =  nownow - startDate;
let hourTime = totalTime - (3600*hour);
let newTime = totalTime - (60*minute);

if (hourTime > 3600 ){
    hour +=1;
    totalTime = 0;
}
if (newTime >= 60){
    minute +=1;
    // newTime =- 60;
    // newTime =0;
    
}

seconds = newTime;

console.log(seconds);
let myButton = new Date().toString();
    ReactDOM.render(hour, document.getElementById('hour'));
    ReactDOM.render(minute, document.getElementById('minute'));
    ReactDOM.render(seconds, document.getElementById('second'));
    ReactDOM.render(myButton, document.getElementById('app'));
}
setInterval(run, 1000);
