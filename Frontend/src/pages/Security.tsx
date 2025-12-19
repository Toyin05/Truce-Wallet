import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Smartphone, 
  Key, 
  Activity, 
  AlertTriangle, 
  Lock,
  Eye,
  EyeOff,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  Globe,
  Fingerprint,
  QrCode,
  Mail,
  MessageSquare,
  Settings,
  AlertCircle,
  TrendingUp,
  UserCheck,
  Database,
  Server,
  ExternalLink,
  RefreshCw,
  Bell,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Security() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showBackupPhrase, setShowBackupPhrase] = useState(false);
  const { toast } = useToast();

  const securityFeatures = [
    {
      id: '2fa',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security with SMS, email, or authenticator app',
      enabled: twoFactorEnabled,
      status: twoFactorEnabled ? 'active' : 'disabled',
      priority: 'high',
      lastUpdated: '2 days ago',
      icon: Shield
    },
    {
      id: 'biometric',
      title: 'Biometric Authentication',
      description: 'Use your fingerprint or Face ID for quick and secure access',
      enabled: biometricEnabled,
      status: biometricEnabled ? 'active' : 'disabled',
      priority: 'high',
      lastUpdated: '1 week ago',
      icon: Fingerprint
    },
    {
      id: 'api-keys',
      title: 'API Access Management',
      description: 'Control third-party access and API key permissions',
      enabled: true,
      status: 'active',
      priority: 'medium',
      lastUpdated: '3 days ago',
      icon: Key
    },
    {
      id: 'whitelist',
      title: 'Address Whitelist',
      description: 'Restrict withdrawals to approved wallet addresses',
      enabled: false,
      status: 'disabled',
      priority: 'medium',
      lastUpdated: 'Never',
      icon: UserCheck
    },
    {
      id: 'notifications',
      title: 'Security Notifications',
      description: 'Real-time alerts for all security events',
      enabled: true,
      status: 'active',
      priority: 'high',
      lastUpdated: '1 hour ago',
      icon: Bell
    },
    {
      id: 'backup',
      title: 'Encrypted Backup',
      description: 'Secure cloud backup of your wallet data',
      enabled: true,
      status: 'active',
      priority: 'high',
      lastUpdated: '1 day ago',
      icon: Database
    }
  ];

  const recentSecurityEvents = [
    { 
      id: 1, 
      action: 'Successful Login', 
      details: 'Login from new device: MacBook Pro (Chrome)', 
      time: '2 hours ago', 
      location: 'Lagos, Nigeria',
      ip: '197.210.64.123',
      status: 'success',
      severity: 'info'
    },
    { 
      id: 2, 
      action: 'Two-Factor Authentication', 
      details: '2FA verification completed via SMS', 
      time: '4 hours ago', 
      location: 'Lagos, Nigeria',
      ip: '197.210.64.123',
      status: 'success',
      severity: 'info'
    },
    { 
      id: 3, 
      action: 'Failed Login Attempt', 
      details: 'Multiple failed password attempts detected', 
      time: '1 day ago', 
      location: 'Unknown Location',
      ip: '103.224.182.251',
      status: 'warning',
      severity: 'medium'
    },
    { 
      id: 4, 
      action: 'Security Settings Updated', 
      details: 'Biometric authentication was enabled', 
      time: '3 days ago', 
      location: 'Lagos, Nigeria',
      ip: '197.210.64.123',
      status: 'success',
      severity: 'info'
    },
    { 
      id: 5, 
      action: 'Suspicious Activity', 
      details: 'Login attempt from multiple locations detected', 
      time: '5 days ago', 
      location: 'Multiple Locations',
      ip: 'Various',
      status: 'critical',
      severity: 'high'
    }
  ];

  const trustedDevices = [
    { 
      id: 1, 
      device: 'MacBook Pro 2023', 
      browser: 'Chrome 120', 
      location: 'Lagos, Nigeria', 
      lastActive: '2 hours ago', 
      trusted: true,
      ip: '197.210.64.123'
    },
    { 
      id: 2, 
      device: 'iPhone 15 Pro', 
      browser: 'Safari iOS', 
      location: 'Lagos, Nigeria', 
      lastActive: '1 day ago', 
      trusted: true,
      ip: '197.210.64.124'
    },
    { 
      id: 3, 
      device: 'Windows Desktop', 
      browser: 'Edge 120', 
      location: 'Abuja, Nigeria', 
      lastActive: '1 week ago', 
      trusted: false,
      ip: '41.58.123.456'
    }
  ];

  const handleToggle2FA = async () => {
    if (!twoFactorEnabled) {
      // Simulate 2FA setup process
      toast({
        title: 'Two-Factor Authentication Setup',
        description: 'Please check your email for verification instructions',
      });
    }
    setTwoFactorEnabled(!twoFactorEnabled);
    toast({
      title: twoFactorEnabled ? '2FA Disabled' : '2FA Enabled',
      description: twoFactorEnabled 
        ? 'Two-factor authentication has been disabled' 
        : 'Two-factor authentication has been enabled',
    });
  };

  const handleToggleBiometric = async () => {
    if (!biometricEnabled) {
      try {
        const credential = await navigator.credentials.create({
          publicKey: {
            challenge: new Uint8Array(32),
            rp: { name: "Truce Wallet", id: window.location.hostname },
            user: { 
              id: new Uint8Array(16), 
              name: "user@example.com", 
              displayName: "User" 
            },
            pubKeyCredParams: [{ type: "public-key", alg: -7 }],
            authenticatorSelection: {
              authenticatorAttachment: "platform",
              userVerification: "required"
            }
          }
        } as CredentialCreationOptions);
         
        setBiometricEnabled(true);
        toast({
          title: 'Biometric Enabled',
          description: 'Fingerprint/Face ID authentication has been enabled',
        });
      } catch (error) {
        toast({
          title: 'Biometric Failed',
          description: 'Failed to enable biometric authentication',
          variant: 'destructive',
        });
      }
    } else {
      setBiometricEnabled(false);
      toast({
        title: 'Biometric Disabled',
        description: 'Fingerprint/Face ID authentication has been disabled',
      });
    }
  };

  const handleToggleFeature = (featureId: string, currentState: boolean) => {
    toast({
      title: currentState ? 'Feature Disabled' : 'Feature Enabled',
      description: `Security feature has been ${currentState ? 'disabled' : 'enabled'}.`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'active':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'critical':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/10 border-red-500/20 text-red-600';
      case 'medium':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600';
      case 'low':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-600';
      default:
        return 'bg-muted border-border';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Security Center</h1>
            <p className="text-muted-foreground text-lg">Comprehensive security management powered by BlockDAG</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-green-600 to-green-700 text-white border-0 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Enterprise Security
            </Badge>
            <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Security Audit
            </Button>
          </div>
        </div>

        {/* Security Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-green-600/10 to-green-700/5 border-green-600/20">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-600/20">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Protections</p>
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-xs text-green-600">All systems secure</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-600/10 to-blue-700/5 border-blue-600/20">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-600/20">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Trusted Devices</p>
                <p className="text-2xl font-bold text-foreground">{trustedDevices.filter(d => d.trusted).length}</p>
                <p className="text-xs text-blue-600">All verified</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-600/10 to-purple-700/5 border-purple-600/20">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-600/20">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Security Score</p>
                <p className="text-2xl font-bold text-foreground">Excellent</p>
                <p className="text-xs text-purple-600">95% secured</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-600/10 to-orange-700/5 border-orange-600/20">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-orange-600/20">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recent Alerts</p>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-xs text-orange-600">Requires attention</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="features">Security Features</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
            <TabsTrigger value="devices">Trusted Devices</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          </TabsList>

          {/* Security Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityFeatures.map((feature) => (
                <Card key={feature.id} className="p-6 bg-card border-border hover:border-teal-600/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-teal-600/20">
                      <feature.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground flex items-center gap-2">
                            {feature.title}
                            <Badge variant={feature.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                              {feature.status}
                            </Badge>
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Priority: {feature.priority}</span>
                            <span>•</span>
                            <span>Updated: {feature.lastUpdated}</span>
                          </div>
                        </div>
                        <Switch
                          checked={feature.enabled}
                          onCheckedChange={() => handleToggleFeature(feature.id, feature.enabled)}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Special 2FA and Biometric sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-card border-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-600/20">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground mb-2">Add an extra layer of security</p>
                      </div>
                      <Switch
                        checked={twoFactorEnabled}
                        onCheckedChange={handleToggle2FA}
                      />
                    </div>
                    {twoFactorEnabled && (
                      <div className="space-y-2">
                        <Badge className="bg-green-500 text-white">Active</Badge>
                        <div className="text-xs text-muted-foreground">
                          <p>Method: SMS (toyin****@gmail.com)</p>
                          <p>Backup: Email verification</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-purple-600/20">
                    <Fingerprint className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">Biometric Authentication</h3>
                        <p className="text-sm text-muted-foreground mb-2">Use fingerprint or Face ID</p>
                      </div>
                      <Switch
                        checked={biometricEnabled}
                        onCheckedChange={handleToggleBiometric}
                      />
                    </div>
                    {biometricEnabled && (
                      <div className="space-y-2">
                        <Badge className="bg-green-500 text-white">Active</Badge>
                        <div className="text-xs text-muted-foreground">
                          <p>Methods: Fingerprint, Face ID</p>
                          <p>Device: iPhone 15 Pro</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Log Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground">Security Activity Log</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Log
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                {recentSecurityEvents.map((event) => (
                  <div key={event.id} className={`p-4 rounded-lg border ${getSeverityColor(event.severity)}`}>
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getStatusIcon(event.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-semibold text-foreground">{event.action}</p>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{event.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{event.details}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Server className="w-3 h-3" />
                            <span>{event.ip}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {event.severity} priority
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Trusted Devices Tab */}
          <TabsContent value="devices" className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-bold text-foreground mb-6">Device Management</h3>
              <div className="space-y-4">
                {trustedDevices.map((device) => (
                  <div key={device.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        device.trusted ? 'bg-green-500/20' : 'bg-yellow-500/20'
                      }`}>
                        <Smartphone className={`w-5 h-5 ${
                          device.trusted ? 'text-green-500' : 'text-yellow-500'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{device.device}</p>
                        <p className="text-sm text-muted-foreground">{device.browser}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{device.location}</span>
                          <span>•</span>
                          <span>IP: {device.ip}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Last active</p>
                        <p className="text-sm font-medium text-foreground">{device.lastActive}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge variant={device.trusted ? "default" : "secondary"}>
                          {device.trusted ? 'Trusted' : 'Untrusted'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {device.trusted ? 'Revoke' : 'Trust'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Advanced Settings Tab */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* API Keys & Webhooks */}
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-bold text-foreground mb-6">API Access & Webhooks</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-foreground">Production API Key</p>
                        <p className="text-sm text-muted-foreground">For trading operations</p>
                      </div>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-background px-2 py-1 rounded border">
                        sk_live_•••••••••••••••••••••••••••••••••
                      </code>
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-foreground">Webhook Endpoint</p>
                        <p className="text-sm text-muted-foreground">Security notifications</p>
                      </div>
                      <Badge className="bg-blue-500 text-white">Configured</Badge>
                    </div>
                    <code className="text-xs bg-background px-2 py-1 rounded border block">
                      https://api.toyin.dev/webhooks/security
                    </code>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Key className="w-4 h-4 mr-2" />
                    Manage API Keys
                  </Button>
                </div>
              </Card>

              {/* Backup & Recovery */}
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-bold text-foreground mb-6">Backup & Recovery</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-foreground">Encrypted Backup</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Your wallet data is securely backed up</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Update
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <QrCode className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-foreground">Recovery Phrase</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">12-word recovery phrase (keep this secret)</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowBackupPhrase(!showBackupPhrase)}
                      >
                        {showBackupPhrase ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                        {showBackupPhrase ? 'Hide' : 'Show'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                    {showBackupPhrase && (
                      <div className="mt-3 p-3 bg-background rounded border">
                        <code className="text-sm">
                          wisdom brave gentle crystal elegant lucky magic bright courage noble pride
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Security Recommendations */}
            <Card className="p-6 bg-gradient-to-br from-teal-600/10 to-teal-700/5 border-teal-600/20">
              <h3 className="text-lg font-bold text-foreground mb-6">Security Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Strong Authentication</p>
                      <p className="text-sm text-muted-foreground">Enable all available authentication methods</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Regular Security Audits</p>
                      <p className="text-sm text-muted-foreground">Review and update security settings monthly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Device Verification</p>
                      <p className="text-sm text-muted-foreground">Review and remove untrusted devices</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Address Whitelist</p>
                      <p className="text-sm text-muted-foreground">Enable withdrawal restrictions for added security</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Real-time Monitoring</p>
                      <p className="text-sm text-muted-foreground">24/7 security monitoring is active</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Encrypted Backups</p>
                      <p className="text-sm text-muted-foreground">Your data is securely encrypted and backed up</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
