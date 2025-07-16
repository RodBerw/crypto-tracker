import { Coin } from "@/types/types";
import Image from "next/image";

export default function DetailsHeader({
  coin,
  isPositive,
}: {
  coin: Coin | null;
  isPositive: boolean;
}) {
  return (
    <div className="w-full flex items-center gap-6">
      <Image
        src={coin?.image || ""}
        alt={coin?.name || ""}
        width={64}
        height={64}
        className="w-8 h-8 xl:w-16 xl:h-16 rounded-full bg-gray-800"
      />
      <div className="">
        <h1 className="text-2xl xl:text-4xl font-extrabold">{coin?.name}</h1>
        <p className="text-gray-400 uppercase tracking-wide text-sm">
          {coin?.symbol}
        </p>
      </div>
      <div className="w-fit flex items-center gap-1 text-sm font-semibold">
        <span
          className={`${
            isPositive ? "text-green-400" : "text-red-400"
          } animate-pulse`}
        >
          {isPositive ? "▲" : "▼"}
        </span>
        <span className={isPositive ? "text-green-400" : "text-red-400"}>
          {coin?.price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}
