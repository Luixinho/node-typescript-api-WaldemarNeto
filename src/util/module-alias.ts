import * as path from 'path';
import moduleAlias from 'module-alias';

const files = path.resolve(__dirname, '../..');

moduleAlias.addAliases({
  '@src': path.join(files, 'src'),
  '@test': path.join(files, 'test'),
});

// configurando para usar atalhos nos diretórios para imports mais breves como @src/
// ao invés de ter que voltar diretórios com ../../
