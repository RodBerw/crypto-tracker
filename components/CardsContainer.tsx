import { Coin } from "@/types/types";
import { Card, CardBody, CardHeader } from "@heroui/card";
import CoinCard from "./CoinCard";
import React from "react";

export default function CardContainer({
  allCoins,
  selectedCoin,
  setSelectedCoin,
}: {
  allCoins: Coin[];
  selectedCoin: Coin | null;
  setSelectedCoin: React.Dispatch<React.SetStateAction<Coin | null>>;
}) {
  return (
    <div className="w-full py-4 px-2 overflow-y-auto overflow-x-hidden h-fit max-h-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {allCoins.map((coin) => (
        <div
          className={`cursor-pointer hover:brightness-105 transition duration-300 ease-in-out `}
          key={coin.id}
          onClick={() => setSelectedCoin(coin)}
        >
          <CoinCard
            key={coin.id}
            coin={coin}
            selected={coin.id === selectedCoin?.id}
          />
        </div>
      ))}
    </div>
  );
}
