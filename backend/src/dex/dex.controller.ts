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
import { DexService } from './dex.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SwapTokensDto } from './dto/swap-tokens.dto';
import { AddLiquidityDto } from './dto/add-liquidity.dto';
import { RemoveLiquidityDto } from './dto/remove-liquidity.dto';

@ApiTags('dex')
@Controller('dex')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DexController {
  constructor(private readonly dexService: DexService) {}

  @Post('swap')
  @ApiOperation({ summary: 'Swap tokens' })
  @ApiResponse({ status: 200, description: 'Tokens swapped successfully' })
  @ApiResponse({ status: 400, description: 'Invalid swap parameters' })
  async swapTokens(@Request() req, @Body() swapTokensDto: SwapTokensDto) {
    return this.dexService.swapTokens(req.user.id, swapTokensDto);
  }

  @Post('liquidity/add')
  @ApiOperation({ summary: 'Add liquidity to pool' })
  @ApiResponse({ status: 200, description: 'Liquidity added successfully' })
  async addLiquidity(@Request() req, @Body() addLiquidityDto: AddLiquidityDto) {
    return this.dexService.addLiquidity(req.user.id, addLiquidityDto);
  }

  @Post('liquidity/remove')
  @ApiOperation({ summary: 'Remove liquidity from pool' })
  @ApiResponse({ status: 200, description: 'Liquidity removed successfully' })
  async removeLiquidity(@Request() req, @Body() removeLiquidityDto: RemoveLiquidityDto) {
    return this.dexService.removeLiquidity(req.user.id, removeLiquidityDto);
  }

  @Get('pools')
  @ApiOperation({ summary: 'Get available liquidity pools' })
  @ApiResponse({ status: 200, description: 'Pools retrieved successfully' })
  async getPools() {
    return this.dexService.getLiquidityPools();
  }

  @Get('pools/:poolId')
  @ApiOperation({ summary: 'Get pool information' })
  @ApiResponse({ status: 200, description: 'Pool information retrieved successfully' })
  async getPool(@Request() req, @Param('poolId') poolId: string) {
    return this.dexService.getPoolInfo(poolId);
  }

  @Get('quote')
  @ApiQuery({ name: 'fromToken', required: true })
  @ApiQuery({ name: 'toToken', required: true })
  @ApiQuery({ name: 'amount', required: true })
  @ApiOperation({ summary: 'Get swap quote' })
  @ApiResponse({ status: 200, description: 'Quote retrieved successfully' })
  async getQuote(
    @Query('fromToken') fromToken: string,
    @Query('toToken') toToken: string,
    @Query('amount') amount: string,
  ) {
    return this.dexService.getSwapQuote(fromToken, toToken, amount);
  }

  @Get('route')
  @ApiQuery({ name: 'fromToken', required: true })
  @ApiQuery({ name: 'toToken', required: true })
  @ApiQuery({ name: 'amount', required: true })
  @ApiOperation({ summary: 'Get optimal swap route' })
  @ApiResponse({ status: 200, description: 'Route calculated successfully' })
  async getRoute(
    @Query('fromToken') fromToken: string,
    @Query('toToken') toToken: string,
    @Query('amount') amount: string,
  ) {
    return this.dexService.getSwapRoute(fromToken, toToken, amount);
  }

  @Get('orders')
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({ summary: 'Get user swap orders' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  async getUserOrders(
    @Request() req,
    @Query('status') status?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.dexService.getUserSwapOrders(req.user.id, { status, page: +page, limit: +limit });
  }

  @Get('orders/:orderId')
  @ApiOperation({ summary: 'Get swap order details' })
  @ApiResponse({ status: 200, description: 'Order details retrieved successfully' })
  async getOrderDetails(@Request() req, @Param('orderId') orderId: string) {
    return this.dexService.getSwapOrderDetails(req.user.id, orderId);
  }

  @Post('estimate-slippage')
  @ApiOperation({ summary: 'Estimate price slippage' })
  @ApiResponse({ status: 200, description: 'Slippage estimated successfully' })
  async estimateSlippage(@Body() data: { fromToken: string; toToken: string; amount: string }) {
    return this.dexService.estimateSlippage(data.fromToken, data.toToken, data.amount);
  }

  @Get('gas-estimate')
  @ApiQuery({ name: 'fromToken', required: true })
  @ApiQuery({ name: 'toToken', required: true })
  @ApiQuery({ name: 'amount', required: true })
  @ApiOperation({ summary: 'Estimate gas for swap' })
  @ApiResponse({ status: 200, description: 'Gas estimated successfully' })
  async estimateGas(
    @Query('fromToken') fromToken: string,
    @Query('toToken') toToken: string,
    @Query('amount') amount: string,
  ) {
    return this.dexService.estimateSwapGas(fromToken, toToken, amount);
  }

  @Get('impact')
  @ApiQuery({ name: 'fromToken', required: true })
  @ApiQuery({ name: 'toToken', required: true })
  @ApiQuery({ name: 'amount', required: true })
  @ApiOperation({ summary: 'Calculate price impact' })
  @ApiResponse({ status: 200, description: 'Price impact calculated successfully' })
  async calculateImpact(
    @Query('fromToken') fromToken: string,
    @Query('toToken') toToken: string,
    @Query('amount') amount: string,
  ) {
    return this.dexService.calculatePriceImpact(fromToken, toToken, amount);
  }

  @Get('pools/:poolId/liquidity')
  @ApiOperation({ summary: 'Get pool liquidity information' })
  @ApiResponse({ status: 200, description: 'Liquidity information retrieved successfully' })
  async getPoolLiquidity(@Param('poolId') poolId: string) {
    return this.dexService.getPoolLiquidity(poolId);
  }

  @Get('pools/:poolId/volume')
  @ApiQuery({ name: 'period', required: false, enum: ['1h', '24h', '7d', '30d'] })
  @ApiOperation({ summary: 'Get pool trading volume' })
  @ApiResponse({ status: 200, description: 'Volume data retrieved successfully' })
  async getPoolVolume(@Param('poolId') poolId: string, @Query('period') period = '24h') {
    return this.dexService.getPoolVolume(poolId, period);
  }

  @Get('tokens')
  @ApiOperation({ summary: 'Get supported tokens' })
  @ApiResponse({ status: 200, description: 'Supported tokens retrieved successfully' })
  async getSupportedTokens() {
    return this.dexService.getSupportedTokens();
  }

  @Get('tokens/:tokenAddress')
  @ApiOperation({ summary: 'Get token information' })
  @ApiResponse({ status: 200, description: 'Token information retrieved successfully' })
  async getTokenInfo(@Param('tokenAddress') tokenAddress: string) {
    return this.dexService.getTokenInfo(tokenAddress);
  }

  @Post('pools/create')
  @ApiOperation({ summary: 'Create new liquidity pool' })
  @ApiResponse({ status: 201, description: 'Pool created successfully' })
  async createPool(@Body() data: { tokenA: string; tokenB: string; fee: number }) {
    return this.dexService.createLiquidityPool(data.tokenA, data.tokenB, data.fee);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get DEX statistics' })
  @ApiResponse({ status: 200, description: 'DEX stats retrieved successfully' })
  async getDexStats() {
    return this.dexService.getDexStatistics();
  }

  @Get('user/stats')
  @ApiOperation({ summary: 'Get user DEX statistics' })
  @ApiResponse({ status: 200, description: 'User DEX stats retrieved successfully' })
  async getUserDexStats(@Request() req) {
    return this.dexService.getUserDexStatistics(req.user.id);
  }
}