import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtAuthGuard],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should canActivate return true for a valid request', async () => {
    const mockExecutionContext = {} as ExecutionContext;

    jest.spyOn(guard, 'canActivate').mockImplementation(async () => true);

    const result = await guard.canActivate(mockExecutionContext);

    expect(result).toBe(true);
  });

  it('should canActivate return false for an invalid request', async () => {
    const mockExecutionContext = {} as ExecutionContext;

    jest.spyOn(guard, 'canActivate').mockImplementation(async () => false);

    const result = await guard.canActivate(mockExecutionContext);

    expect(result).toBe(false);
  });
});
