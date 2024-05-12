import {
  Candle,
  FetchPriceDto,
  FetchPriceResponse
} from '@app/common';
import {
  CalulateEMADto,
  EMAResponse
} from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios'
@Injectable()
export class IndicatorsService {
  private readonly logger = new Logger(IndicatorsService.name)

  constructor() { }

  async fetchPrice({ timeframe, symbol, ema }: FetchPriceDto): Promise<FetchPriceResponse> {
    try {
      const limit = ema * 2
      const response = await axios.get<Candle[]>(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${timeframe}&limit=${limit}`)

      return {
        candles: response.data.map((item) => ({
          timestamp: item[0],
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4],
          volume: item[5],
          closeTimestamp: item[6],
          quoteAssetVolume: item[7],
          numberOfTrades: item[8],
          takerBuyBaseAssetVolume: item[9],
          takerBuyQuoteAssetVolume: item[10],
          ignore: item[11]
        }))
      }
    } catch (error) {
      throw error
    }
  }

  async calculateEMA(dto: CalulateEMADto): Promise<EMAResponse> {
    try {
      if (dto.price.length < dto.ema) return null

      const k = 2 / (dto.ema + 1)
      let ema = dto.price.slice(0, dto.ema).reduce((acc, val) => acc + val, 0) / dto.ema

      for (let i = dto.ema; i < dto.price.length; i++) {
        ema = (dto.price[i] - ema) * k + ema;
      }

      return {
        ema,
        lastPrice: dto.price[dto.price.length - 1],
      }
    } catch (error) {
      throw error
    }
  }
}
