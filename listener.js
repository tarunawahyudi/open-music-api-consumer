class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, userId, targetEmail } = JSON.parse(message.content.toString());
      const songs = await this._playlistsService.getSongsFromPlaylist(playlistId, userId);
      console.log('ini sendEmail method: ', this._mailSender.sendEmail());
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(songs));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
