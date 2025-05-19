import React from "react";
import { Bucket } from "../types";
import { formatCurrency } from "../utils/calculations";
import NeoBrutalBox from "./NeoBrutalBox";
import NeoBrutalButton from "./NeoBrutalButton";
import NeoBrutalInput from "./NeoBrutalInput";

interface BucketConfigurationProps {
  buckets: Bucket[];
  setBuckets: (buckets: Bucket[]) => void;
  totalCapital: number;
}

const BucketConfiguration: React.FC<BucketConfigurationProps> = ({
  buckets,
  setBuckets,
  totalCapital,
}) => {
  const handleBucketChange = (
    index: number,
    field: keyof Bucket,
    value: string | number
  ) => {
    const updatedBuckets = [...buckets];
    updatedBuckets[index] = { ...updatedBuckets[index], [field]: value };

    // No longer redistribute percentages among other buckets
    setBuckets(updatedBuckets);
  };

  const addBucket = () => {
    const newId = `bucket-${buckets.length + 1}`;
    const newBucket: Bucket = {
      id: newId,
      name: `Bucket ${buckets.length + 1}`,
      timeHorizon: 1,
      allocation: [],
      expectedYield: 0,
      percentage: 0,
    };
    setBuckets([...buckets, newBucket]);
  };

  const removeBucket = (index: number) => {
    if (buckets.length <= 1) return;
    const updatedBuckets = buckets.filter((_, i) => i !== index);
    setBuckets(updatedBuckets);
  };

  const totalPercentage = buckets.reduce(
    (sum, bucket) => sum + bucket.percentage,
    0
  );
  const isInvalid = Math.abs(totalPercentage - 100) > 0.01;

  return (
    <NeoBrutalBox title="Time Buckets Configuration" className="mb-6">
      <div className="space-y-6">
        <div className="bg-white border-3 border-black p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-brutal font-bold">Total Allocation</h3>
            <span
              className={`font-brutal font-bold ${
                isInvalid ? "text-error-500" : "text-success-500"
              }`}
            >
              {totalPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-neutral-200 border-3 border-black h-6">
            <div
              className={`h-full ${
                isInvalid ? "bg-error-500" : "bg-success-500"
              }`}
              style={{ width: `${Math.min(totalPercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {buckets.map((bucket, index) => (
          <div
            key={bucket.id}
            className="border-3 border-black p-4 bg-white relative"
          >
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
              <button
                onClick={() => removeBucket(index)}
                className="bg-error-500 text-white font-brutal w-8 h-8 flex items-center justify-center border-3 border-black shadow-brutal hover:bg-error-600"
                aria-label="Remove bucket"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <NeoBrutalInput
                  label="Bucket Name"
                  value={bucket.name}
                  onChange={(e) =>
                    handleBucketChange(index, "name", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <NeoBrutalInput
                  label="Time Horizon (years)"
                  value={bucket.timeHorizon}
                  onChange={(e) =>
                    handleBucketChange(
                      index,
                      "timeHorizon",
                      Number(e.target.value) || 0
                    )
                  }
                  type="number"
                  min={1}
                  max={30}
                  required
                />
              </div>
              <div>
                <NeoBrutalInput
                  label="Allocation (%)"
                  value={bucket.percentage}
                  onChange={(e) =>
                    handleBucketChange(
                      index,
                      "percentage",
                      Number(e.target.value) || 0
                    )
                  }
                  type="number"
                  min={0}
                  max={100}
                  required
                />
              </div>
            </div>

            <div className="mt-2 font-brutal">
              <span className="font-bold">Capital allocated: </span>
              {formatCurrency(totalCapital * (bucket.percentage / 100), "₪")}
            </div>
          </div>
        ))}

        <div className="mt-4">
          <NeoBrutalButton
            onClick={addBucket}
            variant="secondary"
            className="w-full"
          >
            + Add New Bucket
          </NeoBrutalButton>
        </div>

        <div className="mt-4 p-4 bg-neutral-100 border-l-6 border-secondary-500">
          <h3 className="font-brutal font-bold mb-2">Time Buckets Explained</h3>
          <p className="font-brutal text-sm">
            Time buckets are a strategy for organizing retirement savings based
            on when you'll need the money. Short-term buckets are for immediate
            needs (1-3 years), mid-term for intermediate needs (4-10 years), and
            long-term for distant needs (10+ years).
          </p>
        </div>
      </div>
    </NeoBrutalBox>
  );
};

export default BucketConfiguration;
