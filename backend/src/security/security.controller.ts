import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SecurityService } from './security.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateSecuritySettingsDto } from './dto/update-security-settings.dto';

@ApiTags('security')
@Controller('security')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Get('settings')
  @ApiOperation({ summary: 'Get user security settings' })
  @ApiResponse({ status: 200, description: 'Security settings retrieved successfully' })
  async getSecuritySettings(@Request() req) {
    return this.securityService.getUserSecuritySettings(req.user.id);
  }

  @Put('settings')
  @ApiOperation({ summary: 'Update security settings' })
  @ApiResponse({ status: 200, description: 'Security settings updated successfully' })
  async updateSecuritySettings(
    @Request() req,
    @Body() updateDto: UpdateSecuritySettingsDto,
  ) {
    return this.securityService.updateSecuritySettings(req.user.id, updateDto);
  }

  @Post('2fa/enable')
  @ApiOperation({ summary: 'Enable two-factor authentication' })
  @ApiResponse({ status: 200, description: '2FA enabled successfully' })
  async enable2FA(@Request() req) {
    return this.securityService.enable2FA(req.user.id);
  }

  @Post('2fa/disable')
  @ApiOperation({ summary: 'Disable two-factor authentication' })
  @ApiResponse({ status: 200, description: '2FA disabled successfully' })
  async disable2FA(@Request() req) {
    return this.securityService.disable2FA(req.user.id);
  }

  @Post('2fa/verify')
  @ApiOperation({ summary: 'Verify 2FA code' })
  @ApiResponse({ status: 200, description: '2FA code verified successfully' })
  async verify2FA(@Request() req, @Body() data: { code: string }) {
    return this.securityService.verify2FA(req.user.id, data.code);
  }

  @Post('2fa/setup')
  @ApiOperation({ summary: 'Setup 2FA' })
  @ApiResponse({ status: 200, description: '2FA setup completed successfully' })
  async setup2FA(@Request() req) {
    return this.securityService.setup2FA(req.user.id);
  }

  @Get('devices')
  @ApiOperation({ summary: 'Get trusted devices' })
  @ApiResponse({ status: 200, description: 'Trusted devices retrieved successfully' })
  async getTrustedDevices(@Request() req) {
    return this.securityService.getTrustedDevices(req.user.id);
  }

  @Post('devices/add')
  @ApiOperation({ summary: 'Add trusted device' })
  @ApiResponse({ status: 200, description: 'Device added successfully' })
  async addTrustedDevice(@Request() req, @Body() data: { deviceId: string; name: string }) {
    return this.securityService.addTrustedDevice(req.user.id, data.deviceId, data.name);
  }

  @Delete('devices/:deviceId')
  @ApiOperation({ summary: 'Remove trusted device' })
  @ApiResponse({ status: 200, description: 'Device removed successfully' })
  async removeTrustedDevice(@Request() req, @Param('deviceId') deviceId: string) {
    return this.securityService.removeTrustedDevice(req.user.id, deviceId);
  }

  @Get('login-history')
  @ApiOperation({ summary: 'Get login history' })
  @ApiResponse({ status: 200, description: 'Login history retrieved successfully' })
  async getLoginHistory(@Request() req) {
    return this.securityService.getLoginHistory(req.user.id);
  }

  @Post('suspicious-activity/report')
  @ApiOperation({ summary: 'Report suspicious activity' })
  @ApiResponse({ status: 200, description: 'Suspicious activity reported successfully' })
  async reportSuspiciousActivity(@Request() req, @Body() data: { activity: string; details: any }) {
    return this.securityService.reportSuspiciousActivity(req.user.id, data.activity, data.details);
  }

  @Get('suspicious-activity')
  @ApiOperation({ summary: 'Get suspicious activity alerts' })
  @ApiResponse({ status: 200, description: 'Suspicious activity retrieved successfully' })
  async getSuspiciousActivity(@Request() req) {
    return this.securityService.getSuspiciousActivity(req.user.id);
  }

  @Post('password/change')
  @ApiOperation({ summary: 'Change password with security verification' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  async changePasswordSecure(
    @Request() req,
    @Body() data: { currentPassword: string; newPassword: string; verificationCode?: string },
  ) {
    return this.securityService.changePasswordSecure(req.user.id, data);
  }

  @Post('session/terminate')
  @ApiOperation({ summary: 'Terminate all active sessions' })
  @ApiResponse({ status: 200, description: 'Sessions terminated successfully' })
  async terminateAllSessions(@Request() req) {
    return this.securityService.terminateAllSessions(req.user.id);
  }

  @Get('session/active')
  @ApiOperation({ summary: 'Get active sessions' })
  @ApiResponse({ status: 200, description: 'Active sessions retrieved successfully' })
  async getActiveSessions(@Request() req) {
    return this.securityService.getActiveSessions(req.user.id);
  }

  @Post('session/terminate/:sessionId')
  @ApiOperation({ summary: 'Terminate specific session' })
  @ApiResponse({ status: 200, description: 'Session terminated successfully' })
  async terminateSession(@Request() req, @Param('sessionId') sessionId: string) {
    return this.securityService.terminateSession(req.user.id, sessionId);
  }

  @Get('audit-log')
  @ApiOperation({ summary: 'Get security audit log' })
  @ApiResponse({ status: 200, description: 'Audit log retrieved successfully' })
  async getAuditLog(@Request() req) {
    return this.securityService.getAuditLog(req.user.id);
  }

  @Post('backup-codes/generate')
  @ApiOperation({ summary: 'Generate backup codes' })
  @ApiResponse({ status: 200, description: 'Backup codes generated successfully' })
  async generateBackupCodes(@Request() req) {
    return this.securityService.generateBackupCodes(req.user.id);
  }

  @Post('backup-codes/verify')
  @ApiOperation({ summary: 'Verify backup code' })
  @ApiResponse({ status: 200, description: 'Backup code verified successfully' })
  async verifyBackupCode(@Request() req, @Body() data: { code: string }) {
    return this.securityService.verifyBackupCode(req.user.id, data.code);
  }

  @Get('risk-score')
  @ApiOperation({ summary: 'Get account risk score' })
  @ApiResponse({ status: 200, description: 'Risk score retrieved successfully' })
  async getRiskScore(@Request() req) {
    return this.securityService.getAccountRiskScore(req.user.id);
  }

  @Post('freeze-account')
  @ApiOperation({ summary: 'Freeze account for security' })
  @ApiResponse({ status: 200, description: 'Account frozen successfully' })
  async freezeAccount(@Request() req) {
    return this.securityService.freezeAccount(req.user.id);
  }

  @Post('unfreeze-account')
  @ApiOperation({ summary: 'Unfreeze account' })
  @ApiResponse({ status: 200, description: 'Account unfrozen successfully' })
  async unfreezeAccount(@Request() req) {
    return this.securityService.unfreezeAccount(req.user.id);
  }

  @Get('security-score')
  @ApiOperation({ summary: 'Get security score' })
  @ApiResponse({ status: 200, description: 'Security score retrieved successfully' })
  async getSecurityScore(@Request() req) {
    return this.securityService.getSecurityScore(req.user.id);
  }

  @Post('emergency-contact/add')
  @ApiOperation({ summary: 'Add emergency contact' })
  @ApiResponse({ status: 200, description: 'Emergency contact added successfully' })
  async addEmergencyContact(@Request() req, @Body() data: { name: string; email: string; phone?: string }) {
    return this.securityService.addEmergencyContact(req.user.id, data);
  }

  @Get('emergency-contact')
  @ApiOperation({ summary: 'Get emergency contacts' })
  @ApiResponse({ status: 200, description: 'Emergency contacts retrieved successfully' })
  async getEmergencyContacts(@Request() req) {
    return this.securityService.getEmergencyContacts(req.user.id);
  }
}