function Album(title, artist, numberOfTracks, releaseDate) {
    this.title = title;
    this.artist = artist;
    this.numberOfTracks = numberOfTracks;
    this.releaseDate = releaseDate;
}

var playlist = function () {};

playlist.prototype.myPlaylistArray = new Array();

playlist.prototype.addAlbum = function (album) { //accepts album object 
    for (i = 0; i < this.myPlaylistArray.length; i++) {
        if (this.myPlaylistArray[i].title == album.title) {
            return false;
        }
    }
    this.myPlaylistArray.push(album);
    return true;
};

playlist.prototype.removeAlbumByTitle = function (title) { //accepts string
    for (var i = 0; i < this.myPlaylistArray.length; i++) {
        if (this.myPlaylistArray[i].title == title) {
            this.myPlaylistArray.splice(i, 1);
            return true;
        }
    }
    return false
}
// var albumLength = this.myPlaylistArray.length;
//   this.myPlaylistArray.map((album, index)=>{
//     if (album.title == title){
//       this.myPlaylistArray.splice(index, 1);
//     }
//   })
//   return (albumLength ==  this.myPlaylistArray.length) ? (false) : (true);
// };
playlist.prototype.removeAlbumByArtist = function (artist) { //accepts string
    for (var i = 0; i < this.myPlaylistArray.length; i++) {
        if (this.myPlaylistArray[i].artist == artist) {
            this.myPlaylistArray.splice(i, 1);
            return true;
        }
    }
    return false
}
// var albumLength = this.myPlaylistArray.length;
//   this.myPlaylistArray.map((album, index)=>{
//     if (album.artist == artist){
//       this.myPlaylistArray.splice(index, 1);
//     }
//   })
//   return (albumLength ==  this.myPlaylistArray.length) ? (false) : (true);
//};
playlist.prototype.getRandomAlbum = function () { //accepts string
    var randomAlbum = Math.floor(Math.random() * this.myPlaylistArray.length);
    return this.myPlaylistArray.length <= 0 ? null : this.myPlaylistArray[randomAlbum];
};

playlist.prototype.getAlbumByTitle = function (title) { //accepts string
    var titleArray = new Array();
    for (var i = 0; i < this.myPlaylistArray.length; i++) {
        if (this.myPlaylistArray[i].title.indexOf(title) >= 0)
            titleArray.push(this.myPlaylistArray[i]);
    }
    return titleArray;
}

playlist.prototype.getAlbumsByArtist = function (artist) { //accepts string
    var artistArray = new Array();
    for (var i = 0; i < this.myPlaylistArray.length; i++) {
        if (this.myPlaylistArray[i].artist.indexOf(artist) >= 0)
            artistArray.push(this.myPlaylistArray[i]);
    }
    return artistArray;
};
playlist.prototype.addAlbums = function (albums) { //accepts array
    var num = 0;
    for (i = 0; i < albums.length; i++) {
        if (this.addAlbum(albums[i])) {
            num++;
        }
    }
    return num;
};
// albums.map((album) => {
//     this.myPlaylistArray.push(album)
// })
// return this.myPlaylistArray;

playlist.prototype.getArtists = function () {
    var artists = new Array();
    for (i = 0; i < this.myPlaylistArray.length; i++) {
        if (artists.indexOf(this.myPlaylistArray[i].artist) < 0) {
            artists.push(this.myPlaylistArray[i].artist);
        }
    }
    return artists;
}

playlist.prototype.getRandomArtistName = function () { //accepts array
    var randomArtist = Math.floor(Math.random() * this.myPlaylistArray.length);
    return this.myPlaylistArray[randomArtist].artist;
};

var playlist1 = new playlist();

var album1 = new Album("Dark Side of the Moon", "Pink Floyd", 9, "1973-3-1");
var album2 = new Album("Sgt. Pepper's Lonely Hearts Club Band", "The Beatles", 13, "1967-6-1");
var album3 = new Album("Led Zeppelin IV (aka ZOSO)", "Led Zeppelin", 8, "1971-11-8");
var album4 = new Album("Nevermind", "Nirvana", 12, "1991-9-24");
var album5 = new Album("Ok Computer", "Radiohead", 12, "1997-5-21");
var album6 = new Album("The Wall", "Pink Floyd", 26, "1979-11-30");
// playlist1.addAlbum(album1);
// playlist1.addAlbum(album2);
// playlist1.addAlbum(album3);
// playlist1.addAlbum(album4);
// playlist1.addAlbum(album5);
// playlist1.addAlbum(album6);

//localStorage.setItem("albums", JSON.stringify(playlist1.myPlaylistArray));