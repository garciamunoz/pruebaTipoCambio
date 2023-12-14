import { Controller, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Autenticación')
  @Get('/generate-token')
  generateToken() {
    return this.authService.generateToken();
  }
}
