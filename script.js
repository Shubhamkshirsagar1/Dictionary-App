const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");

const btn = document.getElementById("search-btn");

function rendorMeaning() {
    let inpWord = document.getElementById("inp-word").value;
    // console.log(inpWord);

    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then(data => {

            console.log(data);

            let phoneticval = "";
            if (data[0].phonetic) {
                phoneticval = data[0].phonetic;
            }

            result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fa fa-volume-up" aria-hidden="true"></i>
                    </button>
                </div>

                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>${phoneticval}</p>
                </div>

                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>

                <p class="word-example">
                <span>Synonym</span> : ${data[0].meanings[0].definitions[0].synonyms ? data[0].meanings[0].definitions[0].synonyms : null}
                </p>`;

            sound.setAttribute('src', `${data[0].phonetics[0].audio}`);
            console.log(sound);
        }).catch(() => {
            result.innerHTML = `<h3 class="error"> Couldn't Find The Word </h3>`;
        })
}


function playSound() {
    sound.play();
}

btn.addEventListener('click', rendorMeaning)

// <p>${data[0]?.phonetic}</p>
// {data[0].phonetic?<p>{data[0].phonetic}</p>:null}