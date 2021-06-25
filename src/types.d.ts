import * as http from 'http';
import { DecodedUser } from './services/auth';

declare module 'express-serve-static-core' {
  // extends esta pegando todas as informações do typo Requestq ue já existe e adicionando o que esta a mais ali, caso contrário ele só sobrescreveria com oq eu colocasse ali
  export interface Request extends http.IncomingMessage, Express.Request {
    decoded?: DecodedUser;
  }
}
