import { useCardStore } from '@/store/useCardStore';
import { useEffect } from 'react';

export default function Home() {
  const { pokemonCards, searchGames, setIsLoading, isLoading } = useCardStore();

  useEffect(() => {
    searchGames();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let offsetHeightFloat: number = document.documentElement.offsetHeight;
      let offsetHeightInteger: number = Math.round(offsetHeightFloat);
      let totalHeightFloat: number = window.innerHeight + document.documentElement.scrollTop;
      let totalHeightInteger: number = Math.round(totalHeightFloat);
      if (totalHeightInteger !== offsetHeightInteger || isLoading) {
        console.log('height', totalHeightInteger, offsetHeightInteger, isLoading);
        return;
      } else {
        console.log('searching');
        searchGames();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <div className="w-100 flex flex-col justify-center items-center	my-5">
      <div className="flex flex-wrap gap-10 justify-center items-center">
        {pokemonCards.map((item: any, index: number) => (
          <div
            key={index}
            className="bg-slate-100 border-gray-100 dark:border-gray-700 relative rounded-lg bg-white px-5 min-w-[50%] sm:min-w-[35%] md:min-w-[25%]"
          >
            <div className=" font-medium text-lg flex justify-end mb-5 relative top-6  ">
              <div className="dark:bg-[#262a33ff] px-2 py-1  z-50 bg-white rounded-2xl ">
                <span>HP</span>
                <span id="hp"></span>
              </div>
            </div>
            <div
              id="cDiv"
              className=" rounded-t-[1rem]  w-[100%] h-[40%]  top-0 left-0  absolute  bg-orange-200 rounded-b-[100%]"
            ></div>
            <div className="flex justify-center">
              <img className="size-[180px] sm:size-[210px] md:size-[220px] z-50 " alt="" src={item.images.large} />
            </div>

            <p className="font-bold text-center mt-3 text-[1.75rem]" id="name"></p>
            <div className="text-white gap-28 flex justify-center mt-3 mb-6 font-semibold text-lg">
              <div className="py-1 text-xl bg-white px-3 rounded-lg " id="spec1"></div>
              <div className="py-1 text-xl bg-white px-3 rounded-lg " id="spec2"></div>
            </div>
            <div className="px-2 mb-4 mt-3 flex justify-between font-medium text-[1.1rem] text-center ">
              <div>
                <p className="font-bold" id="attack"></p>
                <div className="text-slate-400">Attack</div>
              </div>
              <div>
                <p className="font-bold" id="defense"></p>
                <div className="text-slate-400">Defense</div>
              </div>
              <div>
                <p className="font-bold" id="speed"></p>
                <div className="text-slate-400">speed</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isLoading && <div className="w-100 text-lg text-center">Loading...</div>}
    </div>
  );
}
