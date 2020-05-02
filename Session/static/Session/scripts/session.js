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

var current_phase = 1;
var current_exercice = 1;

function phases_exercices() {
    if(state=="On") {
        var nb_phases = session.phases.length;

        var nb_exercices = session.phases[current_phase-1].length;
        var phase = document.getElementById('phase-'+current_phase);
        var exercice = document.getElementById('phase-'+current_phase+'-exercice-'+current_exercice);

        phase.classList.toggle("collapse", false);
        exercice.classList.remove("bg-light");
        exercice.classList.add("bg-success");

        current_exercice++;
        if(current_exercice==nb_exercices+1) {
            current_exercice=1;
            current_phase++;
            if(current_phase==nb_phases+1) {
                state = "END";
                toggleChrono();
            }
        }
    }
}


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
    phases_exercices();
}


function toggleChrono() {
    var btn = document.getElementById('chrono-btn');   // Get the chrono button
    var card = btn.parentElement.parentElement;        // Get the parent card
    card.classList.remove("bg-info");
    switch(state) {
    case "Off":
        btn.innerHTML = "Pause";
        btn.classList.toggle("btn-primary", false);
        btn.classList.toggle("btn-secondary", true);
        card.classList.toggle("bg-warning", false);
        card.classList.toggle("bg-success", true);
        state = "On";
        updateChrono();
        inter = setInterval(updateChrono, 1000);
        break;
    case "On":
        btn.innerHTML = "Start";
        btn.classList.toggle("btn-primary", true);
        btn.classList.toggle("btn-secondary", false);
        card.classList.toggle("bg-warning", true);
        card.classList.toggle("bg-success", false);
        state = "Off";
        clearInterval(inter);
        break;
    case "END":
        btn.innerHTML = "Finished";
        btn.classList.toggle("btn-primary", false);
        btn.classList.toggle("btn-secondary", true);
        btn.classList.add("disabled");
        card.classList.toggle("bg-warning", false);
        card.classList.toggle("bg-success", false);
        card.classList.add("bg-danger");
        clearInterval(inter);
        break;
    }
}
