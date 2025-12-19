import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Rocket, Clock, DollarSign, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const presales = [
  {
    id: '1',
    name: 'BlockDAG Fan Token',
    symbol: 'BDAG-FAN',
    price: 0.05,
    raised: 2500000,
    hardCap: 5000000,
    minContribution: 100,
    maxContribution: 50000,
    vestingSchedule: '25% at TGE, 25% monthly',
    endDate: '2025-02-28',
    participants: 1247,
    status: 'active',
  },
  {
    id: '2',
    name: 'Sports Token',
    symbol: 'SPORT',
    price: 0.12,
    raised: 850000,
    hardCap: 2000000,
    minContribution: 50,
    maxContribution: 25000,
    vestingSchedule: '10% at TGE, 10% weekly',
    endDate: '2025-03-15',
    participants: 523,
    status: 'active',
  },
  {
    id: '3',
    name: 'Gaming Presale',
    symbol: 'GAME',
    price: 0.08,
    raised: 1800000,
    hardCap: 2000000,
    minContribution: 100,
    maxContribution: 30000,
    vestingSchedule: '20% at TGE, 20% monthly',
    endDate: '2025-02-20',
    participants: 892,
    status: 'ending-soon',
  },
];

export default function Presale() {
  const [selectedPresale, setSelectedPresale] = useState<typeof presales[0] | null>(null);
  const [amount, setAmount] = useState('');
  const [paymentToken, setPaymentToken] = useState('USDC');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleParticipate = async () => {
    if (!amount || !selectedPresale) return;

    const investAmount = parseFloat(amount);
    if (investAmount < selectedPresale.minContribution || investAmount > selectedPresale.maxContribution) {
      toast({
        title: 'Invalid Amount',
        description: `Investment must be between $${selectedPresale.minContribution} and $${selectedPresale.maxContribution}`,
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const tokensReceived = (investAmount / selectedPresale.price).toFixed(2);
      toast({
        title: 'Participation Successful',
        description: `You will receive ${tokensReceived} ${selectedPresale.symbol} tokens`,
      });
      
      setSelectedPresale(null);
      setAmount('');
    } catch (error) {
      toast({
        title: 'Participation Failed',
        description: 'Failed to participate in presale',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Presale Portal</h1>
          <p className="text-muted-foreground">Join exclusive token presales on BlockDAG</p>
        </div>

        {/* Active Presales */}
        <div className="space-y-4">
          {presales.map(presale => {
            const progress = (presale.raised / presale.hardCap) * 100;
            const daysRemaining = getDaysRemaining(presale.endDate);
            
            return (
              <Card key={presale.id} className="p-6 bg-card border-border hover:border-primary/50 transition-all">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Rocket className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{presale.name}</h3>
                        <p className="text-sm text-muted-foreground">{presale.symbol}</p>
                      </div>
                    </div>
                    <Badge variant={presale.status === 'ending-soon' ? 'destructive' : 'default'}>
                      {presale.status === 'ending-soon' ? 'Ending Soon' : 'Active'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        Token Price
                      </p>
                      <p className="font-semibold text-foreground">${presale.price}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Time Left
                      </p>
                      <p className="font-semibold text-foreground">{daysRemaining} days</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        Participants
                      </p>
                      <p className="font-semibold text-foreground">{presale.participants}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Hard Cap</p>
                      <p className="font-semibold text-foreground">
                        ${(presale.hardCap / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground font-semibold">
                        ${presale.raised.toLocaleString()} / ${presale.hardCap.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-right text-muted-foreground">
                      {progress.toFixed(1)}% completed
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-1">Vesting</p>
                      <p className="text-sm text-foreground">{presale.vestingSchedule}</p>
                    </div>
                    <Button onClick={() => setSelectedPresale(presale)}>
                      Participate
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* My Participations */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-foreground">My Presales</h2>
          <Card className="p-8 text-center bg-muted/50 border-dashed border-2 border-border">
            <p className="text-muted-foreground">No active participations</p>
            <p className="text-sm text-muted-foreground mt-1">
              Join a presale to start earning
            </p>
          </Card>
        </div>

        {/* Participation Modal */}
        <Dialog open={!!selectedPresale} onOpenChange={() => setSelectedPresale(null)}>
          <DialogContent className="bg-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                Join {selectedPresale?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Investment Amount (USD)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Min: ${selectedPresale?.minContribution} • Max: ${selectedPresale?.maxContribution}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Payment Token</Label>
                <Select value={paymentToken} onValueChange={setPaymentToken}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="BNB">BNB</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {amount && selectedPresale && (
                <Card className="p-4 bg-muted/50 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Token Price</span>
                    <span className="text-foreground">${selectedPresale.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">You will receive</span>
                    <span className="text-primary font-semibold">
                      {(parseFloat(amount) / selectedPresale.price).toFixed(2)} {selectedPresale.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Vesting</span>
                    <span className="text-foreground text-xs">{selectedPresale.vestingSchedule}</span>
                  </div>
                </Card>
              )}

              <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-xs">
                <input type="checkbox" className="mt-0.5" required />
                <p className="text-muted-foreground">
                  I understand the vesting schedule and agree to the presale terms
                </p>
              </div>

              <Button 
                className="w-full" 
                onClick={handleParticipate}
                disabled={loading || !amount}
              >
                {loading ? 'Processing...' : 'Confirm Participation'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
