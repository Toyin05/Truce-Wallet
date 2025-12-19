import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { SendTransactionDto } from './dto/send-transaction.dto';
import { WalletType } from '../database/entities/wallet.entity';

@ApiTags('wallet')
@Controller('wallet')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new wallet' })
  @ApiResponse({ status: 201, description: 'Wallet created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid wallet data' })
  async createWallet(@Request() req, @Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(req.user.id, createWalletDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get user wallets' })
  @ApiQuery({ name: 'type', required: false, enum: WalletType })
  @ApiResponse({ status: 200, description: 'Wallets retrieved successfully' })
  async getUserWallets(@Request() req, @Query('type') type?: WalletType) {
    return this.walletService.getUserWallets(req.user.id, type);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Wallet ID' })
  @ApiOperation({ summary: 'Get wallet by ID' })
  @ApiResponse({ status: 200, description: 'Wallet retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Wallet not found' })
  async getWalletById(@Request() req, @Param('id') walletId: string) {
    return this.walletService.getWalletById(req.user.id, walletId);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Wallet ID' })
  @ApiOperation({ summary: 'Update wallet' })
  @ApiResponse({ status: 200, description: 'Wallet updated successfully' })
  async updateWallet(
    @Request() req,
    @Param('id') walletId: string,
    @Body() updateData: Partial<CreateWalletDto>,
  ) {
    return this.walletService.updateWallet(req.user.id, walletId, updateData);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Wallet ID' })
  @ApiOperation({ summary: 'Delete wallet' })
  @ApiResponse({ status: 200, description: 'Wallet deleted successfully' })
  async deleteWallet(@Request() req, @Param('id') walletId: string) {
    await this.walletService.deleteWallet(req.user.id, walletId);
    return { message: 'Wallet deleted successfully' };
  }

  @Get(':id/balance')
  @ApiParam({ name: 'id', description: 'Wallet ID' })
  @ApiOperation({ summary: 'Get wallet balance' })
  @ApiResponse({ status: 200, description: 'Balance retrieved successfully' })
  async getWalletBalance(@Request() req, @Param('id') walletId: string) {
    return this.walletService.getWalletBalance(req.user.id, walletId);
  }

  @Get(':id/transactions')
  @ApiParam({ name: 'id', description: 'Wallet ID' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'type', required: false })
  @ApiOperation({ summary: 'Get wallet transactions' })
  @ApiResponse({ status: 200, description: 'Transactions retrieved successfully' })
  async getWalletTransactions(
    @Request() req,
    @Param('id') walletId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('type') type?: string,
  ) {
    return this.walletService.getWalletTransactions(
      req.user.id,
      walletId,
      { page: +page, limit: +limit, type },
    );
  }

  @Post(':id/send')
  @ApiParam({ name: 'id', description: 'Wallet ID' })
  @ApiOperation({ summary: 'Send transaction from wallet' })
  @ApiResponse({ status: 200, description: 'Transaction sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid transaction data' })
  async sendTransaction(
    @Request() req,
    @Param('id') walletId: string,
    @Body() sendTransactionDto: SendTransactionDto,
  ) {
    return this.walletService.sendTransaction(req.user.id, walletId, sendTransactionDto);
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generate a new wallet' })
  @ApiResponse({ status: 201, description: 'Wallet generated successfully' })
  async generateWallet(@Request() req, @Body() data: { type: WalletType; name?: string }) {
    return this.walletService.generateWallet(req.user.id, data.type, data.name);
  }

  @Post(':id/import')
  @ApiParam({ name: 'id', description: 'Wallet ID' })
  @ApiOperation({ summary: 'Import existing wallet' })
  @ApiResponse({ status: 200, description: 'Wallet imported successfully' })
  async importWallet(
    @Request() req,
    @Param('id') walletId: string,
    @Body() importData: { privateKey: string; encryptedPrivateKey?: string },
  ) {
    return this.walletService.importWallet(req.user.id, walletId, importData);
  }

  @Post(':id/backup')
  @ApiParam({ name: 'id', description: 'Wallet ID' })
  @ApiOperation({ summary: 'Create wallet backup' })
  @ApiResponse({ status: 200, description: 'Backup created successfully' })
  async createBackup(@Request() req, @Param('id') walletId: string) {
    return this.walletService.createWalletBackup(req.user.id, walletId);
  }

  @Get(':id/nonce')
  @ApiParam({ name: 'id', description: 'Wallet ID' })
  @ApiOperation({ summary: 'Get wallet transaction nonce' })
  @ApiResponse({ status: 200, description: 'Nonce retrieved successfully' })
  async getTransactionNonce(@Request() req, @Param('id') walletId: string) {
    return this.walletService.getTransactionNonce(req.user.id, walletId);
  }

  @Post(':id/estimate-gas')
  @ApiParam({ name: 'id', description: 'Wallet ID' })
  @ApiOperation({ summary: 'Estimate gas for transaction' })
  @ApiResponse({ status: 200, description: 'Gas estimated successfully' })
  async estimateGas(
    @Request() req,
    @Param('id') walletId: string,
    @Body() txData: { to: string; value: string; data?: string },
  ) {
    return this.walletService.estimateGas(req.user.id, walletId, txData);
  }

  @Get(':id/token-balances')
  @ApiParam({ name: 'id', description: 'Wallet ID' })
  @ApiOperation({ summary: 'Get token balances for wallet' })
  @ApiResponse({ status: 200, description: 'Token balances retrieved successfully' })
  async getTokenBalances(@Request() req, @Param('id') walletId: string) {
    return this.walletService.getTokenBalances(req.user.id, walletId);
  }

  @Post(':id/validate-address')
  @ApiParam({ name: 'id', description: 'Wallet ID' })
  @ApiOperation({ summary: 'Validate blockchain address' })
  @ApiResponse({ status: 200, description: 'Address validation result' })
  async validateAddress(
    @Request() req,
    @Param('id') walletId: string,
    @Body() data: { address: string },
  ) {
    return this.walletService.validateAddress(req.user.id, walletId, data.address);
  }

  @Get(':id/gas-price')
  @ApiParam({ name: 'id', description: 'Wallet ID' })
  @ApiOperation({ summary: 'Get current gas price' })
  @ApiResponse({ status: 200, description: 'Gas price retrieved successfully' })
  async getGasPrice(@Request() req, @Param('id') walletId: string) {
    return this.walletService.getGasPrice(req.user.id, walletId);
  }

  @Post(':id/set-default')
  @ApiParam({ name: 'id', description: 'Wallet ID' })
  @ApiOperation({ summary: 'Set wallet as default' })
  @ApiResponse({ status: 200, description: 'Wallet set as default successfully' })
  async setAsDefault(@Request() req, @Param('id') walletId: string) {
    await this.walletService.setWalletAsDefault(req.user.id, walletId);
    return { message: 'Wallet set as default successfully' };
  }

  @Get('portfolio/summary')
  @ApiOperation({ summary: 'Get portfolio summary' })
  @ApiResponse({ status: 200, description: 'Portfolio summary retrieved successfully' })
  async getPortfolioSummary(@Request() req) {
    return this.walletService.getPortfolioSummary(req.user.id);
  }

  @Get('portfolio/history')
  @ApiQuery({ name: 'period', required: false, enum: ['1d', '7d', '30d', '90d', '1y'] })
  @ApiOperation({ summary: 'Get portfolio value history' })
  @ApiResponse({ status: 200, description: 'Portfolio history retrieved successfully' })
  async getPortfolioHistory(@Request() req, @Query('period') period = '30d') {
    return this.walletService.getPortfolioHistory(req.user.id, period);
  }
}