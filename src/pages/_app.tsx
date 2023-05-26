import { ChakraProvider } from "@chakra-ui/react";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { useMemo } from "react";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  MathWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

require('@solana/wallet-adapter-react-ui/styles.css');

import theme from "../theme";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new GlowWalletAdapter(),
      new MathWalletAdapter(),
    ],
    []
  );

  const endpoint = useMemo(() => clusterApiUrl("mainnet-beta"), []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <ChakraProvider theme={theme}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
          <Component {...pageProps} />
          </WalletModalProvider>
        </WalletProvider>
      </ChakraProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
