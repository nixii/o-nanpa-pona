
/*
 * store the number system info
 */
const numberSystem = {
    pona: {
        button: document.getElementById("button-pona"),
    },
    pu: {
        button: document.getElementById("button-pu"),
    },
    kije: {
        button: document.getElementById("button-kije"),
    }
};

/*
 * the  currently selected number system
 */
var currentNumberSystem = "pona";

/*
 * arbitrarily swap number system
 */
function swapNumberSystem(to) {

    // ignore it if the system is the same
    if (to == currentNumberSystem) {
        return;
    }

    // get the objects storing info
    const currentSystem = numberSystem[currentNumberSystem];
    const newSystem = numberSystem[to];

    // skip if the new system doesn't exist
    if (typeof(newSystem) == "undefined") {
        console.log("attempted to change to undefined system " + to);
        return;
    }

    // disable the current system
    currentSystem.button.classList.remove("selected");

    // enable the new system
    newSystem.button.classList.add("selected");
    currentNumberSystem = to;
}

/*
 * swap the currently used number system to nasin nanpa pona
 *  (normal toki pona)
 */
function useNasinNanpaPona() {
    swapNumberSystem("pona");
}

/*
 * swap the currently used number system to nasin nanpa pu
 *  (simpler, original number system)
 */
function useNasinNanpaPu() {
    swapNumberSystem("pu");
}

/*
 * swap the currently used number system to nasin nanpa kijetesantakalu
 *  (most very useful yes yes)
 */
function useNasinNanpaKijetesantakalu() {
    swapNumberSystem("kije");
}