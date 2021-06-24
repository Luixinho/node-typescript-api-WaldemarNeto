import bcrypt from 'bcrypt';

export default class AuthService {
  // usando bcrypt para criptografar as senhas dos usuários
  public static async hashPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  // usando bcrypt para comprar a senha criptografada com a senha normal que o usuário digitar na hora do login
  public static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
