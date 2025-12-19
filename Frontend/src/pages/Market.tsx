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
<<<<<<< HEAD
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Market Overview</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Live cryptocurrency prices powered by BlockDAG</p>
=======
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Market Overview</h1>
            <p className="text-muted-foreground">Live cryptocurrency prices powered by BlockDAG</p>
>>>>>>> upstream/main
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search cryptocurrencies..."
<<<<<<< HEAD
            className="pl-10 h-10 sm:h-12 bg-card border-border text-sm sm:text-base"
=======
            className="pl-10 h-12 bg-card border-border"
>>>>>>> upstream/main
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Market Stats */}
<<<<<<< HEAD
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-4">
              <p className="text-xs sm:text-sm text-muted-foreground">Total Market Cap</p>
              <p className="text-lg sm:text-2xl font-bold mt-1">
=======
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Market Cap</p>
              <p className="text-2xl font-bold mt-1">
>>>>>>> upstream/main
                ${(coins.reduce((sum, coin) => sum + coin.market_cap, 0) / 1e9).toFixed(2)}B
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-4">
<<<<<<< HEAD
              <p className="text-xs sm:text-sm text-muted-foreground">24h Volume</p>
              <p className="text-lg sm:text-2xl font-bold mt-1">
=======
              <p className="text-sm text-muted-foreground">24h Volume</p>
              <p className="text-2xl font-bold mt-1">
>>>>>>> upstream/main
                ${(coins.reduce((sum, coin) => sum + coin.total_volume, 0) / 1e9).toFixed(2)}B
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-4">
<<<<<<< HEAD
              <p className="text-xs sm:text-sm text-muted-foreground">Bitcoin Dominance</p>
              <p className="text-lg sm:text-2xl font-bold mt-1">45.2%</p>
=======
              <p className="text-sm text-muted-foreground">Bitcoin Dominance</p>
              <p className="text-2xl font-bold mt-1">45.2%</p>
>>>>>>> upstream/main
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
<<<<<<< HEAD
                    <th className="p-2 sm:p-4 font-medium text-xs sm:text-sm text-muted-foreground">#</th>
                    <th className="p-2 sm:p-4 font-medium text-xs sm:text-sm text-muted-foreground">Coin</th>
                    <th className="p-2 sm:p-4 font-medium text-xs sm:text-sm text-muted-foreground text-right">Price</th>
                    <th className="hidden sm:table-cell p-4 font-medium text-xs sm:text-sm text-muted-foreground text-right">24h</th>
                    <th className="hidden sm:table-cell p-4 font-medium text-xs sm:text-sm text-muted-foreground text-right">7d</th>
                    <th className="hidden md:table-cell p-4 font-medium text-xs sm:text-sm text-muted-foreground text-right">Market Cap</th>
                    <th className="hidden md:table-cell p-4 font-medium text-xs sm:text-sm text-muted-foreground text-right">Volume</th>
=======
                    <th className="p-4 font-medium text-muted-foreground">#</th>
                    <th className="p-4 font-medium text-muted-foreground">Coin</th>
                    <th className="p-4 font-medium text-muted-foreground text-right">Price</th>
                    <th className="p-4 font-medium text-muted-foreground text-right">24h</th>
                    <th className="p-4 font-medium text-muted-foreground text-right">7d</th>
                    <th className="p-4 font-medium text-muted-foreground text-right">Market Cap</th>
                    <th className="p-4 font-medium text-muted-foreground text-right">Volume</th>
>>>>>>> upstream/main
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
<<<<<<< HEAD
                      <td colSpan={7} className="p-4 sm:p-8 text-center text-xs sm:text-sm text-muted-foreground">
=======
                      <td colSpan={7} className="p-8 text-center text-muted-foreground">
>>>>>>> upstream/main
                        Loading market data...
                      </td>
                    </tr>
                  ) : (
                    filteredCoins.map((coin, index) => (
                      <tr
                        key={coin.id}
                        className="border-b border-border/50 hover:bg-muted/20 transition-colors duration-200"
                      >
<<<<<<< HEAD
                        <td className="p-2 sm:p-4">
                          <div className="flex items-center gap-1 sm:gap-2">
=======
                        <td className="p-4">
                          <div className="flex items-center gap-2">
>>>>>>> upstream/main
                            <button
                              onClick={() => toggleFavorite(coin.id)}
                              className="hover:scale-110 transition-transform"
                            >
                              <Star
                                className={cn(
<<<<<<< HEAD
                                  'w-3 h-3 sm:w-4 sm:h-4',
=======
                                  'w-4 h-4',
>>>>>>> upstream/main
                                  favorites.has(coin.id) ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'
                                )}
                              />
                            </button>
<<<<<<< HEAD
                            <span className="text-xs sm:text-sm text-muted-foreground">{index + 1}</span>
                          </div>
                        </td>
                        <td className="p-2 sm:p-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <img src={coin.image} alt={coin.name} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
                            <div className="min-w-0">
                              <p className="font-semibold text-sm sm:text-base truncate">{coin.name}</p>
                              <p className="text-xs sm:text-sm text-muted-foreground uppercase truncate">{coin.symbol}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 sm:p-4 text-right font-medium text-xs sm:text-sm">
                          ${coin.current_price.toLocaleString()}
                        </td>
                        <td className="hidden sm:table-cell p-4 text-right">
=======
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
>>>>>>> upstream/main
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
<<<<<<< HEAD
                        <td className="hidden sm:table-cell p-4 text-right">
=======
                        <td className="p-4 text-right">
>>>>>>> upstream/main
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
<<<<<<< HEAD
                        <td className="hidden md:table-cell p-4 text-right text-xs sm:text-sm">
                          ${(coin.market_cap / 1e9).toFixed(2)}B
                        </td>
                        <td className="hidden md:table-cell p-4 text-right text-xs sm:text-sm text-muted-foreground">
=======
                        <td className="p-4 text-right">
                          ${(coin.market_cap / 1e9).toFixed(2)}B
                        </td>
                        <td className="p-4 text-right text-muted-foreground">
>>>>>>> upstream/main
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
<<<<<<< HEAD
}
=======
}
>>>>>>> upstream/main
