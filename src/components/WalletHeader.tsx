import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { useWalletContext } from "@/contexts/WalletContext";
import Image from "next/image";

export default function WalletHeader() {
  const {
    xrpAddress,
    isLoading,
    error,
    xummQrCode,
    xummJumpLink,
    connectXUMM,
    connectGEM,
    connectCrossmark,
    disconnect,
  } = useWalletContext();

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">EdelPay</h1>
          </div>

          {/* Wallet Section */}
          <div className="flex items-center space-x-4">
            {error && (
              <div className="text-red-600 text-sm">
                Error: {error}
              </div>
            )}

            {xrpAddress ? (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Connected</p>
                  <p className="font-mono text-sm text-blue-600">
                    {xrpAddress.slice(0, 6)}...{xrpAddress.slice(-4)}
                  </p>
                </div>
                <Button
                  onClick={disconnect}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Drawer>
                  <DrawerTrigger
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={connectXUMM}
                    disabled={isLoading}
                  >
                    {isLoading ? "Connecting..." : "XAMAN"}
                  </DrawerTrigger>
                  <DrawerContent className="bg-white p-4">
                    <DrawerHeader className="flex flex-col items-center">
                      <DrawerTitle>Scan this QR code to sign in with Xaman!</DrawerTitle>
                    </DrawerHeader>
                    <DrawerDescription className="flex flex-col items-center">
                      {xummQrCode !== "" ? (
                        <Image
                          src={xummQrCode}
                          alt="Xaman QR code"
                          width={200}
                          height={200}
                          priority
                        />
                      ) : (
                        <div className="flex flex-col space-y-3">
                          <Skeleton className="h-[250px] w-[250px] rounded-xl bg-gray-300" />
                        </div>
                      )}
                      {xummJumpLink !== "" && (
                        <Button
                          className="mt-2 bg-blue-400 hover:bg-blue-500 w-48 h-12"
                          onClick={() => {
                            window.open(xummJumpLink, "_blank");
                          }}
                        >
                          Open in Xaman
                        </Button>
                      )}
                    </DrawerDescription>
                  </DrawerContent>
                </Drawer>

                <Button
                  onClick={connectGEM}
                  disabled={isLoading}
                  size="sm"
                  className="bg-blue-400 hover:bg-blue-500 text-white"
                >
                  GEM
                </Button>

                <Button
                  onClick={connectCrossmark}
                  disabled={isLoading}
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Crossmark
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}