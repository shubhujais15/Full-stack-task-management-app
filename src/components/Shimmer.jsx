const Shimmer = () => {
  const shimmerCards = Array(15).fill(0); // Create an array with 15 placeholders

  return (
    <div className="w-screen bg-slate-400 m-0.5 rounded-xl">
      <div className="mt-2.5">
        <div className="flex justify-center m-1.5 p-3">
          <input
            type="text"
            className="mt-3 h-10 w-96 rounded-full text-base indent-3.5 outline-none"
          />
          <button className="bg-yellow-100 hover:bg-yellow-200 mx-3 mt-3 h-10 w-28 md:h-9 md:w-20 rounded-full hover:scale-105 active:scale-95 focus:outline-none">
            Search
          </button>
          <button className="hidden md:inline-block bg-yellow-100 mt-3 mx-3 h-9 w-48 rounded-full">
            Top Rated Restaurant
          </button>
        </div>
        <div className="flex flex-wrap my-4 md:my-6 md:ml-12">
          {shimmerCards.map((_, index) => (
            <div
              key={index}
              className="md:mx-8 mx-4 my-6 p-2 h-[280px] md:h-[305px] w-[172px] md:w-[220px] rounded-lg bg-slate-200 hover:bg-slate-300 flex items-center justify-center"
            >
              <h3 className="text-center">Loading...</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
