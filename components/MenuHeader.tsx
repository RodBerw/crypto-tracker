import { Button } from "@heroui/react";

export default function MenuHeader() {
  return (
    <div className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-lg">
      <div className="flex gap-4 items-center">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
          ₪ Crypto Tracker
        </h1>
      </div>

      <div className="flex gap-8 items-center text-gray-300 text-sm">
        <div className="flex items-center gap-2 ">
          <span className="text-xs opacity-70">Created by</span>
          <a
            href="https://github.com/RodBerw"
            target="_blank"
            className="text-lg font-semibold text-white hover:text-yellow-400 transition-colors duration-300"
          >
            Rodolfo Berwanger
          </a>
        </div>
        <Button className="flex items-center gap-2 bg-transparent text-white hover:bg-gray-800">
          <img
            src="/github-mark-white.svg"
            alt="Rodolfo Berwanger"
            className="w-8 h-8"
          />
          <a href="https://github.com/RodBerw/crypto-tracker#" target="_blank">
            GitHub
          </a>
        </Button>
      </div>
    </div>
  );
}
