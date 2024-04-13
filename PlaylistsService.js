const { Pool } = require('pg');


class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsFromPlaylist(playlistId, userId) {
    const playlistQuery = {
      text: 'SELECT p.id, p.name, u.username FROM playlists p LEFT JOIN users u ON p.owner=u.id WHERE p.id = $1 AND u.id = $2',
      values: [playlistId, userId],
    };

    const resultPlaylist = await this._pool.query(playlistQuery);
    if (!resultPlaylist.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    const playlist = resultPlaylist.rows[0];
    console.log('ini playlist: ', playlist);

    const songsQuery = {
      text: 'SELECT * FROM playlist_songs ps INNER JOIN songs s ON s.id=ps.song_id WHERE ps.playlist_id = $1',
      values: [playlistId],
    };

    const resultSongs = await this._pool.query(songsQuery);
    const songs = resultSongs.rows;

    console.log('ini songs: ', songs);

    return {
      id: playlist.id,
      name: playlist.name,
      songs: songs.map((song) => ({
        id: song.id,
        title: song.title,
        performer: song.performer,
      })),
    };
  }
}

module.exports = PlaylistsService;
