import * as bcrypt from 'bcrypt';

export class Bcrypt {
  static async hash(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
