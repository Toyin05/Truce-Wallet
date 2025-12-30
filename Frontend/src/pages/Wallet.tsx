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
  ExternalLink,
  Wallet as WalletIcon,
  Activity
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
  ethereum: [],
  polygon: [],
  bsc: [],
  blockdag: [],
};

const mockTransactions = [];

export default function Wallet() {
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [receiveModalOpen, setReceiveModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<{ symbol: string; balance: number; chain: string } | null>(null);
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
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">My Wallet</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Multi-chain crypto wallet powered by BlockDAG</p>
          </div>
          <div className="w-full sm:w-auto">
            <Select value={selectedChain} onValueChange={setSelectedChain}>
              <SelectTrigger className="w-full sm:w-[180px] bg-card border-border">
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
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-primary shadow-glow-primary border-0">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-white/80">Total Balance</p>
                <p className="text-2xl sm:text-4xl font-bold text-white">${totalValue.toLocaleString()}</p>
              </div>
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-white text-primary hover:bg-white/90 text-sm sm:text-base"
                  onClick={() => setSendModalOpen(true)}
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span className="hidden xs:inline">Send</span>
                  <span className="xs:hidden">Send</span>
                </Button>
                <Button 
                  className="flex-1 bg-white/10 text-white hover:bg-white/20 backdrop-blur text-sm sm:text-base"
                  onClick={() => setReceiveModalOpen(true)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden xs:inline">Receive</span>
                  <span className="xs:hidden">Rec</span>
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
            {tokens.length === 0 ? (
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-8">
                  <div className="text-center">
                    <WalletIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Assets Found</h3>
                    <p className="text-muted-foreground mb-4">
                      You don't have any tokens on {chains.find(c => c.id === selectedChain)?.name} yet.
                    </p>
                    <Button 
                      onClick={() => setReceiveModalOpen(true)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Receive Tokens
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              tokens.map((token) => (
                <Card key={token.symbol} className="bg-gradient-card border-border/50 hover:shadow-glow-primary transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted flex items-center justify-center text-lg sm:text-2xl flex-shrink-0">
                          {token.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm sm:text-base truncate">{token.name}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {token.balance.toLocaleString()} {token.symbol}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-sm sm:text-base">${token.value.toLocaleString()}</p>
                        <div
                          className={cn(
                            'text-xs sm:text-sm flex items-center justify-end gap-1',
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
              ))
            )}
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            {mockTransactions.length === 0 ? (
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Transactions Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Your transaction history will appear here once you start using your wallet.
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button 
                        onClick={() => setSendModalOpen(true)}
                        variant="outline"
                        size="sm"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send
                      </Button>
                      <Button 
                        onClick={() => setReceiveModalOpen(true)}
                        variant="outline"
                        size="sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Receive
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              mockTransactions.map((tx, i) => (
                <Card key={i} className="bg-gradient-card border-border/50 hover:shadow-glow-primary transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className={cn(
                          'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0',
                          tx.type === 'send' && 'bg-destructive/10',
                          tx.type === 'receive' && 'bg-success/10',
                          tx.type === 'swap' && 'bg-primary/10'
                        )}>
                          {tx.type === 'send' && <Send className="w-3 h-3 sm:w-4 sm:h-4 text-destructive" />}
                          {tx.type === 'receive' && <Download className="w-3 h-3 sm:w-4 sm:h-4 text-success" />}
                          {tx.type === 'swap' && <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold capitalize text-sm sm:text-base truncate">{tx.type} {tx.token}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{tx.time}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-sm sm:text-base">
                          {tx.type === 'send' ? '-' : '+'}{tx.amount} {tx.token}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">${tx.usdValue.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
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
