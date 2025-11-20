import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Search, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  market_cap: number;
  total_volume: number;
}

export default function Market() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchMarketData = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h,7d'
      );
      const data = await response.json();
      setCoins(data);
    } catch (error) {
      console.error('Error fetching market data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (coinId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(coinId)) {
        newFavorites.delete(coinId);
      } else {
        newFavorites.add(coinId);
      }
      return newFavorites;
    });
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Market Overview</h1>
            <p className="text-muted-foreground">Live cryptocurrency prices powered by BlockDAG</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search cryptocurrencies..."
            className="pl-10 h-12 bg-card border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Market Cap</p>
              <p className="text-2xl font-bold mt-1">
                ${(coins.reduce((sum, coin) => sum + coin.market_cap, 0) / 1e9).toFixed(2)}B
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">24h Volume</p>
              <p className="text-2xl font-bold mt-1">
                ${(coins.reduce((sum, coin) => sum + coin.total_volume, 0) / 1e9).toFixed(2)}B
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Bitcoin Dominance</p>
              <p className="text-2xl font-bold mt-1">45.2%</p>
            </CardContent>
          </Card>
        </div>

        {/* Coins Table */}
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr className="text-left">
                    <th className="p-4 font-medium text-muted-foreground">#</th>
                    <th className="p-4 font-medium text-muted-foreground">Coin</th>
                    <th className="p-4 font-medium text-muted-foreground text-right">Price</th>
                    <th className="p-4 font-medium text-muted-foreground text-right">24h</th>
                    <th className="p-4 font-medium text-muted-foreground text-right">7d</th>
                    <th className="p-4 font-medium text-muted-foreground text-right">Market Cap</th>
                    <th className="p-4 font-medium text-muted-foreground text-right">Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-muted-foreground">
                        Loading market data...
                      </td>
                    </tr>
                  ) : (
                    filteredCoins.map((coin, index) => (
                      <tr
                        key={coin.id}
                        className="border-b border-border/50 hover:bg-muted/20 transition-colors duration-200"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleFavorite(coin.id)}
                              className="hover:scale-110 transition-transform"
                            >
                              <Star
                                className={cn(
                                  'w-4 h-4',
                                  favorites.has(coin.id) ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'
                                )}
                              />
                            </button>
                            <span className="text-muted-foreground">{index + 1}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                            <div>
                              <p className="font-semibold">{coin.name}</p>
                              <p className="text-sm text-muted-foreground uppercase">{coin.symbol}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-right font-medium">
                          ${coin.current_price.toLocaleString()}
                        </td>
                        <td className="p-4 text-right">
                          <Badge
                            variant="outline"
                            className={cn(
                              'border-0',
                              coin.price_change_percentage_24h >= 0
                                ? 'bg-green-500/10 text-green-500'
                                : 'bg-red-500/10 text-red-500'
                            )}
                          >
                            <div className="flex items-center gap-1">
                              {coin.price_change_percentage_24h >= 0 ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : (
                                <TrendingDown className="w-3 h-3" />
                              )}
                              {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                            </div>
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <Badge
                            variant="outline"
                            className={cn(
                              'border-0',
                              coin.price_change_percentage_7d_in_currency >= 0
                                ? 'bg-green-500/10 text-green-500'
                                : 'bg-red-500/10 text-red-500'
                            )}
                          >
                            {coin.price_change_percentage_7d_in_currency >= 0 ? '+' : ''}
                            {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          ${(coin.market_cap / 1e9).toFixed(2)}B
                        </td>
                        <td className="p-4 text-right text-muted-foreground">
                          ${(coin.total_volume / 1e9).toFixed(2)}B
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}