import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { StakingService } from './staking.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StakeTokensDto } from './dto/stake-tokens.dto';
import { UnstakeTokensDto } from './dto/unstake-tokens.dto';

@ApiTags('staking')
@Controller('staking')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StakingController {
  constructor(private readonly stakingService: StakingService) {}

  @Get('pools')
  @ApiOperation({ summary: 'Get available staking pools' })
  @ApiResponse({ status: 200, description: 'Staking pools retrieved successfully' })
  async getStakingPools() {
    return this.stakingService.getStakingPools();
  }

  @Get('pools/:poolId')
  @ApiParam({ name: 'poolId', description: 'Staking pool ID' })
  @ApiOperation({ summary: 'Get staking pool details' })
  @ApiResponse({ status: 200, description: 'Pool details retrieved successfully' })
  async getPoolDetails(@Param('poolId') poolId: string) {
    return this.stakingService.getPoolDetails(poolId);
  }

  @Post('stake')
  @ApiOperation({ summary: 'Stake tokens in a pool' })
  @ApiResponse({ status: 201, description: 'Tokens staked successfully' })
  @ApiResponse({ status: 400, description: 'Invalid staking parameters' })
  async stakeTokens(@Request() req, @Body() stakeTokensDto: StakeTokensDto) {
    return this.stakingService.stakeTokens(req.user.id, stakeTokensDto);
  }

  @Post('unstake')
  @ApiOperation({ summary: 'Unstake tokens from a pool' })
  @ApiResponse({ status: 200, description: 'Tokens unstaked successfully' })
  async unstakeTokens(@Request() req, @Body() unstakeTokensDto: UnstakeTokensDto) {
    return this.stakingService.unstakeTokens(req.user.id, unstakeTokensDto);
  }

  @Post('claim-rewards/:positionId')
  @ApiParam({ name: 'positionId', description: 'Staking position ID' })
  @ApiOperation({ summary: 'Claim staking rewards' })
  @ApiResponse({ status: 200, description: 'Rewards claimed successfully' })
  async claimRewards(@Request() req, @Param('positionId') positionId: string) {
    return this.stakingService.claimRewards(req.user.id, positionId);
  }

  @Get('positions')
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({ summary: 'Get user staking positions' })
  @ApiResponse({ status: 200, description: 'Staking positions retrieved successfully' })
  async getUserPositions(
    @Request() req,
    @Query('status') status?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.stakingService.getUserStakingPositions(req.user.id, {
      status,
      page: +page,
      limit: +limit,
    });
  }

  @Get('positions/:positionId')
  @ApiParam({ name: 'positionId', description: 'Staking position ID' })
  @ApiOperation({ summary: 'Get staking position details' })
  @ApiResponse({ status: 200, description: 'Position details retrieved successfully' })
  async getPositionDetails(@Request() req, @Param('positionId') positionId: string) {
    return this.stakingService.getStakingPositionDetails(req.user.id, positionId);
  }

  @Get('rewards/:positionId')
  @ApiParam({ name: 'positionId', description: 'Staking position ID' })
  @ApiOperation({ summary: 'Get pending rewards for position' })
  @ApiResponse({ status: 200, description: 'Pending rewards calculated successfully' })
  async getPendingRewards(@Request() req, @Param('positionId') positionId: string) {
    return this.stakingService.getPendingRewards(req.user.id, positionId);
  }

  @Get('pools/:poolId/stats')
  @ApiParam({ name: 'poolId', description: 'Staking pool ID' })
  @ApiOperation({ summary: 'Get pool statistics' })
  @ApiResponse({ status: 200, description: 'Pool statistics retrieved successfully' })
  async getPoolStats(@Param('poolId') poolId: string) {
    return this.stakingService.getPoolStatistics(poolId);
  }

  @Get('calculate-rewards')
  @ApiQuery({ name: 'poolId', required: true })
  @ApiQuery({ name: 'amount', required: true })
  @ApiQuery({ name: 'duration', required: true, type: Number })
  @ApiOperation({ summary: 'Calculate potential staking rewards' })
  @ApiResponse({ status: 200, description: 'Rewards calculated successfully' })
  async calculateRewards(
    @Query('poolId') poolId: string,
    @Query('amount') amount: string,
    @Query('duration') duration: number,
  ) {
    return this.stakingService.calculateStakingRewards(poolId, amount, duration);
  }

  @Get('apy/:poolId')
  @ApiParam({ name: 'poolId', description: 'Staking pool ID' })
  @ApiOperation({ summary: 'Get current APY for pool' })
  @ApiResponse({ status: 200, description: 'APY retrieved successfully' })
  async getPoolApy(@Param('poolId') poolId: string) {
    return this.stakingService.getPoolApy(poolId);
  }

  @Get('user/stats')
  @ApiOperation({ summary: 'Get user staking statistics' })
  @ApiResponse({ status: 200, description: 'User staking stats retrieved successfully' })
  async getUserStakingStats(@Request() req) {
    return this.stakingService.getUserStakingStatistics(req.user.id);
  }

  @Get('pools/:poolId/lock-periods')
  @ApiParam({ name: 'poolId', description: 'Staking pool ID' })
  @ApiOperation({ summary: 'Get available lock periods for pool' })
  @ApiResponse({ status: 200, description: 'Lock periods retrieved successfully' })
  async getLockPeriods(@Param('poolId') poolId: string) {
    return this.stakingService.getAvailableLockPeriods(poolId);
  }

  @Post('pools/:poolId/update-apy')
  @ApiParam({ name: 'poolId', description: 'Staking pool ID' })
  @ApiOperation({ summary: 'Update pool APY (admin only)' })
  @ApiResponse({ status: 200, description: 'APY updated successfully' })
  async updatePoolApy(
    @Param('poolId') poolId: string,
    @Body() data: { newApy: string },
  ) {
    return this.stakingService.updatePoolApy(poolId, data.newApy);
  }

  @Get('rewards/history')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({ summary: 'Get user rewards history' })
  @ApiResponse({ status: 200, description: 'Rewards history retrieved successfully' })
  async getRewardsHistory(
    @Request() req,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.stakingService.getUserRewardsHistory(req.user.id, {
      page: +page,
      limit: +limit,
    });
  }

  @Get('pools/:poolId/performance')
  @ApiParam({ name: 'poolId', description: 'Staking pool ID' })
  @ApiQuery({ name: 'period', required: false, enum: ['7d', '30d', '90d', '1y'] })
  @ApiOperation({ summary: 'Get pool performance metrics' })
  @ApiResponse({ status: 200, description: 'Performance metrics retrieved successfully' })
  async getPoolPerformance(
    @Param('poolId') poolId: string,
    @Query('period') period = '30d',
  ) {
    return this.stakingService.getPoolPerformanceMetrics(poolId, period);
  }

  @Get('global/stats')
  @ApiOperation({ summary: 'Get global staking statistics' })
  @ApiResponse({ status: 200, description: 'Global staking stats retrieved successfully' })
  async getGlobalStakingStats() {
    return this.stakingService.getGlobalStakingStatistics();
  }

  @Post('emergency-unstake/:positionId')
  @ApiParam({ name: 'positionId', description: 'Staking position ID' })
  @ApiOperation({ summary: 'Emergency unstake (penalty may apply)' })
  @ApiResponse({ status: 200, description: 'Emergency unstake completed' })
  async emergencyUnstake(@Request() req, @Param('positionId') positionId: string) {
    return this.stakingService.emergencyUnstake(req.user.id, positionId);
  }
}