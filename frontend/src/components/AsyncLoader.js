const AsyncLoader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className="inline-block size-20 bg-gray-500 rounded-full animate-grow-fade"
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Hang tight! We’re loading your clips...</span>
      </div>
    </div>
  );
};

export default AsyncLoader;
