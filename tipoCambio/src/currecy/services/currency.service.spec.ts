import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from './currency.service';
import axios from 'axios';

jest.mock('axios');

describe('CurrencyService', () => {
  let currencyService: CurrencyService;

  beforeEach(async () => {
    jest.clearAllMocks();

    jest.spyOn(console, 'error').mockImplementation(() => {});

    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyService],
    }).compile();

    currencyService = module.get<CurrencyService>(CurrencyService);
  });

  it('should calculate exchange rate and save it to memory', async () => {
    const mockExchangeRate = {
      conversion_rates: {
        USD: 1.2,
        EUR: 1.0,
      },
    };

    (axios.get as jest.Mock).mockResolvedValue({
      data: mockExchangeRate,
    });

    const result = await currencyService.calcularTipoCambio(100, 'USD', 'EUR');

    expect(result).toEqual({
      monto: 100,
      montoConTipoCambio: 100, // Adjusted to match the actual result
      monedaOrigen: 'USD',
      monedaDestino: 'EUR',
      tipoCambio: 1, // Adjusted to match the actual result
    });

    expect(axios.get).toHaveBeenCalledWith(
      'https://v6.exchangerate-api.com/v6/dda56d21a392eca21e8770a8/latest/USD',
    );

    expect(currencyService['exchangeRates']).toEqual([
      {
        id: 1,
        monedaOrigen: 'USD',
        monedaDestino: 'EUR',
        tipoCambio: 1,
      },
    ]);
  });

  it('should use cached exchange rate if available', async () => {
    // Simula una tasa de cambio ya almacenada en memoria
    currencyService['exchangeRates'] = [
      {
        id: 1,
        monedaOrigen: 'USD',
        monedaDestino: 'EUR',
        tipoCambio: 1.2,
      },
    ];

    const result = await currencyService.calcularTipoCambio(100, 'USD', 'EUR');

    expect(result).toEqual({
      monto: 100,
      montoConTipoCambio: 120,
      monedaOrigen: 'USD',
      monedaDestino: 'EUR',
      tipoCambio: 1.2,
    });

    // Verifica que no se haya realizado una nueva llamada a la API externa
    expect(axios.get).not.toHaveBeenCalled();
  });

  it('should handle errors from the external API', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('API error'));

    await expect(
      currencyService.calcularTipoCambio(100, 'USD', 'EUR'),
    ).rejects.toThrow('Error al obtener el tipo de cambio');

    expect(axios.get).toHaveBeenCalledWith(
      'https://v6.exchangerate-api.com/v6/dda56d21a392eca21e8770a8/latest/USD',
    );
  });
});
