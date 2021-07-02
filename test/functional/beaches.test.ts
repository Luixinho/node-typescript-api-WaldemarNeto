import { Beach } from '@src/models/beach';
import { User } from '@src/models/user';
import AuthService from '@src/services/auth';

describe('Beaches functional tests', () => {
  const defaultUser = {
    name: 'John Doe',
    email: 'john2@mail.com',
    password: '1234',
  };

  let token: string;
  // deletar todas as praias do banco de dados para garantir que os estados de teste estarão limpos
  beforeEach(async () => {
    await Beach.deleteMany({});
    await User.deleteMany({});
    const user = await new User(defaultUser).save();
    token = AuthService.generateToken(user.toJSON());
  });
  // teste para criação de uma nova praia
  describe('When creating a beach', () => {
    it('should create a beach with success', async () => {
      const newBeach = {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: 'E',
      };

      const response = await global.testRequest
        .post('/beaches')
        .set({ 'x-access-token': token })
        .send(newBeach);
      expect(response.status).toBe(201);
      // expect.objectContaining fala pra ele procurar isso que estou passando como parte da resposta, como uma parte contida no que ele vai receber ao inves de esperar que oq eu recebo seja exatamente isso
      expect(response.body).toEqual(expect.objectContaining(newBeach));
    });

    it('should return 422 when there is a validation error', async () => {
      const newBeach = {
        lat: 'invalid_string',
        lng: 151.289824,
        name: 'Manly',
        position: 'E',
      };
      const response = await global.testRequest
        .post('/beaches')
        .set({ 'x-access-token': token })
        .send(newBeach);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        code: 422,
        error: 'Unprocessable Entity',
        message:
          'Beach validation failed: lat: Cast to Number failed for value "invalid_string" (type string) at path "lat"',
      });
    });

    it.skip('should return 500 when there is any error other than validation error', async () => {
      //TODO think in a way to throw a 500
    });
  });
});
