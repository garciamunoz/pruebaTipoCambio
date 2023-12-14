import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from '../services/currency.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { FastifyReply, FastifyRequest } from 'fastify';

const currencyServiceMock = {
  calcularTipoCambio: jest.fn(),
};

describe('CurrencyController', () => {
  let controller: CurrencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],
      providers: [
        {
          provide: CurrencyService,
          useValue: currencyServiceMock,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<CurrencyController>(CurrencyController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTipoCambio', () => {
    it('should return calculated exchange rate', async () => {
      const requestMock: FastifyRequest = {
        query: {
          monto: 100,
          monedaOrigen: 'USD',
          monedaDestino: 'EUR',
        },
      } as FastifyRequest;

      const replyMock: FastifyReply = {
        send: jest.fn(),
        status: jest.fn(),
      } as any;

      const mockResult = {
        monto: 100,
        montoConTipoCambio: 120,
        monedaOrigen: 'USD',
        monedaDestino: 'EUR',
        tipoCambio: 1.2,
      };

      currencyServiceMock.calcularTipoCambio.mockResolvedValueOnce(mockResult);

      await controller.getTipoCambio(requestMock, replyMock);

      expect(currencyServiceMock.calcularTipoCambio).toHaveBeenCalledWith(
        100,
        'USD',
        'EUR',
      );
      expect(replyMock.send).toHaveBeenCalledWith(mockResult);
    });

    it('should handle errors and return Internal Server Error', async () => {
      const requestMock: FastifyRequest = {
        query: {
          monto: 100,
          monedaOrigen: 'USD',
          monedaDestino: 'EUR',
        },
      } as FastifyRequest;

      const replyMock: FastifyReply = {
        send: jest.fn(),
        status: jest.fn(() => replyMock),
      } as any;

      const mockError = new Error('API error');
      currencyServiceMock.calcularTipoCambio.mockRejectedValueOnce(mockError);

      await controller.getTipoCambio(requestMock, replyMock);

      expect(currencyServiceMock.calcularTipoCambio).toHaveBeenCalledWith(
        100,
        'USD',
        'EUR',
      );
      expect(replyMock.status).toHaveBeenCalledWith(500);
      expect(replyMock.send).toHaveBeenCalledWith({
        error: 'Internal Server Error',
      });
    });
  });
});
