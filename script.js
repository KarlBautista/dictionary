
const searchWordBtn = document.getElementById("search-word-btn");
const wordDefinition = document.getElementById("word-definition");
const displayContainer = document.getElementById("display-container");




const searchWord = () => {
    const inputWord = document.getElementById("input-word").value;
    const urlApi = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`;
    
    try{
        fetch(urlApi).then(response => response.json())
        .then(data => {
            displayWordInfo(data)
        }
    );} catch (err) {
         console.error(`Cannot get the data: ${err}`)
        }
}


searchWordBtn.addEventListener('click', searchWord);
document.addEventListener('keydown', (e) => {
    if(e.key === "Enter"){
        searchWord();
    }
} )


const displayWordInfo = (data) => { console.log(data)
  displayContainer.innerHTML = "";
     if(data.title){
        let noWordFound = document.createElement("p");
        noWordFound.textContent = `${data.title}. ${data.message}. ${data.resolution}`
        displayContainer.appendChild(noWordFound)
     }
     
     if(data[0].word){
        let word = document.createElement("p");
        word.textContent = data[0].word;
        displayContainer.appendChild(word);
     }


    if(data[0].phonetics[0].audio){
        let voice = new Audio(data[0].phonetics[0].audio)
        const voiceBtn = document.createElement("button");
        voiceBtn.textContent = "sound";
        voiceBtn.addEventListener('click', () => voice.play());
        displayContainer.appendChild(voiceBtn);
    } else {
        let NoVoice = document.createElement("p");
        NoVoice.textContent = "no voice";
        displayContainer.appendChild(NoVoice);
    }
 

        console.log(data[0].meanings.length)
    for(let i = 0; i<data[0].meanings.length; i++){
        let partOfSpeech = document.createElement('div');
        let wordDefinition = document.createElement('div');
        
        partOfSpeech.textContent = data[0].meanings[i].partOfSpeech;
        displayContainer.appendChild(partOfSpeech);

         if(data[0].meanings[i].definitions.length > 1) {
            data[0].meanings[i].definitions.forEach(def => {
                let multiDefinition = document.createElement('div');
                 multiDefinition.textContent = def.definition;
                 displayContainer.appendChild(multiDefinition);

            })
         
        }
        else{
             wordDefinition.textContent = data[0].meanings[i].definitions[0].definition;
              displayContainer.appendChild(wordDefinition);
        }
       
    
      
       
 }



}