/*
    Session

    Author : Raphael Castanier
    Email  : raphael.castanier@free.fr
    Date   : May 2020
*/

var interval;
var state = "Off";

var h = 0;
var m = 0;
var s = 0;

var current_phase_index = 1;
var current_cycle_index = 1;
var current_exercice_index = 0; // before first exercice starts

var nb_phases = session.phases.length;

var previous_phase = 0;
var previous_exercice = 0;

var current_exercice_time = 0;
var current_exercice_duration = 0;


/**
 * Changes current exercice to next one
 * Current exercice becomes passed
 * Next one becomes the current one
 */
function nextExercice() {
    console.log(current_phase_index, current_cycle_index, current_exercice_index);

    var nb_cycle = session.phases[current_phase_index-1].nb_cycle;
    var nb_exercices = session.phases[current_phase_index-1].exercices.length;

    if(current_exercice_index > 0) {
        // set current phas eand exercice back to normal
        let current_phase = document.getElementById('phase-'+current_phase_index);
        let current_cycle = document.getElementById('phase-'+current_phase_index+'-rep');
        let current_exercice = document.getElementById('phase-'+current_phase_index+'-exercice-'+current_exercice_index);

        current_phase.classList.toggle("collapse", true);
        current_exercice.classList.replace("bg-success", "bg-info");
    }

    current_exercice_index++;

    // if new exercice index is over number of exercices, go to next cycle
    if(current_exercice_index > nb_exercices) {
        current_exercice_index = 1;
        current_cycle_index++;

        // if new cycle is over number of cycles, go to next phase
        if(current_cycle_index > nb_cycle) {
            current_cycle_index = 1;
            current_phase_index++;

            // if new phase index is over number of phases, session is finished!
            if(current_phase_index==nb_phases+1) {
                state = "END";
                toggleChrono();
                return;
            }
        }
    }

    // update exercice duration and init time
    current_exercice_duration = session.phases[current_phase_index-1].exercices[current_exercice_index-1].duration;
    current_exercice_time = 0;

    // get current phase, cycle and exercice
    current_phase = document.getElementById('phase-'+current_phase_index);
    current_cycle = document.getElementById('phase-'+current_phase_index+'-rep');
    current_exercice = document.getElementById('phase-'+current_phase_index+'-exercice-'+current_exercice_index);

    // update their values
    current_phase.classList.toggle("collapse", false);
    current_cycle.innerHTML = current_cycle_index;
    current_exercice.classList.add("bg-success");
    current_exercice.classList.remove("bg-info", "bg-light");

    console.log(current_phase_index, current_cycle_index, current_exercice_index);
}


/**
 *  Updates current exercice time counter and canges it when finished
 */
function updateExercice() {
    if(current_exercice_time < current_exercice_duration) {
        current_exercice_time++;
    }
    else {
        nextExercice();
        current_exercice_time = 0;
    }
}


/**
 * Updates chronometer value
 */
function updateChrono() {
    updateExercice();
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


/**
 * Called when chronometer is hit
 * Changes state of chronometer and updates it
 */
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
        interval = setInterval(updateChrono, 1000);
        break;
    case "On":
        btn.innerHTML = "Start";
        btn.classList.toggle("btn-primary", true);
        btn.classList.toggle("btn-secondary", false);
        card.classList.toggle("bg-warning", true);
        card.classList.toggle("bg-success", false);
        state = "Off";
        clearInterval(interval);
        break;
    case "END":
        btn.innerHTML = "Finished";
        btn.classList.toggle("btn-primary", false);
        btn.classList.toggle("btn-secondary", true);
        btn.classList.add("disabled");
        card.classList.toggle("bg-warning", false);
        card.classList.toggle("bg-success", false);
        card.classList.add("bg-danger");
        clearInterval(interval);
        break;
    }
}
