import api from "@/config/configApi";
import { Coin } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ChartSection from "./ChartSection";
import DetailsHeader from "./DetailsHeader";
import MetricSection from "./MetricsSection";
import PriceSection from "./PriceSection";
import { Spinner } from "@heroui/spinner";

export default function DetailsSection({ coin }: { coin: Coin | null }) {
  const [chartData, setChartData] = useState([]);
  const [filterRange, setFilterRange] = useState(7);

  const {
    data: history,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["history", coin?.id, filterRange],
    queryFn: async () => {
      if (!coin) return null;

      const encodedUrl = encodeURIComponent(
        `https://api.coingecko.com/api/v3/coins/${coin?.id}/market_chart/?vs_currency=usd&days=${filterRange}`
      );
      const response = await api.get(`/api/proxy?url=${encodedUrl}`);

      return response.data;
    },
    enabled: !!coin && !!filterRange,
    retry: false,
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.response?.status === 429 || error.code === "ERR_NETWORK") {
          toast.error("Request limit exceeded. Please try again later.");
        } else {
          console.error("Unexpected error", error.message);
        }
      }
    },
  });

  // Transformar dados do gráfico para o Recharts
  useEffect(() => {
    if (!history || !history.prices) return;
    setChartData(
      history?.prices.map(
        ([timestamp, price]: [number, number], index: number) => ({
          date: timestamp,
          price: price.toFixed(2),
          marketCap: history.market_caps[index][1].toFixed(2),
          volume: history.total_volumes[index][1].toFixed(2),
        })
      ) ?? []
    );
  }, [history]);

  if (error) {
    return (
      <div className="w-1/2 h-full flex flex-col justify-center items-center py-8 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl text-white transition-all space-y-8 border border-gray-800">
        <p className="text-4xl text-gray-400">{`:(`}</p>
        <p className="text-center text-red-400">
          Error fetching data. Please try again later.
        </p>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="w-1/2 h-full flex justify-center items-center py-8 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl text-white transition-all space-y-8 border border-gray-800">
        <Spinner color="primary" />
      </div>
    );

  if (!coin)
    return (
      <div className="w-1/2 mx-auto p-4 h-full overflow-y-auto">None...</div>
    );

  const isPositive = coin?.price_change_percentage_24h >= 0;

  return (
    <div className="w-1/2 h-full py-8 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl text-white transition-all space-y-8 border border-gray-800">
      <div className="w-full h-full flex flex-col gap-4 px-6 overflow-y-auto">
        {/* Header */}
        <DetailsHeader coin={coin} isPositive={isPositive} />

        {/* Price Section */}
        <PriceSection coin={coin} key={coin?.id} />

        {/* Chart Section */}
        <ChartSection
          chartData={chartData}
          setFilterRange={setFilterRange}
          filterRange={filterRange}
        />

        {/* Metrics Section */}
        <MetricSection coin={coin} key={coin?.id} />

        <p className="text-xs mt-6 text-gray-500 text-right">
          Last Updated: {new Date(coin?.last_updated).toLocaleString("en-US")}
        </p>
      </div>
    </div>
  );
}
