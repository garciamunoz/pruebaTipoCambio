import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CurrencyService } from '../services/currency.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @ApiTags('Divisa')
  @ApiBearerAuth()
  @ApiQuery({
    name: 'monto',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'monedaOrigen',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'monedaDestino',
    required: true,
    type: String,
  })
  @Get('/tipo-cambio')
  @UseGuards(JwtAuthGuard)
  async getTipoCambio(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
  ) {
    try {
      const monto: number = request.query['monto'] as number;
      const monedaOrigen: string = request.query['monedaOrigen'] as string;
      const monedaDestino: string = request.query['monedaDestino'] as string;

      const result = await this.currencyService.calcularTipoCambio(
        monto,
        monedaOrigen,
        monedaDestino,
      );

      reply.send(result);
    } catch (error) {
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  }
}
