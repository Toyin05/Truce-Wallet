import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Play, 
  ExternalLink,
  Video,
  FileText,
  Headphones,
  Globe,
  Shield,
  TrendingUp,
  Zap,
  Coins,
  Code,
  Users,
  Star,
  Award,
  CheckCircle2,
  ArrowRight,
  Target,
  Search,
  X
} from 'lucide-react';
import { useState } from 'react';

export default function Learn() {
  const [videoModal, setVideoModal] = useState<{isOpen: boolean, videoId: string, title: string}>({
    isOpen: false,
    videoId: '',
    title: ''
  });

  const openVideo = (videoId: string, title: string) => {
    setVideoModal({ isOpen: true, videoId, title });
  };

  const closeVideo = () => {
    setVideoModal({ isOpen: false, videoId: '', title: '' });
  };

  const openLink = (url: string) => {
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      // Fallback for popup blockers
      window.location.href = url;
    }
  };

  interface LearningResource {
    type: string;
    title: string;
    description?: string;
    action?: string;
    videoId?: string;
    url?: string;
  }

  const handleResourceClick = (resource: LearningResource) => {
    if (resource.type === 'video' && resource.videoId) {
      openVideo(resource.videoId, resource.title);
    } else if (resource.url) {
      openLink(resource.url);
    }
  };

  const learningResources = {
    blockdagMasterclass: {
      title: "BlockDAG Masterclass: The Future of Scalable & Secure Blockchain",
      resources: [
        {
          type: "video",
          title: "BlockDAG Explained: Unpacking the Revolutionary Technology",
          description: "YouTube Video - 25 min",
          action: "Watch Now",
          videoId: "-saPnq_dPVA"
        },
        {
          type: "document",
          title: "The Official BlockDAG Whitepaper: A Technical Deep Dive",
          description: "PDF/Article",
          action: "Read Now",
          url: "https://blockdag.network/blockdag-litepaper-r1.pdf"
        },
        {
          type: "article",
          title: "BlockDAG vs. Traditional Blockchain: A Comparative Analysis",
          description: "In-depth comparison",
          action: "Read Now",
          url: "https://www.dxtalks.com/blog/news-2/blockchain-vs-blockdag-the-technical-differences-for-professionals-773"
        }
      ]
    },
    web3Fundamentals: {
      title: "Web3 & Crypto Fundamentals: Your Essential Introduction",
      resources: [
        {
          type: "video",
          title: "Crypto & Blockchain for Dummies",
          description: "YouTube Playlist - 8 videos",
          action: "Watch Now",
          url: "https://www.youtube.com/playlist?list=PLPsA_XJRK4GPpG3hxJGCyC6H3aAv9AKRl"
        },
        {
          type: "article",
          title: "What is Web3? A Beginner's Guide to the Decentralized Internet",
          description: "Comprehensive guide",
          action: "Read Now",
          url: "https://blog.chainsafe.io/beginners-guide-web3js/"
        },
        {
          type: "video",
          title: "How Does Blockchain Technology Actually Work?",
          description: "Technical explanation",
          action: "Watch Now",
          videoId: "SSo_EIwHSd4"
        }
      ]
    },
    securityBasics: {
      title: "Advanced Wallet Security: Fortifying Your Digital Assets",
      resources: [
        {
          type: "video",
          title: "The Ultimate Guide to Crypto Cold Storage",
          description: "YouTube Video - 18 min",
          action: "Watch Now",
          videoId: "90DwyoAPQSw"
        },
        {
          type: "article",
          title: "Understanding Seed Phrases & Private Keys: The Foundation of Security",
          description: "Security fundamentals",
          action: "Read Now",
          url: "https://www.youtube.com/watch?v=-saPnq_dPVA"
        },
        {
          type: "guide",
          title: "Setting Up Hardware Wallets: A Step-by-Step Tutorial",
          description: "Practical tutorial",
          action: "Start Guide",
          url: "https://www.youtube.com/watch?v=d33JBZe56Ew"
        }
      ]
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Truce Wallet: Learn & Grow</h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Your ultimate hub for mastering cryptocurrency and BlockDAG technology. Dive into expertly curated resources, 
            from foundational concepts to advanced BlockDAG technology, and empower your journey in the decentralized world.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              <Search className="w-4 h-4 mr-2" />
              Browse Resources
            </Button>
            <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white">
              <BookOpen className="w-4 h-4 mr-2" />
              Start Learning
            </Button>
          </div>
        </div>

        {/* Featured Learning Paths */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            <h2 className="text-2xl font-bold text-foreground">Featured Learning Paths</h2>
          </div>
          <p className="text-muted-foreground mb-6">Kickstart your Web3 knowledge with our most popular and essential guides.</p>

          <div className="space-y-8">
            {/* BlockDAG Masterclass */}
            <Card className="p-8 bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-blue-600/20">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-lg bg-blue-600/20">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {learningResources.blockdagMasterclass.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Overview: A deep dive into BlockDAG technology, exploring its core principles, innovative architecture, 
                    and why it's poised to redefine distributed ledgers.
                  </p>
                  <div className="space-y-4">
                    {learningResources.blockdagMasterclass.resources.map((resource, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                        {resource.type === 'video' ? (
                          <Video className="w-5 h-5 text-red-500" />
                        ) : resource.type === 'document' ? (
                          <FileText className="w-5 h-5 text-blue-500" />
                        ) : (
                          <FileText className="w-5 h-5 text-green-500" />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{resource.title}</p>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => resource.type === 'video' ? 
                            openVideo(resource.videoId!, resource.title) : 
                            openLink(resource.url!)
                          }
                        >
                          {resource.type === 'video' ? (
                            <Play className="w-4 h-4 mr-2" />
                          ) : (
                            <ExternalLink className="w-4 h-4 mr-2" />
                          )}
                          {resource.action}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Web3 & Crypto Fundamentals */}
            <Card className="p-8 bg-gradient-to-br from-green-600/10 to-teal-600/10 border-green-600/20">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-lg bg-green-600/20">
                  <Coins className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {learningResources.web3Fundamentals.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Overview: Master the basics of cryptocurrencies, blockchain, and the decentralized web. 
                    Perfect for absolute beginners.
                  </p>
                  <div className="space-y-4">
                    {learningResources.web3Fundamentals.resources.map((resource, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                        {resource.type === 'video' ? (
                          <Video className="w-5 h-5 text-red-500" />
                        ) : (
                          <FileText className="w-5 h-5 text-blue-500" />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{resource.title}</p>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => resource.type === 'video' ? 
                            openVideo(resource.videoId!, resource.title) : 
                            openLink(resource.url!)
                          }
                        >
                          {resource.type === 'video' ? (
                            <Play className="w-4 h-4 mr-2" />
                          ) : (
                            <ExternalLink className="w-4 h-4 mr-2" />
                          )}
                          {resource.action}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Advanced Wallet Security */}
            <Card className="p-8 bg-gradient-to-br from-red-600/10 to-orange-600/10 border-red-600/20">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-lg bg-red-600/20">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {learningResources.securityBasics.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Overview: Learn critical strategies and best practices to protect your cryptocurrency and NFTs 
                    from sophisticated threats.
                  </p>
                  <div className="space-y-4">
                    {learningResources.securityBasics.resources.map((resource, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                        {resource.type === 'video' ? (
                          <Video className="w-5 h-5 text-red-500" />
                        ) : resource.type === 'document' ? (
                          <FileText className="w-5 h-5 text-blue-500" />
                        ) : (
                          <Code className="w-5 h-5 text-green-500" />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{resource.title}</p>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => resource.type === 'video' ? 
                            openVideo(resource.videoId!, resource.title) : 
                            openLink(resource.url!)
                          }
                        >
                          {resource.type === 'video' ? (
                            <Play className="w-4 h-4 mr-2" />
                          ) : (
                            <ExternalLink className="w-4 h-4 mr-2" />
                          )}
                          {resource.action}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Deep Dive Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-6 h-6 text-teal-600" />
            <h2 className="text-2xl font-bold text-foreground">Deep Dive: BlockDAG & Next-Gen Tech</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Explore the cutting-edge innovations transforming the decentralized landscape, with a strong focus on BlockDAG.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: FileText,
                title: "BlockDAG Use Cases",
                description: "Real-World Applications of BlockDAG Technology",
                type: "Article",
                color: "text-blue-500",
                url: "https://blockdag.network"
              },
              {
                icon: TrendingUp,
                title: "Scalability Solved?",
                description: "Technical Write-up on BlockDAG's Approach",
                type: "Technical Write-up",
                color: "text-purple-500",
                url: "https://blockdag.network/blockdag-litepaper-r1.pdf"
              },
              {
                icon: Shield,
                title: "Security Architecture",
                description: "Understanding BlockDAG's Consensus Mechanism and Security Features",
                type: "YouTube Video - 15 min",
                color: "text-green-500",
                videoId: "90DwyoAPQSw"
              },
              {
                icon: Coins,
                title: "Mining & Rewards",
                description: "How to Mine on BlockDAG Networks",
                type: "Article/Tutorial",
                color: "text-yellow-500",
                url: "https://www.youtube.com/playlist?list=PLPsA_XJRK4GPpG3hxJGCyC6H3aAv9AKRl"
              },
              {
                icon: Users,
                title: "Future Outlook",
                description: "Expert Panel on BlockDAG in Web3",
                type: "YouTube Video - 40 min",
                color: "text-red-500",
                videoId: "crReo0T7hSs"
              },
              {
                icon: Code,
                title: "Developer Resources",
                description: "Getting Started with BlockDAG Development",
                type: "Documentation",
                color: "text-teal-500",
                url: "https://blockdag.network/developers"
              }
            ].map((resource, index) => (
              <Card key={index} className="p-6 bg-card border-border hover:border-teal-600/50 transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-muted">
                    <resource.icon className={`w-6 h-6 ${resource.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground group-hover:text-teal-600 transition-colors">
                        {resource.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-teal-600 hover:text-teal-500 hover:bg-teal-600/10"
                      onClick={() => resource.videoId ? 
                        openVideo(resource.videoId, resource.title) : 
                        openLink(resource.url!)
                      }
                    >
                      {resource.videoId ? (
                        <Play className="w-4 h-4 mr-2" />
                      ) : (
                        <ExternalLink className="w-4 h-4 mr-2" />
                      )}
                      Access Resource
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Additional Resources */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card className="p-6 bg-card border-border">
              <div className="text-center space-y-4">
                <div className="p-4 rounded-lg bg-purple-600/20 mx-auto w-fit">
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-foreground">Case Study</h3>
                <p className="text-sm text-muted-foreground">
                  "Project X Leverages BlockDAG for Enterprise Solutions"
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => openLink('https://blockdag.network')}
                >
                  Read Case Study
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="text-center space-y-4">
                <div className="p-4 rounded-lg bg-orange-600/20 mx-auto w-fit">
                  <Headphones className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-foreground">Podcast</h3>
                <p className="text-sm text-muted-foreground">
                  "The BlockDAG Revolution: Interview with Dr. Anya Sharma"
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => openLink('https://podcasts.apple.com/us/podcast/the-blockdag-revolution-interview-with-dr-anya-sharma/id000000000')}
                >
                  Listen Now
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="text-center space-y-4">
                <div className="p-4 rounded-lg bg-green-600/20 mx-auto w-fit">
                  <Code className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-foreground">Developer Hub</h3>
                <p className="text-sm text-muted-foreground">
                  Complete BlockDAG development documentation and APIs
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => openLink('https://blockdag.network/developers')}
                >
                  View Docs
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Explore by Topic */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Search className="w-6 h-6 text-teal-600" />
            <h2 className="text-2xl font-bold text-foreground">Explore by Topic</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Dive into specific areas of interest with our extensive categorized resources.
          </p>

          <div className="space-y-8">
            {/* Wallets & Storage */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-foreground">1. Wallets & Storage (15+ Resources)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Hot vs. Cold Wallets: Pros and Cons", type: "Read", url: "https://www.binance.com/en/blog/421499824684900107/Hot-Wallet-vs-Cold-Wallet-Pro-and-Con" },
                  { title: "Beginner's Guide to Setting Up a Software Wallet", type: "Watch", videoId: "ZBzxDwGsG4k" },
                  { title: "Managing Multiple Chain Assets in a Single Wallet", type: "Article", url: "https://www.trustwallet.com/blog/multichain-asset-management" },
                  { title: "Common Wallet Security Questions Answered", type: "FAQ", url: "https://support.ledger.com/hc/en-us/articles/115005165269" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.type}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => item.videoId ? 
                        openVideo(item.videoId, item.title) : 
                        openLink(item.url!)
                      }
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* DeFi & Yield Farming */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-foreground">2. DeFi & Yield Farming (20+ Resources)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "DeFi for Beginners: Understanding Decentralized Finance", type: "Watch", videoId: "FTlczRUNJxQ" },
                  { title: "What is Yield Farming and How Does It Work?", type: "Read", url: "https://academy.binance.com/en/articles/yield-farming-explained" },
                  { title: "A Comprehensive Guide to Liquidity Pools", type: "Guide", url: "https://www.coingecko.com/en/liquidity-pools" },
                  { title: "Navigating DeFi Risks: Impermanent Loss & Scams", type: "Article", url: "https://decrypt.co/resources/what-is-impermanent-loss" },
                  { title: "Top 5 DeFi Protocols to Watch in 2024", type: "Watch", url: "https://decrypt.co/147031/top-5-defi-protocols-to-watch-in-2024" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.type}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => item.videoId ? 
                        openVideo(item.videoId, item.title) : 
                        openLink(item.url!)
                      }
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Trading & Analytics */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-foreground">3. Trading & Analytics (25+ Resources)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Technical Analysis Basics for Crypto Traders", type: "Watch", videoId: "wnX5lLMPQ7g" },
                  { title: "Understanding Market Cycles in Cryptocurrency", type: "Read", url: "https://www.binance.com/en/blog/421499824684900448/What-Are-The-Crypto-Market-Cycles-Explained" },
                  { title: "Using AI for Crypto Price Prediction: An Overview", type: "Guide", url: "https://www.analyticsvidhya.com/blog/2023/02/ai-for-cryptocurrency-price-prediction/" },
                  { title: "Risk Management Strategies for Crypto Trading", type: "Article", url: "https://www.investopedia.com/terms/r/riskmanagement.asp" },
                  { title: "How to Read Candlestick Charts Like a Pro", type: "Tool Guide", url: "https://www.babypips.com/learn/forex/candlestick-charting" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.type}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => item.videoId ? 
                        openVideo(item.videoId, item.title) : 
                        openLink(item.url!)
                      }
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Web3 Ecosystem & NFTs */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-teal-600" />
                <h3 className="text-xl font-bold text-foreground">4. Web3 Ecosystem & NFTs (18+ Resources)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "The Metaverse Explained: Beyond Gaming", type: "Watch", videoId: "4z_HrVq4-cI" },
                  { title: "What are NFTs and Why Do They Matter?", type: "Read", url: "https://www.coindesk.com/learn/what-are-nfts-and-why-are-they-important" },
                  { title: "Exploring Decentralized Autonomous Organizations (DAOs)", type: "Guide", url: "https://ethereum.org/en/dao/" },
                  { title: "The Future of Digital Identity in Web3", type: "Article", url: "https://www.forbes.com/sites/forbestechcouncil/2023/01/26/digital-identity-in-web3-a-new-era-of-self-sovereignty/" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.type}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => item.videoId ? 
                        openVideo(item.videoId, item.title) : 
                        openLink(item.url!)
                      }
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Why Truce Wallet's Learning Hub */}
        <Card className="p-8 bg-gradient-to-br from-teal-600/10 to-blue-600/10 border-teal-600/20">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Why Truce Wallet's Learning Hub?</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              We're committed to making Web3 accessible and understandable for everyone. Our Learning Hub continuously 
              curates the most relevant, insightful, and up-to-date educational content, empowering you with the knowledge 
              to confidently navigate and thrive in the decentralized world, with a special focus on emerging technologies like BlockDAG.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="p-4 rounded-lg bg-teal-600/20 mx-auto w-fit mb-3">
                  <BookOpen className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Expertly Curated</h3>
                <p className="text-sm text-muted-foreground">Content reviewed by industry experts</p>
              </div>
              <div className="text-center">
                <div className="p-4 rounded-lg bg-blue-600/20 mx-auto w-fit mb-3">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Always Updated</h3>
                <p className="text-sm text-muted-foreground">Latest information and trends</p>
              </div>
              <div className="text-center">
                <div className="p-4 rounded-lg bg-purple-600/20 mx-auto w-fit mb-3">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-foreground mb-2">BlockDAG Focus</h3>
                <p className="text-sm text-muted-foreground">Specialized in next-gen technology</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Video Modal */}
        {videoModal.isOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">{videoModal.title}</h3>
                <Button variant="ghost" size="icon" onClick={closeVideo}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${videoModal.videoId}?autoplay=1`}
                  title={videoModal.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}


