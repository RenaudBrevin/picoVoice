var countValue = document.getElementById("count");
var colorPart = document.querySelectorAll(".color-part");
var container = document.querySelector(".container");
var start = document.querySelector("#start");
var result = document.querySelector("#result");
var wrapper = document.querySelector(".wrapper");

var colors = {
    vert: {
        basic: "#068e06",
        new: "#11e711",
    },
    rouge: {
        basic: "#950303",
        new: "#fd2a2a",
    },
    bleu: {
        basic: "#01018a",
        new: "#2062fc",
    },
    jaune: {
        basic: "#919102",
        new: "#fafa18",
    },
};

let randomColors = [];
let pathGeneratorBool = false;
let count,
    clickCount = 0;

start.addEventListener("click", () => {
    count = 0;
    clickCount = 0;
    randomColors = [];
    pathGeneratorBool = false;
    wrapper.classList.remove("hide");
    container.classList.add("hide");
    pathGenerate();

    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;

    var recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener("result", (e) => {
        var transcript = Array.from(e.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join("");

        console.log(transcript);
        transcript = transcript.toLowerCase().split(" ");
        if (transcript.includes("vert")) {
            colorPart[0].click();
        } else if (transcript.includes("rouge")) {
            colorPart[1].click();
        } else if (transcript.includes("bleu")) {
            colorPart[2].click();
        } else if (transcript.includes("jaune")) { 
            colorPart[3].click();
        }
});

function pathGenerate() {
    randomColors.push(randomvalue(colors));
    count = randomColors.length;
    pathGeneratorBool = true;
    pathDecide(count);
}

function randomvalue(obj) {
    let arr = Object.keys(obj);
    return arr[Math.floor(Math.random() * arr.length)];
}

async function pathDecide(count) {
    countValue.innerText = count;
    for (let i of randomColors) {
        let basicColor = document.querySelector(`.${i}`);
        await delay(500);
        basicColor.style.backgroundColor = colors[i]["new"];
        await delay(600);
        basicColor.style.backgroundColor = colors[i]["basic"];
        await delay(600);
    }
    pathGeneratorBool = false;
}

async function delay(time) {
    return await new Promise((resolve) => {
    setTimeout(resolve, time);
    });
}

colorPart.forEach((element) => {
    element.addEventListener("click", async (e) => {
    if (pathGeneratorBool) {
        return false;
    }
    if (e.target.classList[0] == randomColors[clickCount]) {
        e.target.style.backgroundColor = `${
        colors[randomColors[clickCount]]["new"]
    }`;
    await delay(500);

    e.target.style.backgroundColor = `${
        colors[randomColors[clickCount]]["basic"]
    }`;

    clickCount += 1;

    if (clickCount == count) {
        clickCount = 0;
        pathGenerate();
    }
    } else {
        lose();
    }
});
});

recognition.addEventListener('end', () => {
    // Si la reconnaissance de la parole est terminée, redémarrer l'écoute
    if (speech == true) {
        recognition.start();
    }
});

if (speech == true) {
    recognition.start();
}
});

function lose() {
    result.innerHTML = 'Votre scrore : ' + count;
    result.classList.remove("hide");
    container.classList.remove("hide");
    wrapper.classList.add("hide");
    start.innerText = "Rejouer";
    start.classList.remove("hide");
};