
/*
 * constants
 */
const errMessageLasina = "please use a real number";
const errMessagePona = "o kepeken nanpa";

/*
 * numbers used by nasin nanpa kije
 */
const nasinNanpaKijeNumbers = {
    "0": "kijetesantakalu",
    "1": "kijetesantakalu",
    "2": "kijetesantakalu",
    "3": "kijetesantakalu",
    "4": "kijetesantakalu",
    "5": "kijetesantakalu",
}

/*
 * translate something to nasin nanpa kijetesantakalu
 */
function translateNasinNanpaKije(txt) {

    // parse the number
    let num = parseInt(txt);

    // if it isn't a number then return the messages
    if (num === NaN) {
        return [
            errMessagePona,
            errMessageLasina
        ];
    }

    // convert into base 6
    let base6String = num.toString(6);

    // final string
    let finalString = "";

    // translate each char
    for (let char of base6String) {
        finalString += nasinNanpaKijeNumbers[char] + " ";
    }

    // trim it
    finalString = finalString.trimEnd();

    // return the number
    return [
        finalString,
        finalString
    ];
}

/*
 * translate something into nasin nanpa pu
 */
function translateNasinNanpaPu(txt) {

    // parse the number
    let num = parseInt(txt);

    // if it isn't a number then return the messages
    if (num === NaN) {
        return [
            errMessagePona,
            errMessageLasina
        ];
    }

    // the amount of ales
    let ales = Math.floor(num / 100);
    let remainder = num % 100;

    // the amount of mutes
    let mutes = Math.floor(remainder / 20);
    remainder = remainder % 20;

    // the amount of lukas
    let lukas = Math.floor(remainder / 5);
    remainder = remainder % 5;

    // the amount of tus; remainder is the amount of "tu"s
    let tus = Math.floor(remainder / 2);
    remainder = remainder % 2;

    // convert it into a string
    let finalString = (
        "ale ".repeat(ales)
        + "mute ".repeat(mutes)
        + "luka ".repeat(lukas)
        + "tu ".repeat(tus)
        + "wan ".repeat(remainder))
        .trimEnd();

    // return the text
    return [
        finalString,
        finalString
    ];
}

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
        method: translateNasinNanpaKije
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