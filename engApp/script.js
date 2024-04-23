const lessons = {
    1: {
        name: "The meeting",
        dialogue: "-Hello! <br>-Hi! <br>-How are you?<br>-I am good, what about you?<br>-I am good too, thanks!",
        commentaire: '',
    },
    2: {
        name: "Introduce Yourself",
        dialogue: "-What's your name?<br>-My name is Jessica, what is your name?<br>-My name is Jack, nice to meet you!<br>-Nice to meet you too!",
        commentaire: '',
    },
    3: {
        name: "",
        dialogue: "",
        commentaire: '',
    },
}
const mots = {
    'hello':"Salutation<br>Similire à Hi mais plus neutre",
    'hi':"Salutation.<br>Similaire à Hello mais en plus amical.",
    "how":'Mot Wh<br>-->Comment',
    "are":"Verbe<br>Conjuguaison du verbe être (be) pour nous (we), vous (you) et ils/elles (they)",
    "is":"Verbe<br>Conjuguaison du verbe être (be) pour il/elle/ce (he/she/it)",
    "am":"Verbe<br>Conjuguaison du verbe être (be) pour je (I)",
    "i":"Pronom personnel<br>Je",
    "you":"Pronom personnel<br>Tu ou vous (pas de différence en anglais)",
    "he":"Pronom personnel<br>Il",
    "she":"Pronom personnel<br>Elle",
    "it":"Pronom personnel<br>Ce/ça",
    "we":"Pronom personnel<br>Nous",
    "they":"Pronom personnel<br>Ils/elles (mixte)",
    "be":"Verbe<br>Être",
}

const expliquer = document.querySelector("#explica_p")

function showExpl(word) {
    var mot = word.toLowerCase();
    if (word.substring(0,1) == "-") {
        mot = mot.substring(1)
    }
    expliquer.innerHTML = mots[mot];
    document.querySelector("#explication").id = "explication_shown"
}

function EachWordListened(where, callback) {
    const paragraph = document.querySelector(where);
    const wordsAndBreaks = paragraph.innerHTML.split(/(<br>| )/);
    paragraph.innerHTML = wordsAndBreaks.map(item => {
        if (item.trim() === '<br>') {
            return '<br>';
        } else if (item.trim().startsWith("-")) {
            if (item.trim().length > 1) {
                const wordWithoutHyphen = item.substring(1);
                const punctuationIndex = wordWithoutHyphen.search(/[.!?]/);
                if (punctuationIndex !== -1) {
                    const word = wordWithoutHyphen.substring(0, punctuationIndex + 1);
                    const punctuation = wordWithoutHyphen.substring(punctuationIndex + 1);
                    return `<span>${item.substring(0,1)}${word}</span>${punctuation}`;
                } else {
                    return `<span>${item}</span>`;
                }
            } else {
                return `<span>${item}</span>`;
            }
        } else if (item.trim().endsWith(".") || item.trim().endsWith("!") || item.trim().endsWith("?")) {
            const wordWithoutPunctuation = item.substring(0, item.length - 1);
            return `<span>${item.substring(0, 1)}${wordWithoutPunctuation.substring(1)}</span>${item.substring(item.length - 1)}`;
        } else if (item == " ") {
            return " ";
        } else if (item == "") {
            return "";
        } else {
            return `<span>${item}</span>`;
        }
    }).join('');
    const spans = document.querySelectorAll(where + " span");
    spans.forEach(span => {
        span.addEventListener('click', function () {
            callback(span.textContent.trim());
        });
    });
};


var current_lesson = lessons[2]

document.querySelector("#lesson_name").innerHTML = current_lesson.name;
document.querySelector("#dialogue").innerHTML = current_lesson.dialogue;
EachWordListened("#dialogue", showExpl);
