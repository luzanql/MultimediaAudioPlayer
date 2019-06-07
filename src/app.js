let ap = null;

function start(){
    ap = new AudioPlayer({

        songs: [
            new Song("For the Damaged", "Blonde Redhead", "assets/3.jpg", "songs/3.mp3"),
            new Song("Bohemian Rapsody", "Queen", "assets/bohemian.jpg", "songs/3.mp3"),
            new Song("Destino", "Greycy", "assets/destino.jpg", "songs/1.mp3"),
            new Song("We area young", "Fun ft Janelle Monáe", "assets/somenights.jpg", "songs/weareyoung.mp3")
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
            back: document.querySelector(".previous"),
            next: document.querySelector(".next")
        }

        
    });
}