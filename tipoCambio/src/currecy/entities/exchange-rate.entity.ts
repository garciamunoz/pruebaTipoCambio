export class ExchangeRate {
  constructor(
    public id: number,
    public monedaOrigen: string,
    public monedaDestino: string,
    public tipoCambio: number,
  ) {}
}
