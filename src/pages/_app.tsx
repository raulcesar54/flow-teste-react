import { ProviderBoard } from "@/hooks/useBoard";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProviderBoard>
      <Component {...pageProps} />
    </ProviderBoard>
  );
}
