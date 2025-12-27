const TheaterSkeleton = () => (
  <div className="animate-pulse flex items-center gap-4 p-3 border-b border-gray-700 rounded-lg">
    <div className="w-10 h-10 bg-gray-700 rounded" />
    <div className="flex flex-col gap-2 flex-1">
      <div className="h-4 bg-gray-700 rounded w-3/4" />
      <div className="h-3 bg-gray-600 rounded w-full" />
    </div>
  </div>
);

const MovieSkeleton = () => (
  <div className="bg-gray-900 p-4 rounded-lg shadow-md animate-pulse">
    <div className="flex gap-4">
      <div className="w-20 h-28 bg-gray-700 rounded" />
      <div className="flex flex-col gap-3 flex-1">
        <div className="h-5 bg-gray-700 rounded w-2/3" />
        <div className="h-4 bg-gray-600 rounded w-1/2" />
      </div>
    </div>

    <div className="mt-4 flex gap-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-16 h-8 bg-gray-700 rounded" />
      ))}
    </div>
  </div>
);
const MovieCardSkeleton = () => {
  return (
    <div className="rounded-sm overflow-hidden shadow-lg bg-gray-900 animate-pulse">
      {/* Image */}
      <div className="w-full h-64 bg-gray-700" />

      {/* Date */}
      <div className="flex items-center gap-2 p-2">
        <div className="w-6 h-6 bg-gray-700 rounded" />
        <div className="h-4 bg-gray-700 rounded w-24" />
      </div>

      {/* Title */}
      <div className="p-2">
        <div className="h-5 bg-gray-700 rounded w-3/4" />
      </div>

      {/* Buttons */}
      <div className="p-2 flex flex-col gap-3">
        <div className="h-8 bg-gray-700 rounded" />
        <div className="h-8 bg-gray-600 rounded" />
      </div>
    </div>
  );
};

function SeatsSkeleton({ rows = 10, cols = 10 }) {
  const total = rows * cols;

  return (
    <div className="grid grid-cols-10 gap-3 mt-6 animate-pulse">
      {Array.from({ length: total }).map((_, index) => (
        <div key={index} className="h-10 bg-gray-600 rounded-md" />
      ))}
    </div>
  );
}
function MovieInfoSkeleton() {
  return (
    <div className="col-span-4 bg-gray-800 p-5 rounded-xl shadow-lg space-y-6 animate-pulse">
      {/* Image */}
      <div className="w-full h-72 bg-gray-700 rounded-lg" />

      {/* Title */}
      <div className="h-6 w-3/4 bg-gray-700 rounded" />

      {/* Info lines */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-700 rounded" />
        <div className="h-4 w-5/6 bg-gray-700 rounded" />
        <div className="h-4 w-4/6 bg-gray-700 rounded" />
        <div className="h-4 w-3/6 bg-gray-700 rounded" />
        <div className="h-4 w-2/6 bg-gray-700 rounded" />
      </div>

      {/* Total price */}
      <div className="bg-gray-900 p-4 rounded-lg">
        <div className="flex justify-between">
          <div className="h-5 w-32 bg-gray-700 rounded" />
          <div className="h-6 w-24 bg-gray-700 rounded" />
        </div>
      </div>

      {/* Button */}
      <div className="h-12 bg-gray-700 rounded-lg" />

      {/* Selected seats */}
      <div className="bg-gray-700 p-4 rounded-lg space-y-3">
        <div className="h-5 w-32 bg-gray-600 rounded" />
        <div className="h-4 w-full bg-gray-600 rounded" />
        <div className="h-4 w-5/6 bg-gray-600 rounded" />
      </div>
    </div>
  );
}

export {
  TheaterSkeleton,
  MovieSkeleton,
  MovieCardSkeleton,
  MovieInfoSkeleton,
  SeatsSkeleton,
};
