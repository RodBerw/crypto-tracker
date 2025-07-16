import { Coin } from "@/types/types";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { motion } from "framer-motion";

export default function CoinCard({
  coin,
  selected,
}: {
  coin: Coin;
  selected: boolean;
}) {
  const isPositive = coin.price_change_percentage_24h > 0;
  const currentPrice = coin.current_price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: 2 }}
      //whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="transition-transform h-fit"
    >
      <Card
        key={coin.id}
        className={`bg-gradient-to-br border-1 from-gray-800 to-gray-900 p-4 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow h-[220px] w-full ${
          selected
            ? "brightness-125  border-gray-600 shadow-lg shadow-gray-900 rouned-lg overflow-hidden bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900"
            : "border-transparent"
        } transition-all duration-500 ease-in-out`}
      >
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-3 bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
            <img
              src={coin.image}
              alt={coin.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col w-full">
              <p className="text-lg font-semibold">
                {coin.symbol.toUpperCase()}
              </p>
              <p className="text-sm text-gray-400 w-full line-clamp-2">
                {coin.name}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardBody className="w-full h-fit">
          <div className="w-full flex gap-1 items-start">
            <p
              className={`w-2/3 flex-1 ${
                currentPrice.length > 6 ? "text-xl" : "text-3xl"
              } font-extrabold font-fit`}
            >
              {currentPrice}
            </p>
            <div className="w-fit flex items-center gap-1 text-sm font-semibold">
              <span
                className={`${
                  isPositive ? "text-green-400" : "text-red-400"
                } animate-pulse`}
              >
                {isPositive ? "▲" : "▼"}
              </span>
              <span className={isPositive ? "text-green-400" : "text-red-400"}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          </div>

          <div className="mt-3 flex justify-between text-xs text-gray-400">
            <span>Rank: #{coin.market_cap_rank}</span>
            <span>
              Last Updated: {new Date(coin.last_updated).toLocaleDateString()}
            </span>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
