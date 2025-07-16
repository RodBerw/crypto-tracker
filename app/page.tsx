"use client";

import CardContainer from "@/components/CardsContainer";
import DetailsSection from "@/components/details/DetailsSection";
import MenuHeader from "@/components/MenuHeader";
import api from "@/config/configApi";
import { Coin } from "@/types/types";
import { Input } from "@heroui/react";
import { Spinner } from "@heroui/spinner";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const {
    data: allCoins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allCoins"],
    queryFn: async () => {
      const encodedUrl = encodeURIComponent(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
      );
      const response = await api.get(`/api/proxy?url=${encodedUrl}`);
      setSelectedCoin(response.data[0]);

      return response.data as Coin[];
    },
    onError: (_error) => {
      toast.error("Request limit exceeded. Please try again later.");
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false, // ✅ não refetch ao focar a aba
    refetchOnReconnect: false, // ✅ não refetch ao reconectar
    retry: false,
  });

  const [paginatedCoins, setPaginatedCoins] = useState<Coin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [search, setSearch] = useState("");

  const pageLength = 25;

  useEffect(() => {
    if (allCoins?.length) {
      const startIndex = (currentPage - 1) * pageLength;
      const endIndex = startIndex + pageLength;
      setPaginatedCoins(allCoins.slice(startIndex, endIndex));
    }
  }, [allCoins, currentPage]);

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner color="primary" />
      </div>
    );
  if (error)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-2xl font-bold">
          Request limit exceeded. Please try again later.
        </p>
      </div>
    );

  return (
    <div className="h-screen font-sans w-full flex p-12 gap-8 ">
      <div className="w-full flex flex-col gap-4">
        <MenuHeader />
        <div className="w-full flex items-center justify-between">
          <Input
            type="text"
            className="w-1/4 rounded-lg border-none text-white !focus:bg-gray-800"
            classNames={{
              inputWrapper: "bg-gray-800 !focus:bg-gray-800 border-none",
            }}
            placeholder="Search"
            variant="faded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <CardContainer
          allCoins={
            paginatedCoins.filter(
              (coin) =>
                !search ||
                coin.name.toLowerCase().includes(search.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(search.toLowerCase())
            ) || []
          }
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
        />
      </div>
      <DetailsSection coin={selectedCoin} />
    </div>
  );
}
