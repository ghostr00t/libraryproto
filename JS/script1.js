$(document).ready(function () {
    function Album(title, artist, playcount) {
        this.newAlbum.name = title;
        this.newAlbum.artist.name = artist;
        this.newAlbum.playcount = playcount;
    }

    $("#albumInput").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#submit").click();
        }
    });

    $("#submit").on("click", function () {
        $("#modal").modal("show");
        playlist1.myAjax();
    
    });
    $("#closeModal").on("click", function () {
        $("#albumTable").empty();
    });
});

var playlist = function () {};

var returnedList;

var newAlbum = {};


playlist.prototype.myAjax = function () {
    var artist = document.getElementById('albumInput').value;
    var self = this;
    $.ajax({
        type: "GET",
        url: 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=' + artist + '&api_key=3c60da92d4028ba77acda77715e046d5&format=json&callback=?',
        dataType: 'json',
        cache: false,
        success: function (data) {
            returnedList = data;
            for (var i = 0; i < data.topalbums.album.length; i++) {
                var row = $('<tr data-returned-list-id="' + i + '"><td> <button class="addbtn">Add</button> </td><td>' + data.topalbums.album[i].artist.name + '</td><td>' + data.topalbums.album[i].name + '</td><td>' + data.topalbums.album[i].playcount + '</td></tr>');
                $('#albumTable').append(row);
            }
            $(".addbtn").on("click", function () {
                $('#albumTable').find('tr').click(function () {
                    var returnedListId = $(this).attr("data-returned-list-id");
                    newAlbum = returnedList.topalbums.album[returnedListId];
                    self.addAlbum(newAlbum);
                });

            });
        }
    });
};


playlist.prototype.myPlaylistArray = new Array();

playlist.prototype.stagePlaylist = function () {
    
    $("#stagePlaylistArea").empty();
    $.each(this.myPlaylistArray, function (index, value) {
        $("#stagePlaylistArea").append(
            "<tr>",
            "<td>" + value.artist.name + "</td>",
            "<td>" + value.name + "</td>",
            "<td>" + value.playcount + "</td>",
            "</tr>"
        )
    });
}

playlist.prototype.playPlaylist = function() {

    $("#displayPlaylistArea").empty();
    $.each(this.myPlaylistArray, function (index, value) {
        $("#displayPlaylistArea").append(
            "<tr>",
            "<td>" + value.artist.name + "</td>",
            "<td>" + value.name + "</td>",
            "<td>" + value.playcount + "</td>",
            "</tr>"
        )
    });


}

playlist.prototype.addAlbum = function (album) {
    for (i = 0; i < this.myPlaylistArray.length; i++) {
        if (this.myPlaylistArray[i].name == newAlbum.name) {
            return false;
        }
    }
    this.myPlaylistArray.push(album);
    this.stagePlaylist();
    return true;
};

playlist.prototype.removeAlbumByTitle = function (title) {
    for (var i = 0; i < this.myPlaylistArray.length; i++) {
        if (this.myPlaylistArray[i].name == name) {
            this.myPlaylistArray.splice(i, 1);
            return true;
        }
    }
    return false
}

playlist.prototype.removeAlbumByArtist = function (artist) {
    for (var i = 0; i < this.myPlaylistArray.length; i++) {
        if (this.myPlaylistArray[i].artist == artist) {
            this.myPlaylistArray.splice(i, 1);
            return true;
        }
    }
    return false
}

playlist.prototype.getRandomAlbum = function () {
    var randomAlbum = Math.floor(Math.random() * this.myPlaylistArray.length);
    return this.myPlaylistArray.length <= 0 ? null : this.myPlaylistArray[randomAlbum];
};

playlist.prototype.getAlbumByTitle = function (title) {
    var titleArray = new Array();
    for (var i = 0; i < this.myPlaylistArray.length; i++) {
        if (this.myPlaylistArray[i].title.indexOf(title) >= 0)
            titleArray.push(this.myPlaylistArray[i]);
    }
    return titleArray;
}

playlist.prototype.getAlbumsByArtist = function (artist) {
    var artistArray = new Array();
    for (var i = 0; i < this.myPlaylistArray.length; i++) {
        if (this.myPlaylistArray[i].artist.indexOf(artist) >= 0)
            artistArray.push(this.myPlaylistArray[i]);
    }
    return artistArray;
};
playlist.prototype.addAlbums = function (albums) {
    var num = 0;
    for (i = 0; i < albums.length; i++) {
        if (this.addAlbum(albums[i])) {
            num++;
        }
    }
    return num;
};

playlist.prototype.getArtists = function () {
    var artists = new Array();
    for (i = 0; i < this.myPlaylistArray.length; i++) {
        if (artists.indexOf(this.myPlaylistArray[i].artist) < 0) {
            artists.push(this.myPlaylistArray[i].artist);
        }
    }
    return artists;
}

playlist.prototype.getRandomArtistName = function () {
    var randomArtist = Math.floor(Math.random() * this.myPlaylistArray.length);
    return this.myPlaylistArray[randomArtist].artist;
};

var playlist1 = new playlist();