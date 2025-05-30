import { PlusIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Asset, Bucket, CustomAsset, TimeFrame } from "../types";
import { calculateBucketYield, formatPercentage } from "../utils/calculations";
import NeoBrutalBox from "./NeoBrutalBox";
import NeoBrutalButton from "./NeoBrutalButton";
import NeoBrutalInput from "./NeoBrutalInput";

interface AssetAllocationProps {
  buckets: Bucket[];
  setBuckets: (buckets: Bucket[]) => void;
  assets: Asset[];
  selectedTimeFrame: TimeFrame;
}

const AssetAllocation: React.FC<AssetAllocationProps> = ({
  buckets,
  setBuckets,
  assets,
  selectedTimeFrame,
}) => {
  const [activeBucketIndex, setActiveBucketIndex] = useState(0);
  const [showAssetSelector, setShowAssetSelector] = useState(false);
  const [showCustomAssetForm, setShowCustomAssetForm] = useState(false);
  const [customAsset, setCustomAsset] = useState<CustomAsset>({
    name: "",
    historicalReturn: 0,
  });

  // Ensure activeBucketIndex is valid when buckets change
  useEffect(() => {
    if (activeBucketIndex >= buckets.length && buckets.length > 0) {
      setActiveBucketIndex(buckets.length - 1);
    }
  }, [buckets, activeBucketIndex]);

  // Recalculate yields when timeframe changes
  useEffect(() => {
    if (buckets.length > 0) {
      const updatedBuckets = buckets.map((bucket) => ({
        ...bucket,
        expectedYield: calculateBucketYield(bucket, selectedTimeFrame),
      }));
      setBuckets(updatedBuckets);
    }
  }, [selectedTimeFrame, assets, buckets, setBuckets]);

  const activeBucket = buckets[activeBucketIndex] || buckets[0];

  const handleAssetAllocationChange = (
    assetId: string,
    newPercentage: number
  ) => {
    if (!activeBucket) return;

    const updatedBuckets = [...buckets];
    const currentBucket = { ...updatedBuckets[activeBucketIndex] };

    // Ensure the allocation array exists
    if (!currentBucket.allocation) {
      currentBucket.allocation = [];
    }

    const existingAllocationIndex = currentBucket.allocation.findIndex(
      (alloc) => alloc.assetId === assetId
    );

    if (existingAllocationIndex >= 0) {
      const updatedAllocation = [...currentBucket.allocation];

      if (newPercentage === 0) {
        updatedAllocation.splice(existingAllocationIndex, 1);
      } else {
        updatedAllocation[existingAllocationIndex] = {
          ...updatedAllocation[existingAllocationIndex],
          percentage: newPercentage,
        };
      }

      currentBucket.allocation = updatedAllocation;
    } else if (newPercentage > 0) {
      currentBucket.allocation.push({
        assetId,
        percentage: newPercentage,
      });
    }

    currentBucket.expectedYield = calculateBucketYield(
      currentBucket,
      selectedTimeFrame
    );

    updatedBuckets[activeBucketIndex] = currentBucket;
    setBuckets(updatedBuckets);
  };

  const handleAddCustomAsset = () => {
    if (!customAsset.name || customAsset.historicalReturn === 0) return;

    const customAssetId = `custom-${Date.now()}`;
    const newAsset: Asset = {
      id: customAssetId,
      name: customAsset.name,
      type: "custom",
      description: "Custom asset",
      historicalReturn: {
        oneYear: customAsset.historicalReturn / 100,
        fiveYear: customAsset.historicalReturn / 100,
        tenYear: customAsset.historicalReturn / 100,
        twentyYear: customAsset.historicalReturn / 100,
        thirtyYear: customAsset.historicalReturn / 100,
      },
    };

    assets.push(newAsset);
    // Start with a default allocation of 10% for new custom assets
    handleAssetAllocationChange(customAssetId, 10);
    setCustomAsset({ name: "", historicalReturn: 0 });
    setShowCustomAssetForm(false);
  };

  const handleAddAsset = (asset: Asset) => {
    // Start with a default allocation of 10% when adding a new asset
    handleAssetAllocationChange(asset.id, 10);
    setShowAssetSelector(false);
  };

  const getTotalAllocation = () => {
    if (!activeBucket || !activeBucket.allocation) {
      return 0;
    }
    return activeBucket.allocation.reduce(
      (sum, alloc) => sum + alloc.percentage,
      0
    );
  };

  const totalAllocation = getTotalAllocation();
  const isOverallocated = totalAllocation > 100;
  const isUnderallocated = totalAllocation < 100;

  const getAssetAllocation = (assetId: string) => {
    if (!activeBucket || !activeBucket.allocation) {
      return 0;
    }
    const allocation = activeBucket.allocation.find(
      (alloc) => alloc.assetId === assetId
    );
    return allocation ? allocation.percentage : 0;
  };

  const getAssetById = (assetId: string) => {
    return assets.find((asset) => asset.id === assetId);
  };

  // Get assets that are already allocated to the active bucket
  const allocatedAssets = (activeBucket?.allocation || [])
    .map((alloc) => {
      const asset = getAssetById(alloc.assetId);
      return asset ? { ...asset, allocation: alloc.percentage } : null;
    })
    .filter(Boolean) as (Asset & { allocation: number })[];

  // Get assets available to add (not already allocated)
  const availableAssets = assets.filter(
    (asset) =>
      !activeBucket?.allocation?.some((alloc) => alloc.assetId === asset.id)
  );

  // Group available assets by type
  const groupedAvailableAssets = {
    international: availableAssets.filter(
      (asset) => asset.type === "international"
    ),
    israeli: availableAssets.filter((asset) => asset.type === "israeli"),
    custom: availableAssets.filter((asset) => asset.type === "custom"),
  };

  return (
    <NeoBrutalBox title="Asset Allocation" className="mb-6">
      <div className="flex overflow-x-auto mb-4 pb-2 -mx-2 px-2">
        {buckets.map((bucket, index) => (
          <button
            key={bucket.id}
            onClick={() => setActiveBucketIndex(index)}
            className={`
              font-brutal font-bold px-4 py-2 mr-2 whitespace-nowrap
              border-3 border-black 
              ${
                index === activeBucketIndex
                  ? "bg-secondary-500 text-white shadow-none translate-x-1 translate-y-1"
                  : "bg-white shadow-brutal"
              }
            `}
          >
            {bucket.name}
          </button>
        ))}
      </div>

      <div className="bg-white border-3 border-black p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-brutal font-bold">
            Allocation for {activeBucket?.name}
          </h3>
          <div className="text-sm font-mono font-bold">
            Time Horizon:{" "}
            <span className="bg-neutral-900 text-white px-2">
              {activeBucket?.timeHorizon} years
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="font-brutal font-bold">Total Allocation</span>
            <span
              className={`font-brutal font-bold ${
                isOverallocated
                  ? "text-error-500"
                  : isUnderallocated
                  ? "text-warning-500"
                  : "text-success-500"
              }`}
            >
              {totalAllocation}%
            </span>
          </div>
          <div className="w-full bg-neutral-200 border-3 border-black h-6">
            <div
              className={`h-full ${
                isOverallocated
                  ? "bg-error-500"
                  : isUnderallocated
                  ? "bg-warning-500"
                  : "bg-success-500"
              }`}
              style={{ width: `${Math.min(totalAllocation, 100)}%` }}
            ></div>
          </div>

          {isOverallocated && (
            <p className="text-error-500 font-brutal mt-1 text-sm">
              Your total allocation exceeds 100%. Please reduce some
              allocations.
            </p>
          )}

          {isUnderallocated && (
            <p className="text-warning-500 font-brutal mt-1 text-sm">
              Your total allocation is less than 100%. You have{" "}
              {100 - totalAllocation}% unallocated.
            </p>
          )}
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-brutal font-bold">Assets</h3>
            <div className="flex space-x-2">
              <NeoBrutalButton
                onClick={() => setShowAssetSelector(true)}
                variant="primary"
                size="sm"
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                Add Asset
              </NeoBrutalButton>
              <NeoBrutalButton
                onClick={() => setShowCustomAssetForm(true)}
                variant="secondary"
                size="sm"
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                Add Custom Asset
              </NeoBrutalButton>
            </div>
          </div>

          {/* Asset Selector Modal */}
          {showAssetSelector && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white border-3 border-black p-4 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-brutal font-bold">Select an Asset</h3>
                  <button
                    onClick={() => setShowAssetSelector(false)}
                    className="p-1"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {Object.keys(groupedAvailableAssets).map((assetType) => {
                  const assets =
                    groupedAvailableAssets[
                      assetType as keyof typeof groupedAvailableAssets
                    ];
                  if (assets.length === 0) return null;

                  return (
                    <div key={assetType} className="mb-4">
                      <h4 className="font-brutal font-bold capitalize mb-2">
                        {assetType} Assets
                      </h4>
                      <div className="space-y-2">
                        {assets.map((asset) => (
                          <button
                            key={asset.id}
                            onClick={() => handleAddAsset(asset)}
                            className="w-full text-left p-3 border-2 border-black hover:bg-neutral-100 flex justify-between items-center"
                          >
                            <div>
                              <div className="font-brutal font-bold">
                                {asset.name}
                              </div>
                              <div className="text-xs text-neutral-600">
                                {asset.description}
                              </div>
                            </div>
                            <div className="font-mono font-bold">
                              {formatPercentage(
                                asset.historicalReturn[selectedTimeFrame] * 100
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {Object.values(groupedAvailableAssets).every(
                  (assets) => assets.length === 0
                ) && (
                  <p className="text-center py-4 text-neutral-600">
                    No assets available to add. All assets have been allocated.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Custom Asset Form */}
          {showCustomAssetForm && (
            <div className="border-3 border-black p-4 mb-4 bg-neutral-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NeoBrutalInput
                  label="Asset Name"
                  value={customAsset.name}
                  onChange={(e) =>
                    setCustomAsset({ ...customAsset, name: e.target.value })
                  }
                  required
                />
                <NeoBrutalInput
                  label="Historical Return (%)"
                  value={customAsset.historicalReturn}
                  onChange={(e) =>
                    setCustomAsset({
                      ...customAsset,
                      historicalReturn: Number(e.target.value) || 0,
                    })
                  }
                  type="number"
                  min={0}
                  max={100}
                  step={0.1}
                  required
                />
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <NeoBrutalButton
                  onClick={() => setShowCustomAssetForm(false)}
                  variant="error"
                  size="sm"
                >
                  Cancel
                </NeoBrutalButton>
                <NeoBrutalButton
                  onClick={handleAddCustomAsset}
                  variant="success"
                  size="sm"
                >
                  Add Asset
                </NeoBrutalButton>
              </div>
            </div>
          )}

          {/* Allocated Assets List */}
          {allocatedAssets.length > 0 ? (
            <div className="space-y-3">
              {allocatedAssets.map((asset) => (
                <AssetAllocationItem
                  key={asset.id}
                  asset={asset}
                  allocation={getAssetAllocation(asset.id)}
                  onAllocationChange={handleAssetAllocationChange}
                  timeFrame={selectedTimeFrame}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 border-3 border-dashed border-neutral-300">
              <p className="text-neutral-600 font-brutal">
                No assets allocated yet. Click "Add Asset" to get started.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-accent-100 border-l-6 border-accent-500">
        <h3 className="font-brutal font-bold mb-2">Expected Return</h3>
        <p className="font-brutal">
          Based on{" "}
          {selectedTimeFrame === "oneYear"
            ? "1"
            : selectedTimeFrame === "fiveYear"
            ? "5"
            : selectedTimeFrame === "tenYear"
            ? "10"
            : selectedTimeFrame === "twentyYear"
            ? "20"
            : "30"}{" "}
          year historical performance, this bucket has an expected annual return
          of{" "}
          <span className="font-bold">
            {formatPercentage(activeBucket?.expectedYield || 0)}
          </span>
          .
        </p>
      </div>
    </NeoBrutalBox>
  );
};

interface AssetAllocationItemProps {
  asset: Asset;
  allocation: number;
  onAllocationChange: (assetId: string, percentage: number) => void;
  timeFrame: TimeFrame;
}

const AssetAllocationItem: React.FC<AssetAllocationItemProps> = ({
  asset,
  allocation,
  onAllocationChange,
  timeFrame,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value) || 0));
    onAllocationChange(asset.id, value);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center border-3 border-black p-3 bg-white">
      <div className="flex-1 mb-2 sm:mb-0">
        <div className="font-brutal font-bold">{asset.name}</div>
        <div className="text-xs text-neutral-600 max-w-xs">
          {asset.description}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center">
        <div className="text-center sm:mr-4 mb-2 sm:mb-0">
          <div className="text-xs text-neutral-600">Historical Return</div>
          <div className="font-mono font-bold">
            {formatPercentage(asset.historicalReturn[timeFrame] * 100)}
          </div>
        </div>
        <div className="w-full sm:w-32 flex items-center">
          <input
            type="number"
            min="0"
            max="100"
            value={allocation}
            onChange={handleInputChange}
            className="
              w-full px-2 py-1 text-center
              font-mono font-bold text-lg
              border-3 border-black 
              focus:outline-none focus:ring-0 
              focus:border-primary-500 
            "
          />
          <span className="ml-1 font-brutal">%</span>
        </div>
        <div className="flex justify-end space-x-1 mt-2 sm:mt-0 sm:ml-2">
          {[0, 25, 50, 75, 100].map((value) => (
            <button
              key={value}
              onClick={() => onAllocationChange(asset.id, value)}
              className={`
                px-2 py-1 text-xs font-brutal font-bold
                border-2 border-black
                ${
                  allocation === value
                    ? "bg-neutral-900 text-white"
                    : "bg-white"
                }
              `}
            >
              {value}%
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetAllocation;
