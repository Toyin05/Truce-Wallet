import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

@Injectable()
export class BlockchainService {
  private providers: Map<string, ethers.JsonRpcProvider> = new Map();
  private signers: Map<string, ethers.Wallet> = new Map();

  constructor(private configService: ConfigService) {
    this.initializeProviders();
  }

  private initializeProviders() {
    // BlockDAG mainnet
    const blockdagRpcUrl = this.configService.get<string>('BLOCKDAG_RPC_URL', 'https://rpc.blockdag.network');
    this.providers.set('blockdag', new ethers.JsonRpcProvider(blockdagRpcUrl));

    // Ethereum mainnet
    const ethereumRpcUrl = this.configService.get<string>('ETHEREUM_RPC_URL', 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY');
    this.providers.set('ethereum', new ethers.JsonRpcProvider(ethereumRpcUrl));

    // Polygon mainnet
    const polygonRpcUrl = this.configService.get<string>('POLYGON_RPC_URL', 'https://polygon-rpc.com');
    this.providers.set('polygon', new ethers.JsonRpcProvider(polygonRpcUrl));

    // BSC mainnet
    const bscRpcUrl = this.configService.get<string>('BSC_RPC_URL', 'https://bsc-dataseed.binance.org');
    this.providers.set('bsc', new ethers.JsonRpcProvider(bscRpcUrl));

    // Initialize signers if private key is provided
    const privateKey = this.configService.get<string>('WALLET_PRIVATE_KEY');
    if (privateKey) {
      this.providers.forEach((provider, network) => {
        this.signers.set(network, new ethers.Wallet(privateKey, provider));
      });
    }
  }

  getProvider(network: string): ethers.JsonRpcProvider {
    const provider = this.providers.get(network);
    if (!provider) {
      throw new Error(`Provider for network ${network} not found`);
    }
    return provider;
  }

  getSigner(network: string): ethers.Wallet {
    const signer = this.signers.get(network);
    if (!signer) {
      throw new Error(`Signer for network ${network} not found`);
    }
    return signer;
  }

  async getBalance(address: string, network: string): Promise<string> {
    const provider = this.getProvider(network);
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  async getTokenBalance(tokenAddress: string, walletAddress: string, network: string): Promise<string> {
    const provider = this.getProvider(network);
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ['function balanceOf(address) view returns (uint256)'],
      provider
    );
    const balance = await tokenContract.balanceOf(walletAddress);
    return balance.toString();
  }

  async sendTransaction(
    to: string,
    amount: string,
    network: string,
    gasLimit?: number
  ): Promise<ethers.TransactionResponse> {
    const signer = this.getSigner(network);
    const tx = {
      to,
      value: ethers.parseEther(amount),
      gasLimit: gasLimit || 21000,
    };
    return await signer.sendTransaction(tx);
  }

  async estimateGas(network: string, tx: any): Promise<bigint> {
    const provider = this.getProvider(network);
    return await provider.estimateGas(tx);
  }

  async getTransactionReceipt(txHash: string, network: string): Promise<ethers.TransactionReceipt | null> {
    const provider = this.getProvider(network);
    return await provider.getTransactionReceipt(txHash);
  }

  async getBlockNumber(network: string): Promise<number> {
    const provider = this.getProvider(network);
    return await provider.getBlockNumber();
  }

  async getGasPrice(network: string): Promise<string> {
    const provider = this.getProvider(network);
    const gasPrice = await provider.getFeeData();
    return gasPrice.gasPrice?.toString() || '0';
  }

  async isAddressValid(address: string): Promise<boolean> {
    return ethers.isAddress(address);
  }

  generateWallet(): { address: string; privateKey: string; mnemonic: string } {
    const wallet = ethers.Wallet.createRandom();
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic?.phrase || '',
    };
  }

  getContract(address: string, abi: any[], network: string, signer = false) {
    const provider = this.getProvider(network);
    if (signer) {
      const wallet = this.getSigner(network);
      return new ethers.Contract(address, abi, wallet);
    }
    return new ethers.Contract(address, abi, provider);
  }
}