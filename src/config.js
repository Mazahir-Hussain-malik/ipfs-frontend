import { http, createConfig } from 'wagmi'
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors'
import {
  mainnet, bsc, polygon, linea, sepolia,
  arbitrum, optimism, base, avalanche
} from 'wagmi/chains'


const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}


export const supportedChains = [mainnet, bsc, polygon, linea, arbitrum, optimism, base, avalanche, sepolia]
export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const backendContractAddress = "0x85B3210eB6Cf4D3a0453B650Ad5DbE508fb0065c";

export const wagmiConfig = createConfig({
  chains: supportedChains,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [avalanche.id]: http(),
    [linea.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [bsc.id]: http(),
    [arbitrum.id]: http(),
    [sepolia.id]: http()
  },

  connectors: [
    walletConnect({ projectId: PROJECT_ID, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0]
    })
  ]
})

