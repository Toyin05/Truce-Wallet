import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { 
  TrendingUp, 
  TrendingDown, 
  Send, 
  Download, 
  ArrowLeftRight, 
  Coins,
  DollarSign,
  Wallet as WalletIcon,
  Award,
  Activity,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBalance: 0,
    totalAssets: 0,
    bestPerformer: null,
    bestPerformerGain: 0,
    stakedAmount: 0,
    change24h: 0,
  });

  // Function to get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              {getTimeBasedGreeting()}{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}!
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">Truce Wallet - Powered by BlockDAG Network</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              size="sm" 
              style={{
                backgroundColor: '#14b8a6',
                color: 'rgb(15 23 42)',
                borderColor: '#14b8a6',
                borderWidth: '1px'
              }}
              className="flex-1 sm:flex-none whitespace-nowrap overflow-hidden text-ellipsis"
            >
              <Download className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>Receive</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              style={{
                backgroundColor: 'transparent',
                color: '#14b8a6',
                borderColor: '#14b8a6',
                borderWidth: '1px'
              }}
              className="flex-1 sm:flex-none hover:bg-teal-600 hover:text-white cursor-pointer"
            >
              <Send className="w-4 h-4 mr-2" />
              <span className="hidden xs:inline">Send</span>
              <span className="xs:hidden">Send</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-teal-600 to-teal-700 border-teal-600/50 hover:shadow-glow-primary transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
              <DollarSign className="w-4 h-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalBalance.toLocaleString()}</div>
              <div className={cn(
                'flex items-center text-sm mt-1',
                stats.change24h >= 0 ? 'text-success' : 'text-destructive'
              )}>
                {stats.change24h >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {Math.abs(stats.change24h)}% (24h)
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:shadow-glow-primary transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Assets</CardTitle>
              <WalletIcon className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAssets}</div>
              <p className="text-xs text-muted-foreground mt-1">Start by adding assets</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:shadow-glow-primary transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Best Performer</CardTitle>
              <Award className="w-4 h-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">No Assets</div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Activity className="w-3 h-3 mr-1" />
                Add assets to see performance
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:shadow-glow-primary transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Staked Amount</CardTitle>
              <Coins className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.stakedAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Start staking to earn rewards</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 border-teal-600 hover:bg-teal-600 hover:text-white cursor-pointer"
              style={{
                backgroundColor: 'transparent',
                color: '#14b8a6',
                borderColor: '#14b8a6',
                borderWidth: '1px'
              }}
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 border-teal-600 hover:bg-teal-600 hover:text-white cursor-pointer"
              style={{
                backgroundColor: '#14b8a6',
                color: 'rgb(15 23 42)',
                borderColor: '#14b8a6',
                borderWidth: '1px'
              }}
            >
              <Download className="w-5 h-5" />
              <span>Receive</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 border-teal-600 hover:bg-teal-600 hover:text-white cursor-pointer"
              style={{
                backgroundColor: 'transparent',
                color: '#14b8a6',
                borderColor: '#14b8a6',
                borderWidth: '1px'
              }}
            >
              <ArrowLeftRight className="w-5 h-5" />
              <span>Swap</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 border-teal-600 hover:bg-teal-600 hover:text-white cursor-pointer"
              style={{
                backgroundColor: 'transparent',
                color: '#14b8a6',
                borderColor: '#14b8a6',
                borderWidth: '1px'
              }}
            >
              <Coins className="w-5 h-5" />
              <span>Stake</span>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity & AI Insights */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-center p-8 rounded-lg bg-muted/10">
                  <div className="text-center">
                    <Activity className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No transactions yet</p>
                    <p className="text-xs text-muted-foreground mt-1">Your transaction history will appear here</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                AI Market Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-center p-8 rounded-lg bg-muted/10">
                  <div className="text-center">
                    <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">AI Insights Coming Soon</p>
                    <p className="text-xs text-muted-foreground">
                      Add some assets to your wallet to receive personalized AI-powered market insights and recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced AI Assistant CTA Section */}
        <Card className="bg-gradient-to-br from-teal-600/10 to-blue-600/10 border-teal-600/30 overflow-hidden">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-teal-600 rounded-full">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-teal-600">AI Assistant</CardTitle>
                <p className="text-muted-foreground">Your intelligent crypto companion</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Smart Risk Protection
                </h3>
                <p className="text-sm text-muted-foreground">
                  AI alerts flag suspicious transactions before confirmation, protecting your funds from potential threats
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Real-time threat detection
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Price Predictions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Advanced ML algorithms provide market analysis and price predictions for informed trading decisions
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  87% accuracy rate
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Contextual Education
                </h3>
                <p className="text-sm text-muted-foreground">
                  Learn crypto concepts while trading with personalized explanations and guided tutorials
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Interactive learning
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Trade Suggestions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Personalized recommendations based on market conditions and your portfolio behavior
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Custom strategies
                </div>
              </div>
            </div>
            
            <div className="border-t border-teal-600/20 pt-6">
              <Button 
                asChild
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white cursor-pointer font-semibold text-sm sm:text-lg py-4 sm:py-6"
              >
                <Link to="/dashboard/ai">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                  <span className="text-xs sm:text-base">Start AI Chat Session</span>
                </Link>
              </Button>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground mb-2">
                  Powered by advanced machine learning on BlockDAG Network
                </p>
                <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                  <span>Secure</span>
                  <span>Fast</span>
                  <span>Smart</span>
                  <span>Personalized</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

