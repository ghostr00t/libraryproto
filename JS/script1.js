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

    $("#closeModa2").on("click", function () {
        $("#albumTable").empty();
    });

    $("#addSelected").on("click", function () {
        var albums = [];
        var checked = $(".search-results-checkbox:checked").each(function () {
            var index = $(this).parent().parent().data('returned-list-id');
            albums.push(returnedList.topalbums.album[index]);
        });
        playlist1.addAlbums(albums);
        $("#modal").modal("hide");
        $("#albumTable").empty();
    });

    $("#delete-artist").on("click", function () {
        var artistName = $("#delArtist").val();
        playlist1.removeAlbumByArtist(artistName);
        playlist1.stagePlaylist();
    });

    $("#delete-title").on("click", function () {
        var titleName = $("#delTitle").val();
        playlist1.removeAlbumByTitle(titleName);
        playlist1.stagePlaylist();
    });

    $("#get-artist").on("click", function () {
        var artistName = $("#delArtist").val();
        var albums = playlist1.getAlbumsByArtist(artistName);
        $("#modal-pop").modal("show");

        $("#modal-pop-content").empty();
        $.each(albums, function (index, value) {
            $("#modal-pop-content").append(
                "<tr>",
                "<td>" + value.artist.name + "</td>",
                "<td>" + value.name + "</td>",
                //"<td>" + value.playcount + "</td>",
                "</tr>"
            )
        });
    });

    $("#get-title").on("click", function () {
        var titleName = $("#delTitle").val();
        var albums = playlist1.getAlbumByTitle(titleName);
        $("#modal-pop").modal("show");

        $("#modal-pop-content").empty();
        $.each(albums, function (index, value) {
            $("#modal-pop-content").append(
                "<tr>",
                "<td>" + value.artist.name + "</td>",
                "<td>" + value.name + "</td>",
                //"<td>" + value.playcount + "</td>",
                "</tr>"
            )
        });
    });

    $("#show-artists").on("click", function () {
        var artists = playlist1.getArtists();
        $("#modal-pop").modal("show");
        $("#modal-pop-content").empty();
        $.each(artists, function (index, value) {
            $("#modal-pop-content").append(
                "<tr>",
                "<td>" + value + "</td>",
                //"<td>" + value.name + "</td>",
                //"<td>" + value.playcount + "</td>",
                "</tr>"
            )
        });
    })

    $("#random-album").on("click", function () {
        var randomAlbum = playlist1.getRandomAlbum();
        $("#modal-pop").modal("show");
        $("#modal-pop-content").empty();
        $("#modal-pop-content").append(
            "<tr>",
            "<td>" + randomAlbum.artist.name + "</td>",
            "<td>" + randomAlbum.name + "</td>",
            //"<td>" + value.playcount + "</td>",
            "</tr>"
        )
    });

    $("#random-artist").on("click", function () {
        var randomArtist = playlist1.getRandomArtistName();
        $("#modal-pop").modal("show");
        $("#modal-pop-content").empty();
        $("#modal-pop-content").append(
            "<tr>",
            "<td>" + randomArtist.name + "</td>",
            //"<td>" + randomAlbum.name + "</td>",
            //"<td>" + value.playcount + "</td>",
            "</tr>"
        )
    });
});

var playlist = function () { };

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
                var row = $('<tr data-returned-list-id="' + i + '"><td><input type="checkbox" class="search-results-checkbox"></td><td> <button class="addbtn">Add</button> </td><td>' + data.topalbums.album[i].artist.name + '</td><td>' + data.topalbums.album[i].name + '</td><td>' + data.topalbums.album[i].playcount + '</td></tr>');
                $('#albumTable').append(row);
            }
            $(".addbtn").on("click", function () {
                var returnedListId = $(this).parent().parent().data("returned-list-id");
                self.addAlbum(returnedList.topalbums.album[returnedListId]);
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
            //"<td>" + value.playcount + "</td>",
            "</tr>"
        )
    });
}

playlist.prototype.addAlbum = function (album) {
    for (var i = 0; i < this.myPlaylistArray.length; i++) {
        if (this.myPlaylistArray[i].name == album.name) {
            return false;
        }
    }
    this.myPlaylistArray.push(album);
    this.stagePlaylist();
    return true;
};

playlist.prototype.removeAlbumByTitle = function (title) {
    var playlistLength = this.myPlaylistArray.length;
    for (var i = playlistLength - 1; i > -1; i--) {
        if (this.myPlaylistArray[i].name == title) {
            this.myPlaylistArray.splice(i, 1);
        }
    }
}

playlist.prototype.removeAlbumByArtist = function (artist) {
    var playlistLength = this.myPlaylistArray.length;
    for (var i = playlistLength - 1; i > -1; i--) {
        if (this.myPlaylistArray[i].artist.name == artist) {
            this.myPlaylistArray.splice(i, 1);
        }
    }
}

playlist.prototype.getRandomAlbum = function () {
    var randomAlbum = Math.floor(Math.random() * this.myPlaylistArray.length);
    return this.myPlaylistArray.length <= 0 ? null : this.myPlaylistArray[randomAlbum];
};

playlist.prototype.getAlbumByTitle = function (title) {
    var titleArray = new Array();
    for (var i = 0; i < this.myPlaylistArray.length; i++) {
        if (this.myPlaylistArray[i].name.indexOf(title) >= 0)
            titleArray.push(this.myPlaylistArray[i]);
    }
    return titleArray;
}

playlist.prototype.getAlbumsByArtist = function (artist) {
    var artistArray = new Array();
    for (var i = 0; i < this.myPlaylistArray.length; i++) {
        if (this.myPlaylistArray[i].artist.name.indexOf(artist) >= 0)
            artistArray.push(this.myPlaylistArray[i]);
    }
    return artistArray;
};
playlist.prototype.addAlbums = function (albums) {
    var num = 0;
    for (var i = 0; i < albums.length; i++) {
        if (this.addAlbum(albums[i])) {
            num++;
        }
    }
    return num;
};

playlist.prototype.getArtists = function () {
    var artists = new Array();
    for (i = 0; i < this.myPlaylistArray.length; i++) {
        if (artists.indexOf(this.myPlaylistArray[i].artist.name) < 0) {
            artists.push(this.myPlaylistArray[i].artist.name);
        }
    }
    return artists;
}

playlist.prototype.getRandomArtistName = function () {
    var randomArtist = Math.floor(Math.random() * this.myPlaylistArray.length);
    return this.myPlaylistArray[randomArtist].artist;
};

var playlist1 = new playlist();

playlist.prototype.storeStuff = function () {
    if(typeof(Storage) !=="undefined") {
        localStorage["musicArray"] = JSON.stringify(this.myPlaylistArray);
    } else {
        return false;
    }
}

playlist.prototype.getStuff = function () {
    if(typeof(Storage) !=="undefined") {
        return JSON.parse(localStorage.getItem("musicArray"));
    } else {
        return false;
    }
}