const ShimmerEffect = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="bg-gray-300 h-48 w-full rounded-md"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

export default ShimmerEffect;
