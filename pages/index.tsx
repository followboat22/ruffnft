/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from 'next/link'

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useCandyMachine from "../hooks/useCandyMachine";
import useWalletBalance from "../hooks/useWalletBalance";
import { useWallet } from "@solana/wallet-adapter-react";

import { Toaster } from "react-hot-toast";
import Countdown from "react-countdown";
import useWalletNfts from "../hooks/useWalletNFTs";
import AnNFT from "../components/AnNFT/AnNFT";

export default function Home() {
  const [balance] = useWalletBalance();
  const {
    isSoldOut,
    mintStartDate,
    isMinting,
    startMint,
    startMintMultiple,
    nftsData,
  } = useCandyMachine();

  const [isLoading, nfts] = useWalletNfts();

  const { connected } = useWallet();

  const [isMintLive, setIsMintLive] = useState(false);

  useEffect(() => {
    if (new Date(mintStartDate).getTime() < Date.now()) {
      setIsMintLive(true);
    }
  }, []);

  const MintMany = () => {
    const [mintCount, setMintCount] = useState(1);

    return (
      <>
      <div></div>
      <div></div>

        <button
          onClick={() => startMintMultiple(mintCount)}
          disabled={isMinting}
          className="px-10 py-5 mx-1 font-bold text-white transition-opacity rounded-lg hover:opacity-75 bg-gradient-to-br from-blue-100 via-blue-500 to-blue-100"
        >
          {isMinting ? "LOADING" : `MINT ${mintCount} RUFFLIFE RESCUES`}
        </button>
        <div></div>
        <div></div>
        <input
          disabled={isMinting}
          type="number"
          min={1}
          max={100}
          className="px-2 mx-auto mt-5 font-bold text-white bg-gray-500"
          value={mintCount}
          onChange={(e) => setMintCount((e.target as any).value)}
        />
        <p className="mx-auto mt-2">Mint Up To 100 RuffLife NFTs</p>
          <img
            src={`/candy.gif`}
            height={250}
            width={250}
            alt="RuffLife GIF" 
          />
      </>
    );
  };

  return (
    <>
      <Head>
        <title>RuffLife Minting Dapp</title>
        <meta
          name="description"
          content="Simplified NextJs with typescript example app integrated with Metaplex's Candy Machine"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center min-h-screen mx-5">
        <Toaster />
        <div className="flex items-center justify-between w-full mt-0">
          <Link href="https://rufflife.io/">
            <img
                src={`/logo.svg`}
                height={125}
                width={125}
                alt="RuffLife" 
            />
          </Link>

          <div className="flex items-center">
            {connected && (
              <div className="flex items-end mr-2">
              
              </div>
            )}
            <WalletMultiButton />
          </div>
        </div>
        
        <div className="flex items-start justify-center w-11/12">
          {connected ? (
            <>
              {new Date(mintStartDate).getTime() < Date.now() ? (
                <>
                  {isSoldOut ? (
                    <p>SOLD OUT</p>
                  ) : (
                    <>
                      <div className="flex flex-col justify-center items-center space-y-2">
                        <img
                          src={`/logo.svg`}
                          height={200}
                          width={200}
                          alt="RuffLife" 
                        />
                        <h1 className="mb-5 text-3xl font-bold center">ADOPT YOUR RUFFLIFE RESCUES</h1>
                          <div className="flex flex-col justify-center items-center flex-1 space-y-2">
                            {connected && (
                            <h1 className="text-2xl font-bold">
                              <span className="flex flex-col justify-center items-center flex-1 space-y-3"></span>{" "}
                              {nftsData.itemsRedeemed}/{nftsData.itemsAvailable} MINTED
                            </h1>
                             )}
                          </div>
                        <MintMany />
                      </div>
                    </>
                  )}
                </>
              ) : (
                <Countdown
                  date={mintStartDate}
                  onMount={({ completed }) => completed && setIsMintLive(true)}
                  onComplete={() => setIsMintLive(true)}
                />
              )}
            </>
          ) : (
            <h1 className="mb-10 text-2xl font-bold">Connect Wallet to Mint</h1>
          )}
        </div>
      </div>
    </>
  );
}
