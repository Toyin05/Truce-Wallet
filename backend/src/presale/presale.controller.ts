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
import { PresaleService } from './presale.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ParticipateInPresaleDto } from './dto/participate-presale.dto';

@ApiTags('presale')
@Controller('presale')
export class PresaleController {
  constructor(private readonly presaleService: PresaleService) {}

  @Get('status')
  @ApiOperation({ summary: 'Get presale status' })
  @ApiResponse({ status: 200, description: 'Presale status retrieved successfully' })
  async getPresaleStatus() {
    return this.presaleService.getPresaleStatus();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get presale statistics' })
  @ApiResponse({ status: 200, description: 'Presale statistics retrieved successfully' })
  async getPresaleStats() {
    return this.presaleService.getPresaleStatistics();
  }

  @UseGuards(JwtAuthGuard)
  @Post('participate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Participate in presale' })
  @ApiResponse({ status: 201, description: 'Participation successful' })
  @ApiResponse({ status: 400, description: 'Invalid participation data' })
  async participateInPresale(
    @Request() req,
    @Body() participateDto: ParticipateInPresaleDto,
  ) {
    return this.presaleService.participateInPresale(req.user.id, participateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-participations')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user presale participations' })
  @ApiResponse({ status: 200, description: 'User participations retrieved successfully' })
  async getUserParticipations(@Request() req) {
    return this.presaleService.getUserParticipations(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('claim/:participationId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Claim presale tokens' })
  @ApiResponse({ status: 200, description: 'Tokens claimed successfully' })
  async claimTokens(
    @Request() req,
    @Param('participationId') participationId: string,
  ) {
    return this.presaleService.claimTokens(req.user.id, participationId);
  }

  @Get('token-price')
  @ApiOperation({ summary: 'Get current token price' })
  @ApiResponse({ status: 200, description: 'Token price retrieved successfully' })
  async getTokenPrice() {
    return this.presaleService.getCurrentTokenPrice();
  }

  @Get('vesting-schedule/:participationId')
  @ApiOperation({ summary: 'Get vesting schedule for participation' })
  @ApiResponse({ status: 200, description: 'Vesting schedule retrieved successfully' })
  async getVestingSchedule(@Param('participationId') participationId: string) {
    return this.presaleService.getVestingSchedule(participationId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('claimable-amount/:participationId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get claimable amount for participation' })
  @ApiResponse({ status: 200, description: 'Claimable amount calculated successfully' })
  async getClaimableAmount(
    @Request() req,
    @Param('participationId') participationId: string,
  ) {
    return this.presaleService.getClaimableAmount(req.user.id, participationId);
  }

  @Get('whitelist')
  @ApiOperation({ summary: 'Check if address is whitelisted' })
  @ApiResponse({ status: 200, description: 'Whitelist status retrieved successfully' })
  async checkWhitelist(@Query('address') address: string) {
    return this.presaleService.checkWhitelistStatus(address);
  }

  @UseGuards(JwtAuthGuard)
  @Post('whitelist/add')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add address to whitelist' })
  @ApiResponse({ status: 200, description: 'Address added to whitelist' })
  async addToWhitelist(@Body() data: { address: string }) {
    return this.presaleService.addToWhitelist(data.address);
  }

  @Get('tiers')
  @ApiOperation({ summary: 'Get presale tiers' })
  @ApiResponse({ status: 200, description: 'Presale tiers retrieved successfully' })
  async getPresaleTiers() {
    return this.presaleService.getPresaleTiers();
  }

  @Get('allocation/:address')
  @ApiOperation({ summary: 'Get allocation for address' })
  @ApiResponse({ status: 200, description: 'Allocation retrieved successfully' })
  async getAllocation(@Param('address') address: string) {
    return this.presaleService.getAddressAllocation(address);
  }

  @UseGuards(JwtAuthGuard)
  @Get('referral/stats')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get referral statistics' })
  @ApiResponse({ status: 200, description: 'Referral stats retrieved successfully' })
  async getReferralStats(@Request() req) {
    return this.presaleService.getReferralStatistics(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('referral/generate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate referral code' })
  @ApiResponse({ status: 200, description: 'Referral code generated successfully' })
  async generateReferralCode(@Request() req) {
    return this.presaleService.generateReferralCode(req.user.id);
  }

  @Get('referral/:code')
  @ApiOperation({ summary: 'Validate referral code' })
  @ApiResponse({ status: 200, description: 'Referral code validated successfully' })
  async validateReferralCode(@Param('code') code: string) {
    return this.presaleService.validateReferralCode(code);
  }

  @Get('kyc/status')
  @ApiOperation({ summary: 'Get KYC status' })
  @ApiResponse({ status: 200, description: 'KYC status retrieved successfully' })
  async getKYCStatus(@Query('address') address: string) {
    return this.presaleService.getKYCStatus(address);
  }

  @UseGuards(JwtAuthGuard)
  @Post('kyc/submit')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit KYC information' })
  @ApiResponse({ status: 200, description: 'KYC submitted successfully' })
  async submitKYC(@Request() req, @Body() kycData: any) {
    return this.presaleService.submitKYC(req.user.id, kycData);
  }

  @Get('bonus')
  @ApiOperation({ summary: 'Get current bonus structure' })
  @ApiResponse({ status: 200, description: 'Bonus structure retrieved successfully' })
  async getBonusStructure() {
    return this.presaleService.getBonusStructure();
  }

  @Get('vesting-info')
  @ApiOperation({ summary: 'Get vesting information' })
  @ApiResponse({ status: 200, description: 'Vesting information retrieved successfully' })
  async getVestingInfo() {
    return this.presaleService.getVestingInformation();
  }
}