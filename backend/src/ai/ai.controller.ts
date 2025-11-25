import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AIService } from './ai.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('ai')
@Controller('ai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Get('insights')
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'symbol', required: false })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({ summary: 'Get AI insights' })
  @ApiResponse({ status: 200, description: 'AI insights retrieved successfully' })
  async getInsights(
    @Request() req,
    @Query('type') type?: string,
    @Query('symbol') symbol?: string,
    @Query('limit') limit = 20,
  ) {
    return this.aiService.getUserInsights(req.user.id, { type, symbol, limit: +limit });
  }

  @Get('predictions/:symbol')
  @ApiOperation({ summary: 'Get AI price predictions' })
  @ApiResponse({ status: 200, description: 'Price predictions retrieved successfully' })
  async getPricePredictions(@Param('symbol') symbol: string) {
    return this.aiService.getPricePredictions(symbol);
  }

  @Get('signals/:symbol')
  @ApiOperation({ summary: 'Get AI trading signals' })
  @ApiResponse({ status: 200, description: 'Trading signals retrieved successfully' })
  async getTradingSignals(@Param('symbol') symbol: string) {
    return this.aiService.getTradingSignals(symbol);
  }

  @Get('analysis/portfolio')
  @ApiOperation({ summary: 'Get portfolio analysis' })
  @ApiResponse({ status: 200, description: 'Portfolio analysis retrieved successfully' })
  async getPortfolioAnalysis(@Request() req) {
    return this.aiService.getPortfolioAnalysis(req.user.id);
  }

  @Get('analysis/market')
  @ApiQuery({ name: 'symbol', required: false })
  @ApiOperation({ summary: 'Get market analysis' })
  @ApiResponse({ status: 200, description: 'Market analysis retrieved successfully' })
  async getMarketAnalysis(@Query('symbol') symbol?: string) {
    return this.aiService.getMarketAnalysis(symbol);
  }

  @Get('recommendations')
  @ApiOperation({ summary: 'Get AI recommendations' })
  @ApiResponse({ status: 200, description: 'AI recommendations retrieved successfully' })
  async getRecommendations(@Request() req) {
    return this.aiService.getPersonalizedRecommendations(req.user.id);
  }

  @Post('chat')
  @ApiOperation({ summary: 'AI chat interaction' })
  @ApiResponse({ status: 200, description: 'AI response generated successfully' })
  async chatWithAI(@Request() req, @Body() data: { message: string; context?: any }) {
    return this.aiService.chatWithAI(req.user.id, data.message, data.context);
  }

  @Get('risk-assessment')
  @ApiQuery({ name: 'symbol', required: false })
  @ApiOperation({ summary: 'Get risk assessment' })
  @ApiResponse({ status: 200, description: 'Risk assessment retrieved successfully' })
  async getRiskAssessment(
    @Request() req,
    @Query('symbol') symbol?: string,
  ) {
    return this.aiService.getRiskAssessment(req.user.id, symbol);
  }

  @Get('sentiment/:symbol')
  @ApiOperation({ summary: 'Get market sentiment analysis' })
  @ApiResponse({ status: 200, description: 'Sentiment analysis retrieved successfully' })
  async getSentimentAnalysis(@Param('symbol') symbol: string) {
    return this.aiService.getSentimentAnalysis(symbol);
  }

  @Get('alerts')
  @ApiOperation({ summary: 'Get AI alerts and notifications' })
  @ApiResponse({ status: 200, description: 'AI alerts retrieved successfully' })
  async getAlerts(@Request() req) {
    return this.aiService.getUserAlerts(req.user.id);
  }

  @Post('alerts/:alertId/read')
  @ApiOperation({ summary: 'Mark alert as read' })
  @ApiResponse({ status: 200, description: 'Alert marked as read' })
  async markAlertAsRead(@Request() req, @Param('alertId') alertId: string) {
    return this.aiService.markAlertAsRead(req.user.id, alertId);
  }

  @Get('performance')
  @ApiOperation({ summary: 'Get AI model performance metrics' })
  @ApiResponse({ status: 200, description: 'Performance metrics retrieved successfully' })
  async getPerformanceMetrics() {
    return this.aiService.getPerformanceMetrics();
  }

  @Get('backtesting')
  @ApiQuery({ name: 'strategy', required: true })
  @ApiQuery({ name: 'period', required: false, enum: ['1m', '3m', '6m', '1y'] })
  @ApiOperation({ summary: 'Get backtesting results' })
  @ApiResponse({ status: 200, description: 'Backtesting results retrieved successfully' })
  async getBacktestingResults(
    @Query('strategy') strategy: string,
    @Query('period') period = '3m',
  ) {
    return this.aiService.getBacktestingResults(strategy, period);
  }

  @Get('correlation/:symbol')
  @ApiOperation({ summary: 'Get correlation analysis' })
  @ApiResponse({ status: 200, description: 'Correlation analysis retrieved successfully' })
  async getCorrelationAnalysis(@Param('symbol') symbol: string) {
    return this.aiService.getCorrelationAnalysis(symbol);
  }

  @Get('volatility/:symbol')
  @ApiQuery({ name: 'period', required: false, enum: ['1d', '7d', '30d'] })
  @ApiOperation({ summary: 'Get volatility analysis' })
  @ApiResponse({ status: 200, description: 'Volatility analysis retrieved successfully' })
  async getVolatilityAnalysis(
    @Param('symbol') symbol: string,
    @Query('period') period = '30d',
  ) {
    return this.aiService.getVolatilityAnalysis(symbol, period);
  }

  @Get('yield-optimization')
  @ApiOperation({ summary: 'Get yield optimization suggestions' })
  @ApiResponse({ status: 200, description: 'Yield optimization retrieved successfully' })
  async getYieldOptimization(@Request() req) {
    return this.aiService.getYieldOptimization(req.user.id);
  }

  @Get('dca-strategy')
  @ApiQuery({ name: 'symbol', required: true })
  @ApiQuery({ name: 'amount', required: true })
  @ApiQuery({ name: 'frequency', required: false, enum: ['daily', 'weekly', 'monthly'] })
  @ApiOperation({ summary: 'Get DCA strategy recommendations' })
  @ApiResponse({ status: 200, description: 'DCA strategy retrieved successfully' })
  async getDCAStrategy(
    @Query('symbol') symbol: string,
    @Query('amount') amount: string,
    @Query('frequency') frequency = 'weekly',
  ) {
    return this.aiService.getDCAStrategy(symbol, amount, frequency);
  }
}