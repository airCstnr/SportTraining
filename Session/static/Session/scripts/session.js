/*
    Session

    Author : Raphael Castanier
    Email  : raphael.castanier@free.fr
    Date   : May 2020
*/

var inter;
var state = "Off";
var h = 0;
var m = 0;
var s = 0;


function updateChrono() {
    s++;
    if(s==60) {
        s = 0;
        m++;
    }
    if(m==60) {
        m = 0;
        h++;
    }
    if (s < 10) {s = "0" + parseInt(s)};
    if (m < 10) {m = "0" + parseInt(m)};
    text = m + ":" + s;
    if(h>0) {
        text = h + ":" + text;
    }
    document.getElementById('chrono').innerHTML = text;
}


function toggleChrono() {
    var btn = document.getElementById('chrono-btn');   // Get the chrono button
    var card = btn.parentElement.parentElement;        // Get the parent card
    card.classList.remove("bg-info");
    if(state=="Off") {
        btn.innerHTML = "Pause";
        btn.classList.toggle("btn-primary", false);
        btn.classList.toggle("btn-secondary", true);
        card.classList.toggle("bg-warning", false);
        card.classList.toggle("bg-success", true);
        state = "On";
        updateChrono();
        inter = setInterval(updateChrono, 1000);
    }
    else {
        btn.innerHTML = "Start";
        btn.classList.toggle("btn-primary", true);
        btn.classList.toggle("btn-secondary", false);
        card.classList.toggle("bg-warning", true);
        card.classList.toggle("bg-success", false);
        state = "Off";
        clearInterval(inter);
    }
}
