import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-lg border p-0">
      <div className="relative">
        <Skeleton className="w-full h-44 bg-green-900/20" /> {/* Image placeholder */}
      </div>
      <div className="p-3 space-y-3">
        <Skeleton className="h-4 w-3/4 bg-green-900/10" /> {/* Product name */}
        <div>
          <Skeleton className="h-2 w-full bg-green-900/10" /> {/* Progress bar */}
          <Skeleton className="h-3 w-1/2 mt-1 bg-green-900/10" /> {/* Portions left */}
        </div>
        <div className="flex justify-between items-center pt-1">
          <Skeleton className="h-5 w-16 bg-green-900/10" /> {/* Price */}
          <Skeleton className="h-8 w-8 rounded-md bg-green-900/10" /> {/* Cart button */}
        </div>
      </div>
    </Card>
  )
}
