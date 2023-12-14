import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should return a generated token', () => {
    const mockToken = { token: 'mocked-token' };
    jest.spyOn(authService, 'generateToken').mockReturnValue(mockToken);

    const result = authController.generateToken();

    expect(result).toEqual(mockToken);
    expect(authService.generateToken).toHaveBeenCalled();
  });
});
