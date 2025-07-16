import { Coin } from "@/types/types";

export default function PriceSection({ coin }: { coin: Coin | null }) {
  return (
    <div
      key={coin?.id}
      className="w-full grid grid-cols-3 gap-6 border-y border-gray-700 py-6 text-sm text-gray-300 fade-in"
    >
      <div>
        <p className="mb-1 text-xs uppercase tracking-wider">Current Price</p>
        <p className="text-xl font-bold">
          ${coin?.current_price.toLocaleString()}
        </p>
      </div>
      <div>
        <p className="mb-1 text-xs uppercase tracking-wider">24h High / Low</p>
        <p className="font-medium">
          📈 ${coin?.high_24h}
          <br />
          📉 ${coin?.low_24h}
        </p>
      </div>
      <div>
        <p className="mb-1 text-xs uppercase tracking-wider">Market Cap Rank</p>
        <p className="font-bold text-white">#{coin?.market_cap_rank}</p>
      </div>
    </div>
  );
}
