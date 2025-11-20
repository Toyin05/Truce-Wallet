import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDownUp, Settings, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const tokens = [
  { symbol: 'ETH', name: 'Ethereum', balance: 2.5, price: 2400 },
  { symbol: 'USDC', name: 'USD Coin', balance: 5000, price: 1 },
  { symbol: 'USDT', name: 'Tether', balance: 3000, price: 1 },
  { symbol: 'MATIC', name: 'Polygon', balance: 1500, price: 0.85 },
  { symbol: 'BNB', name: 'Binance Coin', balance: 10, price: 320 },
];

export default function Swap() {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fromTokenData = tokens.find(t => t.symbol === fromToken);
  const toTokenData = tokens.find(t => t.symbol === toToken);
  
  const toAmount = fromAmount && fromTokenData && toTokenData
    ? ((parseFloat(fromAmount) * fromTokenData.price) / toTokenData.price).toFixed(6)
    : '';

  const exchangeRate = fromTokenData && toTokenData
    ? (fromTokenData.price / toTokenData.price).toFixed(6)
    : '0';

  const priceImpact = fromAmount ? ((parseFloat(fromAmount) * 0.01)).toFixed(2) : '0';

  const handleSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid amount',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Swap Successful',
        description: `Swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`,
      });
      
      setFromAmount('');
    } catch (error) {
      toast({
        title: 'Swap Failed',
        description: 'Failed to execute swap',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFlip = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Swap</h1>
            <p className="text-muted-foreground">Trade tokens instantly on BlockDAG</p>
          </div>
          <Button variant="outline" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        <Card className="p-6 bg-card border-border">
          <div className="space-y-4">
            {/* From Section */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">From</span>
                <span className="text-sm text-muted-foreground">
                  Balance: {fromTokenData?.balance || 0}
                </span>
              </div>
              <div className="flex gap-3">
                <Select value={fromToken} onValueChange={setFromToken}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map(token => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{token.symbol}</span>
                          <span className="text-xs text-muted-foreground">{token.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="0.0"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="flex-1 text-2xl"
                />
              </div>
              {fromAmount && fromTokenData && (
                <div className="text-right text-sm text-muted-foreground">
                  ≈ ${(parseFloat(fromAmount) * fromTokenData.price).toFixed(2)}
                </div>
              )}
            </div>

            {/* Flip Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={handleFlip}
                className="rounded-full"
              >
                <ArrowDownUp className="w-5 h-5" />
              </Button>
            </div>

            {/* To Section */}
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">To</span>
              <div className="flex gap-3">
                <Select value={toToken} onValueChange={setToToken}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map(token => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{token.symbol}</span>
                          <span className="text-xs text-muted-foreground">{token.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  placeholder="0.0"
                  value={toAmount}
                  readOnly
                  className="flex-1 text-2xl bg-muted"
                />
              </div>
              {toAmount && toTokenData && (
                <div className="text-right text-sm text-muted-foreground">
                  ≈ ${(parseFloat(toAmount) * toTokenData.price).toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Swap Details */}
        {fromAmount && (
          <Card className="p-4 bg-muted/50 border-border space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Exchange Rate</span>
              <span className="text-foreground">1 {fromToken} = {exchangeRate} {toToken}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price Impact</span>
              <span className={parseFloat(priceImpact) > 5 ? 'text-destructive' : 'text-foreground'}>
                {priceImpact}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Network Fee</span>
              <span className="text-foreground">~$2.50</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Slippage Tolerance</span>
              <span className="text-foreground">{slippage}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Route</span>
              <span className="text-foreground text-xs">{fromToken} → {toToken}</span>
            </div>
          </Card>
        )}

        {parseFloat(priceImpact) > 5 && (
          <div className="flex items-start gap-2 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <Info className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-destructive">High Price Impact</p>
              <p className="text-xs text-muted-foreground">
                This swap will significantly affect the token price. Consider swapping a smaller amount.
              </p>
            </div>
          </div>
        )}

        <Button 
          className="w-full h-12 text-lg" 
          onClick={handleSwap}
          disabled={loading || !fromAmount}
        >
          {loading ? 'Swapping...' : 'Swap Tokens'}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Powered by BlockDAG • Decentralized Trading
        </p>
      </div>
    </DashboardLayout>
  );
}
