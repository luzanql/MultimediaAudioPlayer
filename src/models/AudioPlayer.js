class AudioPlayer {

    constructor(params) {
      
        this.songs = [];
        this.queue = [];
        this.player = new Audio();
        let song = null;
       // this._song = null;

        this._gui = {
            progressBar: { value: null, DOMElement: null },
            artistName: { value: null, DOMElement: null },
            songName: { value: null, DOMElement: null },
            currentTime: { value: null, DOMElement: null },
            totalTime: { value: null, DOMElement: null },
            albumCover: { value: null, DOMElement: null }
        };
  
        if (params.hasOwnProperty("gui")) {
            var { progressBar, artistName, songName, currentTime, totalTime, albumCover } = params.gui; 
            this._initGUI(progressBar, artistName, songName, currentTime, totalTime, albumCover);
        }

       

        this._buttons = {
            queue: null,
            volume: null,
            back: null,
            playPause: null,
            next: null,
            add: null
        }
    
       // this._loadSong(this.song.file);

        if (params.hasOwnProperty("buttons")) {
            var { queue, volume, back, playPause, next, add } = params.buttons;
            this._initButtons(queue, volume, back, playPause, next, add);
        }

        if (params.hasOwnProperty("songs")) {
            this._songs = params.songs;
            this._setSong(params.songs[0]);
            this._queue = [...params.songs];
            this._queue.shift();
        }

    }

    _setSong(songData){
       
        this.song  = new Song(songData.name, songData.artist, songData.cover, songData.file);
        this.gui.songName["value"] = this.song.name;
        this.gui.artistName["value"] = this.song.artist;
        this.gui.albumCover["value"] = this.song.cover;
        this._loadSong(this.song.file);
        
    }


    _loadSong(src) {
        this.player.src = src;
        this.player.onloadedmetadata = () => {
            this.gui = {
                totalTime: { value: this.player.duration, DOMElement: this.gui.totalTime.DOMElement },
                currentTime: { value: 0, DOMElement: this.gui.currentTime.DOMElement }
            }
        }
        this.player.ontimeupdate = () => {
            
            this.gui = {
                currentTime: { value: this.player.currentTime, DOMElement: this.gui.currentTime.DOMElement }
            }
            var [totalTime, currentTime] = [this.gui.totalTime.value, this.gui.currentTime.value];
            var progress = (currentTime / totalTime) * 100;
            let pBar = this.gui.progressBar.DOMElement.querySelector("div");
            pBar.style.width = `${progress}%`;
        }
    }

    _initGUI(...params) {
        
        this.gui = {
            progressBar: params[0] || { value: null, DOMElement: null },
            artistName: params[1] || { value: null, DOMElement: null },
            songName: params[2] || { value: null, DOMElement: null },
            currentTime: params[3] || { value: null, DOMElement: null },
            totalTime: params[4] || { value: null, DOMElement: null },
            albumCover: params[5] || { value: null, DOMElement: null }
        };
       
    }

    _initButtons(...params) {
        this.buttons = {
            queue: params[0] || null,
            volume: params[1] || null,
            back: params[2] || null,
            playPause: params[3] || null,
            next: params[4] || null,
            add: params[5] || null
        };
    }

    _addClickEvent(element, callback) {
        
        if (element instanceof HTMLElement) {
            element.onclick = callback;
        } else {
            if (element.hasOwnProperty("DOMElement")) {
                element = element.DOMElement;
                if (element instanceof HTMLElement) {
                    element.onclick = callback;
                }
            }
        }
    }

    _toggleIcon(el, aClass, bClass) {
        let i = el.querySelector("i");
        if (i.classList.contains(aClass)) {
            var [a, b] = [aClass, bClass];
        } else {
            var [b, a] = [aClass, bClass];
        }
        i.classList.remove(a);
        i.classList.add(b);
    }

    _assignValues(toAssign, elements, actions = []) {
       
        const keys = Object.keys(elements);

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (elements[key] != null) {
                toAssign[key] = elements[key];
                if (Object.keys(actions).length > 0) {
                    if (actions.hasOwnProperty(key)) {
                        this._addClickEvent(toAssign[key], actions[key]);
                    }
                }
            }
        }
    }

    set buttons(btns) {
        let actions = {
            playPause: () => {
                if (this.player.paused) {
                    this.player.play();
                } else {
                    this.player.pause();
                }
                this._toggleIcon(this.buttons.playPause, "fa-play", "fa-pause");
            },
            queue: () => false,
            volume: () => {
                this.player.volume = (this.player.volume != 0) ? 0 : 1
                this._toggleIcon(this.buttons.volume, "fa-volume-up", "fa-volume-mute");

            },
            back: () => this.player.currentTime = 0,    
            next: () => {
                this._setSong(this._queue[0]);
                this.player.play();
                this._queue.shift();

            },
            add: () => false,

        }
        this._assignValues(this._buttons, btns, actions);
    }

    get buttons() {
        return this._buttons;
    }

    set gui(elments) {
       
        let actions = {
            progressBar: (e) => {
                let x = e.offsetX;
                let w = this.gui.progressBar.DOMElement.offsetWidth;
                let newCurrentTime = this.gui.totalTime.value * (x/w);
                this.player.currentTime = newCurrentTime;
                this.gui = {
                    currentTime: {value: newCurrentTime, DOMElement: this.gui.currentTime.DOMElement}
                }
            }
        }
        this._assignValues(this._gui, elments, actions);
        this._updateBasigGUIElement(this.gui.totalTime);
        this._updateBasigGUIElement(this.gui.currentTime);
        this._updateBasigGUIElement(this.gui.songName);
        this._updateBasigGUIElement(this.gui.artistName);
        this._updateBasigGUIElement(this.gui.albumCover);
    }

    _updateBasigGUIElement(el) {
   
        if (el.DOMElement instanceof HTMLElement) {
            if (el.DOMElement.tagName == "TIME"){
            let min =  Math.floor( el.value / 60 );
            let sec  = Math.floor(el.value % 60);
            min = min < 10 ? '0' + min : min;
            sec = sec < 10 ? '0' + sec : sec;
            el.DOMElement.innerHTML = min + ":" + sec;
            }else if (el.DOMElement.id == "player"){
                el.DOMElement.style.backgroundImage="url("+el.value+")";
            } 
            else{
                el.DOMElement.innerHTML = el.value;
            }
           
        }
    }

    get gui() {
        return this._gui;
    }
}