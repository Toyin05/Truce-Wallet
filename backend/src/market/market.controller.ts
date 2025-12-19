import { Controller, Get, Query, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { MarketService } from './market.service';

@ApiTags('market')
@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('prices')
  @ApiQuery({ name: 'symbols', required: false })
  @ApiQuery({ name: 'source', required: false, enum: ['coingecko', 'binance', 'coinbase', 'kraken'] })
  @ApiOperation({ summary: 'Get cryptocurrency prices' })
  @ApiResponse({ status: 200, description: 'Prices retrieved successfully' })
  async getPrices(
    @Query('symbols') symbols?: string,
    @Query('source') source?: string,
  ) {
    const symbolArray = symbols ? symbols.split(',') : undefined;
    return this.marketService.getPrices(symbolArray, source);
  }

  @Get('price/:symbol')
  @ApiOperation({ summary: 'Get price for specific cryptocurrency' })
  @ApiResponse({ status: 200, description: 'Price retrieved successfully' })
  async getPrice(@Param('symbol') symbol: string) {
    return this.marketService.getPrice(symbol);
  }

  @Get('trending')
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({ summary: 'Get trending cryptocurrencies' })
  @ApiResponse({ status: 200, description: 'Trending coins retrieved successfully' })
  async getTrending(@Query('limit') limit = 10) {
    return this.marketService.getTrendingCoins(+limit);
  }

  @Get('global')
  @ApiOperation({ summary: 'Get global market statistics' })
  @ApiResponse({ status: 200, description: 'Global stats retrieved successfully' })
  async getGlobalStats() {
    return this.marketService.getGlobalMarketStats();
  }

  @Get('chart/:symbol')
  @ApiQuery({ name: 'period', required: false, enum: ['1d', '7d', '30d', '90d', '1y'] })
  @ApiQuery({ name: 'interval', required: false, enum: ['1m', '5m', '15m', '1h', '4h', '1d'] })
  @ApiOperation({ summary: 'Get price chart data' })
  @ApiResponse({ status: 200, description: 'Chart data retrieved successfully' })
  async getChartData(
    @Param('symbol') symbol: string,
    @Query('period') period = '7d',
    @Query('interval') interval = '1h',
  ) {
    return this.marketService.getPriceChart(symbol, period, interval);
  }

  @Get('volume/:symbol')
  @ApiQuery({ name: 'period', required: false, enum: ['1d', '7d', '30d'] })
  @ApiOperation({ summary: 'Get trading volume data' })
  @ApiResponse({ status: 200, description: 'Volume data retrieved successfully' })
  async getVolumeData(
    @Param('symbol') symbol: string,
    @Query('period') period = '24h',
  ) {
    return this.marketService.getVolumeData(symbol, period);
  }

  @Get('fear-greed')
  @ApiOperation({ summary: 'Get fear and greed index' })
  @ApiResponse({ status: 200, description: 'Fear and greed index retrieved successfully' })
  async getFearGreedIndex() {
    return this.marketService.getFearGreedIndex();
  }

  @Get('news')
  @ApiQuery({ name: 'symbol', required: false })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({ summary: 'Get cryptocurrency news' })
  @ApiResponse({ status: 200, description: 'News retrieved successfully' })
  async getNews(
    @Query('symbol') symbol?: string,
    @Query('limit') limit = 20,
  ) {
    return this.marketService.getCryptoNews(symbol, +limit);
  }

  @Get('top-gainers')
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'period', required: false, enum: ['1h', '24h', '7d'] })
  @ApiOperation({ summary: 'Get top gaining cryptocurrencies' })
  @ApiResponse({ status: 200, description: 'Top gainers retrieved successfully' })
  async getTopGainers(
    @Query('limit') limit = 10,
    @Query('period') period = '24h',
  ) {
    return this.marketService.getTopGainers(+limit, period);
  }

  @Get('top-losers')
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'period', required: false, enum: ['1h', '24h', '7d'] })
  @ApiOperation({ summary: 'Get top losing cryptocurrencies' })
  @ApiResponse({ status: 200, description: 'Top losers retrieved successfully' })
  async getTopLosers(
    @Query('limit') limit = 10,
    @Query('period') period = '24h',
  ) {
    return this.marketService.getTopLosers(+limit, period);
  }

  @Get('market-cap')
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({ summary: 'Get market capitalization data' })
  @ApiResponse({ status: 200, description: 'Market cap data retrieved successfully' })
  async getMarketCap(@Query('limit') limit = 100) {
    return this.marketService.getMarketCapData(+limit);
  }

  @Get('defi')
  @ApiOperation({ summary: 'Get DeFi market statistics' })
  @ApiResponse({ status: 200, description: 'DeFi stats retrieved successfully' })
  async getDefiStats() {
    return this.marketService.getDefiMarketStats();
  }

  @Get('nft')
  @ApiOperation({ summary: 'Get NFT market statistics' })
  @ApiResponse({ status: 200, description: 'NFT stats retrieved successfully' })
  async getNftStats() {
    return this.marketService.getNftMarketStats();
  }

  @Get('exchanges')
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({ summary: 'Get cryptocurrency exchanges data' })
  @ApiResponse({ status: 200, description: 'Exchanges data retrieved successfully' })
  async getExchanges(@Query('limit') limit = 20) {
    return this.marketService.getExchangesData(+limit);
  }

  @Get('derivatives')
  @ApiOperation({ summary: 'Get derivatives market data' })
  @ApiResponse({ status: 200, description: 'Derivatives data retrieved successfully' })
  async getDerivatives() {
    return this.marketService.getDerivativesData();
  }
}