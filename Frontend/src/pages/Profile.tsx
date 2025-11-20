import { useState, useRef } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Download,
  Upload,
  Share,
  Gift,
  TrendingUp,
  Activity,
  Clock,
  Settings,
  Smartphone,
  Globe,
  Key,
  Users,
  DollarSign,
  Award,
  CheckCircle2,
  AlertCircle,
  Star,
  Heart,
  Bookmark,
  Github,
  Twitter,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '+234 0123456789',
    location: 'Lagos, Nigeria',
    bio: 'Crypto enthusiast and DeFi strategist. Passionate about building the future of decentralized finance.',
    website: 'https://toyin.dev',
    twitter: '@toyin_crypto',
    github: 'toyin05',
    farcaster: 'toyin',
    preferredCurrency: 'USD',
    timezone: 'Africa/Lagos',
    language: 'English'
  });

  const [socialAccounts, setSocialAccounts] = useState([
    { id: 1, platform: 'Twitter', handle: '@toyin_crypto', connected: true, lastSync: '2 hours ago', icon: Twitter },
    { id: 2, platform: 'GitHub', handle: 'toyin05', connected: true, lastSync: '1 day ago', icon: Github },
    { id: 3, platform: 'Farcaster', handle: 'toyin', connected: true, lastSync: '3 days ago', icon: Globe },
    { id: 4, platform: 'Discord', handle: 'toyin#1234', connected: false, lastSync: null, icon: MessageSquare }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
        toast({
          title: 'Profile Picture Updated',
          description: 'Your profile picture has been updated successfully.',
        });
      };
      reader.readAsDataURL(file);
    }
  };



  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been saved successfully.',
    });
  };

  const handleAccountConnect = (accountId: number) => {
    setSocialAccounts(prev => prev.map(account => 
      account.id === accountId 
        ? { 
            ...account, 
            connected: !account.connected,
            lastSync: !account.connected ? 'Just now' : null
          }
        : account
    ));
    const account = socialAccounts.find(a => a.id === accountId);
    if (account) {
      toast({
        title: account.connected ? 'Account Disconnected' : 'Account Connected',
        description: `${account.platform} account has been ${account.connected ? 'disconnected from' : 'connected to'} your profile.`,
      });
    }
  };

  const getJoinDateText = () => {
    if (user?.created_at) {
      const date = new Date(user.created_at);
      return `Member since ${date.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      })}`;
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Profile Settings</h1>
            <p className="text-muted-foreground text-lg">Manage your account settings and preferences</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-teal-600 to-teal-700 text-white border-0 px-4 py-2">
              <Award className="w-4 h-4 mr-2" />
              Verified User
            </Badge>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(!isEditing)}
              className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
            >
              {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </div>

        {/* Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="p-6 bg-gradient-to-br from-teal-600/10 to-teal-700/5 border-teal-600/20">
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={profilePicture || "/api/placeholder/96/96"} />
                  <AvatarFallback className="text-2xl bg-teal-600 text-white">
                    {profileData.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="absolute -bottom-2 -right-2 rounded-full h-8 w-8"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-4 h-4" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{profileData.fullName}</h2>
                <p className="text-muted-foreground">{profileData.email}</p>
                {getJoinDateText() && (
                  <p className="text-sm text-muted-foreground">{getJoinDateText()}</p>
                )}
              </div>
            </div>
          </Card>

          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-bold text-foreground mb-6">Personal Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                      disabled={!isEditing}
                      className={isEditing ? 'border-teal-600 bg-background' : ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                      className={isEditing ? 'border-teal-600 bg-background' : ''}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                      className={isEditing ? 'border-teal-600 bg-background' : ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      disabled={!isEditing}
                      className={isEditing ? 'border-teal-600 bg-background' : ''}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    disabled={!isEditing}
                    className={`w-full p-3 rounded-md border ${isEditing ? 'border-teal-600 bg-background' : 'border-border'} text-foreground resize-none`}
                    rows={3}
                  />
                </div>
              </div>
              {isEditing && (
                <div className="flex gap-2 mt-6">
                  <Button 
                    onClick={handleSaveProfile} 
                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </Card>

            {/* Preferences */}
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-bold text-foreground mb-6">Preferences</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Preferred Currency</Label>
                    <select className="w-full p-2 rounded-md border border-border bg-background text-foreground">
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="NGN">NGN (₦)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <select className="w-full p-2 rounded-md border border-border bg-background text-foreground">
                      <option value="Africa/Lagos">Africa/Lagos</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York</option>
                      <option value="Europe/London">Europe/London</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <select className="w-full p-2 rounded-md border border-border bg-background text-foreground">
                    <option value="English">English</option>
                    <option value="Spanish">Español</option>
                    <option value="French">Français</option>
                    <option value="German">Deutsch</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="connections" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Connections Tab */}
          <TabsContent value="connections" className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-bold text-foreground mb-6">Connected Accounts</h3>
              <div className="space-y-4">
                {socialAccounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        account.connected ? 'bg-green-500/20' : 'bg-muted'
                      }`}>
                        <account.icon className={`w-5 h-5 ${
                          account.connected ? 'text-green-500' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{account.platform}</p>
                        <p className="text-sm text-muted-foreground">{account.handle}</p>
                        {account.connected && account.lastSync && (
                          <p className="text-xs text-muted-foreground">Last sync: {account.lastSync}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={account.connected ? "default" : "secondary"}>
                        {account.connected ? 'Connected' : 'Disconnected'}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAccountConnect(account.id)}
                        className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                      >
                        {account.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-bold text-foreground mb-6">Notification Preferences</h3>
              <div className="space-y-6">
                {[
                  { id: 1, title: 'Price Alerts', description: 'Get notified about significant price movements', enabled: true },
                  { id: 2, title: 'Security Alerts', description: 'Important security notifications', enabled: true },
                  { id: 3, title: 'Transaction Confirmations', description: 'Confirmations for all transactions', enabled: true },
                  { id: 4, title: 'Marketing Emails', description: 'Product updates and news', enabled: false },
                  { id: 5, title: 'Weekly Reports', description: 'Portfolio performance summaries', enabled: true },
                  { id: 6, title: 'Educational Content', description: 'New learning materials and tips', enabled: true }
                ].map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{setting.title}</h4>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    <Switch
                      checked={setting.enabled}
                      onCheckedChange={(checked) => {
                        toast({
                          title: checked ? 'Notifications Enabled' : 'Notifications Disabled',
                          description: `${setting.title} notifications have been ${checked ? 'enabled' : 'disabled'}.`,
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-bold text-foreground mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'Updated profile', details: 'Changed bio and website', timestamp: '2 hours ago', type: 'profile' },
                  { action: 'Security scan completed', details: 'All systems secure', timestamp: '1 day ago', type: 'security' },
                  { action: 'Two-factor authentication', details: '2FA enabled via SMS', timestamp: '1 week ago', type: 'security' },
                  { action: 'Profile verification', details: 'Identity verified successfully', timestamp: '2 weeks ago', type: 'verification' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'security' ? 'bg-green-500/20' :
                      activity.type === 'verification' ? 'bg-purple-500/20' :
                      'bg-teal-500/20'
                    }`}>
                      {activity.type === 'security' ? <Shield className="w-4 h-4 text-green-500" /> :
                       activity.type === 'verification' ? <CheckCircle2 className="w-4 h-4 text-purple-500" /> :
                       <User className="w-4 h-4 text-teal-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

