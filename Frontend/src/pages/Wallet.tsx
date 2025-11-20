import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { SendModal } from '@/components/SendModal';
import { ReceiveModal } from '@/components/ReceiveModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Send, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Copy,
  ExternalLink 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const chains = [
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', color: 'text-[#627EEA]' },
  { id: 'polygon', name: 'Polygon', symbol: 'MATIC', color: 'text-[#8247E5]' },
  { id: 'bsc', name: 'BSC', symbol: 'BNB', color: 'text-[#F3BA2F]' },
  { id: 'blockdag', name: 'BlockDAG', symbol: 'BDAG', color: 'text-primary' },
];

const mockTokens = {
  ethereum: [
    { name: 'Ethereum', symbol: 'ETH', balance: 2.456, value: 6140, change24h: 3.2, icon: '⟠' },
    { name: 'USD Coin', symbol: 'USDC', balance: 5000, value: 5000, change24h: 0.01, icon: '💵' },
    { name: 'Uniswap', symbol: 'UNI', balance: 150, value: 1200, change24h: -1.5, icon: '🦄' },
  ],
  polygon: [
    { name: 'Polygon', symbol: 'MATIC', balance: 2500, value: 2750, change24h: 5.3, icon: '🔷' },
    { name: 'Aave', symbol: 'AAVE', balance: 10, value: 900, change24h: 2.1, icon: '👻' },
  ],
  bsc: [
    { name: 'BNB', symbol: 'BNB', balance: 15, value: 4500, change24h: 1.8, icon: '💰' },
    { name: 'PancakeSwap', symbol: 'CAKE', balance: 200, value: 600, change24h: -0.5, icon: '🥞' },
  ],
  blockdag: [
    { name: 'BlockDAG', symbol: 'BDAG', balance: 10000, value: 3000, change24h: 8.5, icon: '⛓️' },
  ],
};

const mockTransactions = [
  { type: 'send', token: 'ETH', amount: 0.5, usdValue: 1250, time: '2 hours ago', status: 'success' },
  { type: 'receive', token: 'USDC', amount: 1000, usdValue: 1000, time: '5 hours ago', status: 'success' },
  { type: 'swap', token: 'UNI', amount: 50, usdValue: 400, time: '1 day ago', status: 'success' },
];

export default function Wallet() {
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [receiveModalOpen, setReceiveModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const { toast } = useToast();

  const tokens = mockTokens[selectedChain as keyof typeof mockTokens] || [];
  const totalValue = tokens.reduce((sum, token) => sum + token.value, 0);

  const handleCopyAddress = () => {
    toast({
      title: 'Copied!',
      description: 'Wallet address copied to clipboard',
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Wallet</h1>
            <p className="text-muted-foreground">Multi-chain crypto wallet powered by BlockDAG</p>
          </div>
          <Select value={selectedChain} onValueChange={setSelectedChain}>
            <SelectTrigger className="w-[180px] bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {chains.map((chain) => (
                <SelectItem key={chain.id} value={chain.id}>
                  <span className={chain.color}>{chain.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-primary shadow-glow-primary border-0">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-white/80">Total Balance</p>
                <p className="text-4xl font-bold text-white">${totalValue.toLocaleString()}</p>
              </div>
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-white text-primary hover:bg-white/90"
                  onClick={() => setSendModalOpen(true)}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
                <Button 
                  className="flex-1 bg-white/10 text-white hover:bg-white/20 backdrop-blur"
                  onClick={() => setReceiveModalOpen(true)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Receive
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="tokens" className="space-y-4">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="tokens" className="space-y-4">
            {tokens.map((token) => (
              <Card key={token.symbol} className="bg-gradient-card border-border/50 hover:shadow-glow-primary transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">
                        {token.icon}
                      </div>
                      <div>
                        <p className="font-semibold">{token.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {token.balance.toLocaleString()} {token.symbol}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${token.value.toLocaleString()}</p>
                      <div
                        className={cn(
                          'text-sm flex items-center justify-end gap-1',
                          token.change24h >= 0 ? 'text-success' : 'text-destructive'
                        )}
                      >
                        {token.change24h >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {Math.abs(token.change24h)}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            {mockTransactions.map((tx, i) => (
              <Card key={i} className="bg-gradient-card border-border/50 hover:shadow-glow-primary transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        tx.type === 'send' && 'bg-destructive/10',
                        tx.type === 'receive' && 'bg-success/10',
                        tx.type === 'swap' && 'bg-primary/10'
                      )}>
                        {tx.type === 'send' && <Send className="w-4 h-4 text-destructive" />}
                        {tx.type === 'receive' && <Download className="w-4 h-4 text-success" />}
                        {tx.type === 'swap' && <TrendingUp className="w-4 h-4 text-primary" />}
                      </div>
                      <div>
                        <p className="font-semibold capitalize">{tx.type} {tx.token}</p>
                        <p className="text-sm text-muted-foreground">{tx.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {tx.type === 'send' ? '-' : '+'}{tx.amount} {tx.token}
                      </p>
                      <p className="text-sm text-muted-foreground">${tx.usdValue.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      
      <SendModal 
        open={sendModalOpen} 
        onOpenChange={setSendModalOpen}
        selectedToken={selectedToken}
      />
      <ReceiveModal 
        open={receiveModalOpen} 
        onOpenChange={setReceiveModalOpen}
      />
    </DashboardLayout>
  );
}
