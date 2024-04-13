class Listener {
  constructor(mailSender, playlistService) {
    this._mailSender = mailSender;
    this._playlistService = playlistService;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { targetEmail, playlistId } = JSON.parse(message.content.toString());

      const songs = await this._playlistService.getSongsFromPlaylist(playlistId);
      console.log('result query: ', songs);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(songs));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
