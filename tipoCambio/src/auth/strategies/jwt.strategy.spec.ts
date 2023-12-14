import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should validate and return user', async () => {
    const payload = { sub: 'user123', username: 'testuser' };
    const user = await jwtStrategy.validate(payload);

    expect(user).toEqual({ userId: 'user123', username: 'testuser' });
  });
});
