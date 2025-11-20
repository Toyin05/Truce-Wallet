import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, TrendingUp, Coins, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const stakingPools = [
  {
    id: '1',
    name: 'ETH Staking',
    token: 'ETH',
    apy: 4.5,
    lockPeriod: '30 days',
    minStake: 0.1,
    maxStake: 100,
    totalStaked: 12450,
    yourStake: 0,
  },
  {
    id: '2',
    name: 'MATIC Flexible',
    token: 'MATIC',
    apy: 8.2,
    lockPeriod: 'Flexible',
    minStake: 100,
    maxStake: 50000,
    totalStaked: 850000,
    yourStake: 0,
  },
  {
    id: '3',
    name: 'BNB Locked',
    token: 'BNB',
    apy: 12.5,
    lockPeriod: '90 days',
    minStake: 1,
    maxStake: 500,
    totalStaked: 5200,
    yourStake: 0,
  },
  {
    id: '4',
    name: 'USDC Savings',
    token: 'USDC',
    apy: 5.8,
    lockPeriod: 'Flexible',
    minStake: 100,
    maxStake: 100000,
    totalStaked: 2500000,
    yourStake: 0,
  },
];

export default function Staking() {
  const [selectedPool, setSelectedPool] = useState<typeof stakingPools[0] | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleStake = async () => {
    if (!stakeAmount || !selectedPool) return;

    const amount = parseFloat(stakeAmount);
    if (amount < selectedPool.minStake || amount > selectedPool.maxStake) {
      toast({
        title: 'Invalid Amount',
        description: `Stake amount must be between ${selectedPool.minStake} and ${selectedPool.maxStake} ${selectedPool.token}`,
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Staking Successful',
        description: `Successfully staked ${amount} ${selectedPool.token}`,
      });
      
      setSelectedPool(null);
      setStakeAmount('');
    } catch (error) {
      toast({
        title: 'Staking Failed',
        description: 'Failed to stake tokens',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateRewards = (amount: number, apy: number) => {
    return ((amount * apy) / 100 / 365 * 30).toFixed(4);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staking</h1>
          <p className="text-muted-foreground">Earn rewards by staking your crypto on BlockDAG</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/20">
                <Coins className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Staked</p>
                <p className="text-2xl font-bold text-foreground">$0.00</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/20">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-500/20">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Rewards</p>
                <p className="text-2xl font-bold text-foreground">$0.00</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/20">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-500/20">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Positions</p>
                <p className="text-2xl font-bold text-foreground">0</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Staking Pools */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Available Pools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stakingPools.map(pool => (
              <Card key={pool.id} className="p-6 bg-card border-border hover:border-primary/50 transition-all">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{pool.name}</h3>
                      <p className="text-sm text-muted-foreground">{pool.token}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary">{pool.apy}%</p>
                      <p className="text-xs text-muted-foreground">APY</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Lock Period</p>
                      <p className="font-semibold text-foreground flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        {pool.lockPeriod}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Min Stake</p>
                      <p className="font-semibold text-foreground">
                        {pool.minStake} {pool.token}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Total Staked</span>
                      <span className="text-foreground">
                        {pool.totalStaked.toLocaleString()} {pool.token}
                      </span>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => setSelectedPool(pool)}
                  >
                    Stake {pool.token}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stake Modal */}
        <Dialog open={!!selectedPool} onOpenChange={() => setSelectedPool(null)}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                Stake {selectedPool?.token}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Amount to Stake</Label>
                <Input
                  type="number"
                  placeholder="0.0"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Min: {selectedPool?.minStake} • Max: {selectedPool?.maxStake} {selectedPool?.token}
                </p>
              </div>

              {stakeAmount && selectedPool && (
                <Card className="p-4 bg-muted/50 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">APY</span>
                    <span className="text-primary font-semibold">{selectedPool.apy}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Lock Period</span>
                    <span className="text-foreground">{selectedPool.lockPeriod}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Est. Monthly Rewards</span>
                    <span className="text-foreground font-semibold">
                      {calculateRewards(parseFloat(stakeAmount), selectedPool.apy)} {selectedPool.token}
                    </span>
                  </div>
                </Card>
              )}

              <Button 
                className="w-full" 
                onClick={handleStake}
                disabled={loading || !stakeAmount}
              >
                {loading ? 'Staking...' : 'Confirm Stake'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
