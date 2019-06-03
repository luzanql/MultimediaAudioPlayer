let ap = null;

function start(){
    ap = new AudioPlayer({

        songs: [
            new Song("Bohemian Rapsody", "Queen", "assets/bohemian.jpg", "songs/3.mp3"),
            new Song("Destino", "Greycy", "destino.jpg", "1.mp3"),
            new Song("Lately", "Wet", "conver.jpg", "3.mp3")
        ] ,
      
        gui:{
            albumCover: { value:null, DOMElement: document.querySelector("#player")},
            totalTime: {value: "0:00", DOMElement: document.querySelector(".totalTime")},
            currentTime: {value: "0:00", DOMElement: document.querySelector(".currentTime")},
            progressBar: {value: "0:00", DOMElement: document.querySelector(".progressBar")},
            songName:  {value: null, DOMElement: document.querySelector(".info .songName")},
            artistName:  {value: null, DOMElement: document.querySelector(".info .artistName")}
            
        },
        buttons:{
            playPause: document.querySelector(".play"),
            volume: document.querySelector(".volume"),
            back: document.querySelector(".previous")
        }

        
    });
}