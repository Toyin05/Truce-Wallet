import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Download, QrCode } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ReceiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReceiveModal({ open, onOpenChange }: ReceiveModalProps) {
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const { toast } = useToast();
  
  // Mock wallet address - in production, this would come from the actual wallet
  const walletAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb9';

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: 'Address Copied',
      description: 'Wallet address copied to clipboard',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Download className="w-5 h-5 text-primary" />
            Receive Crypto
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Network</Label>
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

          <div className="flex justify-center">
            <div className="bg-background p-6 rounded-lg border-2 border-border">
              <div className="w-48 h-48 flex items-center justify-center">
                <QrCode className="w-full h-full text-foreground" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Your Wallet Address</Label>
            <div className="flex gap-2">
              <div className="flex-1 bg-muted rounded-lg p-3 font-mono text-sm break-all">
                {walletAddress}
              </div>
              <Button variant="outline" size="icon" onClick={handleCopy}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-lg bg-muted/50 p-4 space-y-1">
            <p className="text-sm font-medium text-foreground">Important:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Only send {selectedChain.toUpperCase()} assets to this address</li>
              <li>• Sending other assets may result in permanent loss</li>
              <li>• Always verify the network before sending</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
