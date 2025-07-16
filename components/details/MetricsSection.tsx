import { Coin } from "@/types/types";

export default function MetricSection({ coin }: { coin: Coin | null }) {
  return (
    <div
      key={coin?.id}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs xl:text-sm text-wrap wrap-anywhere text-gray-300 fade-in"
    >
      <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-start gap-1">
        <p className="text-xs uppercase tracking-wide">All Time High</p>
        <span className="font-bold text-white">
          {coin?.ath.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          })}
        </span>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-start gap-1">
        <p className="text-xs uppercase tracking-wide">All Time Low</p>
        <span className="font-bold text-white">
          {coin?.atl.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          })}
        </span>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-start gap-1">
        <p className="text-xs uppercase tracking-wide">Market Cap</p>
        <span className="font-bold text-white">
          {coin?.market_cap.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          })}
        </span>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-start gap-1">
        <p className="text-xs uppercase tracking-wide">Circulating Supply</p>
        <span className="font-bold text-white">
          {coin?.circulating_supply.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          })}
        </span>
      </div>
    </div>
  );
}
