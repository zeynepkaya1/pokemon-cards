import { useCardStore } from "@/store/useCardStore";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { pokemonCards, searchGames, setIsLoading, isLoading } = useCardStore();

  useEffect(() => {
    searchGames();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let offsetHeightFloat: number = document.documentElement.offsetHeight;
      let offsetHeightInteger: number = Math.round(offsetHeightFloat);
      let totalHeightFloat: number =
        window.innerHeight + document.documentElement.scrollTop;
      let totalHeightInteger: number = Math.round(totalHeightFloat);
      if (totalHeightInteger !== offsetHeightInteger || isLoading) {
        return;
      } else {
        searchGames();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div className="w-100 flex flex-col justify-center items-center	my-5">
      <div className="flex flex-wrap gap-10 justify-center items-center">
        {pokemonCards.map((item: any, index: number) => (
          <Link
            key={index}
            href={`/cards/${item.id}`}
            className="min-w-[88%] sm:min-w-[63%] md:min-w-[27%] h-[32rem] bg-slate-100 border-gray-100 dark:border-gray-700 relative rounded-lg px-5"
          >
            <div className="mb-10">
              <div className=" font-medium text-lg flex justify-end mb-10 relative top-6  ">
                <div className="px-2 py-1 z-50 bg-white rounded-2xl ">
                  <span>{item.hp} HP</span>
                  <span id="hp"></span>
                </div>
              </div>
              <div
                id="cDiv"
                className=" rounded-t-[1rem]  w-[100%] h-[40%]  top-0 left-0  absolute  bg-orange-200 rounded-b-[100%]"
              ></div>
              <div className="flex justify-center w-100">
                <img className="w-100 z-40" alt="" src={item.images.small} />
              </div>

              <p
                className="font-bold text-center mt-3 text-[1.75rem]"
                id="name"
              >
                {item.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {isLoading && (
        <div className="w-100 text-lg text-center mt-5">Loading...</div>
      )}
    </div>
  );
}
