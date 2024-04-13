require('dotenv').config();
const amqp = require('amqplib');
const MailSender = require('./src/MailSender');
const Listener = require('./src/listener');
const PlaylistService = require('./src/PlaylistsService');

const init = async () => {
  const playlistService = new PlaylistService();
  const mailSender = new MailSender();
  const listener = new Listener(mailSender, playlistService);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:songs', {
    durable: true,
  });

  channel.consume('export:songs', listener.listen, { noAck: true });
}

init();
