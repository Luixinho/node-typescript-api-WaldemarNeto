import { SetupServer } from './server';
import config from 'config';

(async (): Promise<void> => {
  const server = new SetupServer(config.get('App.port'));
  await server.init();
  server.start();
})();

// (async(): Promise<void> => {})(); esquema para criar e execultar função instântanemante
