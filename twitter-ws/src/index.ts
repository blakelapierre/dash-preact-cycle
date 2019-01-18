import {env} from 'process';

import * as WebSocket from 'ws';

import * as Twitter from 'twitter';

const {
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
} = env;

const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
});

const server = new WebSocket.Server({
  port: 3333
});


server.on('connection', ws => {
  client
    .get(
      'statuses/user_timeline',
      {screen_name: 'blakelapierre', count: 3},
      (error, a, response) => {
        ws.send(JSON.stringify(a));
      });

  client.stream('statuses/filter', {track: '@blakelapierre'}, stream => {
    stream.on('data', event => {
      ws.send(JSON.stringify(event));
    });

    stream.on('error', error => {
      throw error;
    });
  });

  ws.on('message', message => {
    console.log('message', message);
  });
});