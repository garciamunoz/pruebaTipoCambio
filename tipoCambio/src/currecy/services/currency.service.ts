import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ExchangeRate } from '../entities/exchange-rate.entity';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class CurrencyService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  private exchangeRates: ExchangeRate[] = [];

  async calcularTipoCambio(
    monto: number,
    monedaOrigen: string,
    monedaDestino: string,
  ) {
    try {
      const EXCHANGE_RATE_API_KEY = this.configService.exchange.apiKey;
      const url = 'https://v6.exchangerate-api.com/v6/';

      const exchangeRate = this.exchangeRates.find(
        (rate) =>
          rate.monedaOrigen === monedaOrigen &&
          rate.monedaDestino === monedaDestino,
      );

      if (exchangeRate) {
        console.log('Tipo de cambio encontrado en la base de datos en memoria');
        const montoConTipoCambio = monto * exchangeRate.tipoCambio;
        return {
          monto,
          montoConTipoCambio,
          monedaOrigen,
          monedaDestino,
          tipoCambio: exchangeRate.tipoCambio,
        };
      }

      const response = await axios.get(
        `${url}${EXCHANGE_RATE_API_KEY}/latest/${monedaOrigen}`,
      );

      const tipoCambio = response.data.conversion_rates[monedaDestino];
      const montoConTipoCambio = monto * tipoCambio;

      const newExchangeRate = new ExchangeRate(
        this.exchangeRates.length + 1,
        monedaOrigen,
        monedaDestino,
        tipoCambio,
      );
      this.exchangeRates.push(newExchangeRate);

      return {
        monto,
        montoConTipoCambio,
        monedaOrigen,
        monedaDestino,
        tipoCambio,
      };
    } catch (error) {
      console.error('Error al obtener el tipo de cambio:', error.message);
      throw new Error('Error al obtener el tipo de cambio');
    }
  }
}
