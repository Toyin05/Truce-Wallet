import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

interface SendModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedToken?: { symbol: string; balance: number; chain: string };
}

export function SendModal({ open, onOpenChange, selectedToken }: SendModalProps) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedChain, setSelectedChain] = useState(selectedToken?.chain || 'ethereum');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleMaxClick = () => {
    if (selectedToken) {
      setAmount(selectedToken.balance.toString());
    }
  };

  const handleSend = async () => {
    if (!recipient || !amount) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Transaction Sent',
        description: `Successfully sent ${amount} ${selectedToken?.symbol || 'tokens'}`,
      });
      
      onOpenChange(false);
      setRecipient('');
      setAmount('');
    } catch (error) {
      toast({
        title: 'Transaction Failed',
        description: 'Failed to send transaction',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Send className="w-5 h-5 text-primary" />
            Send {selectedToken?.symbol || 'Crypto'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="chain">Network</Label>
            <Select value={selectedChain} onValueChange={setSelectedChain}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="polygon">Polygon</SelectItem>
                <SelectItem value="bsc">BSC</SelectItem>
                <SelectItem value="blockdag">BlockDAG</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="amount">Amount</Label>
              {selectedToken && (
                <span className="text-sm text-muted-foreground">
                  Balance: {selectedToken.balance} {selectedToken.symbol}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                id="amount"
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button variant="outline" onClick={handleMaxClick}>
                MAX
              </Button>
            </div>
          </div>

          <div className="rounded-lg bg-muted/50 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Network Fee</span>
              <span className="text-foreground">~$2.50</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="text-foreground font-semibold">
                {amount || '0'} {selectedToken?.symbol || 'tokens'} + fee
              </span>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Transaction'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
