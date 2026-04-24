
/*
 * constants
 */
const errMessagePona = "o kepeken nanpa";
const errMessageLasina = "please use a real number";
const noneMessagePona = "sitelen pona li lon ni";
const noneMessageLasina = "sitelen Lasina li lon ni";

/*
 * the number input
 */
const numberInput = document.getElementById("number-input");

/*
 * load the readout objects
 */
const spReadout = document.getElementById("sp-readout");
const slReadout = document.getElementById("sl-readout");

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

    // trim the text
    txt = txt.trim();
    
    // parse the number
    let num = parseInt(txt);

    // if it isn't a number then return the messages
    if (num === NaN || num.toString() !== txt) {
        if (txt.trim() == "")
            return [
                noneMessagePona,
                noneMessageLasina
            ];
        else
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

    // trim the text
    txt = txt.trim();

    // parse the number
    let num = parseInt(txt);

    // if it isn't a number then return the messages
    if (num === NaN || num.toString() !== txt) {
        if (txt.trim() == "")
            return [
                noneMessagePona,
                noneMessageLasina
            ];
        else
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
 * translate using the normal number system
 */
function translateNasinNanpaPona(txt) {

    // trim the text
    txt = txt.trim();
    
    // parse the number
    let num = parseInt(txt);

    // if it isn't a number then return the messages
    if (num === NaN || num.toString() !== txt) {
        if (txt.trim() == "")
            return [
                noneMessagePona,
                noneMessageLasina
            ];
        else
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

    // prepare the string
    let finalString = "";

    // add the ales
    if (ales > 1) {
        let alesString = translateNasinNanpaPona(ales.toString());
        finalString += alesString[0] + " ale ";
    } else if (ales == 1) {
        finalString += "wan ale ";
    }

    // add the rest
    finalString = (finalString
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
        method: translateNasinNanpaPona
    },
    pu: {
        button: document.getElementById("button-pu"),
        method: translateNasinNanpaPu
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

    // re-write the number
    translateNumber(numberInput.value);
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

/*
 * translate a new string
 */
function translateNumber(txt) {

    // enforce string
    txt = txt.toString();

    // get the system
    const system = numberSystem[currentNumberSystem];

    // if the system is not real, ignore it
    if (typeof(system) == undefined) {
        return;
    }

    // translate
    let res = system.method(txt);

    // set each thing
    spReadout.innerText = res[0];
    slReadout.innerText = res[1];
}

/*
 * connect the number input
 */
numberInput.addEventListener("input", (_) => {
    translateNumber(numberInput.value);
});
