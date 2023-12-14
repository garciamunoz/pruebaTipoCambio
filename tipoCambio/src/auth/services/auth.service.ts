import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  generateToken() {
    const secretKey = 'secret-key';
    const userId = 'usuario123';
    const expiresIn = '1h';

    const token = jwt.sign({ sub: userId }, secretKey, { expiresIn });

    return { token };
  }
}
