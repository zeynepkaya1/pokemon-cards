import api from "@/api";
import useLocalStorageCard from "@/hooks/useLocalStorageCard";
import { GetServerSidePropsContext } from "next";

interface Attack {
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: number;
}

interface Weakness {
  type: string;
  value: string;
}

interface CardInfo {
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  id: string;
  types: string[];
  evolvesTo: string[];
  attacks: Attack[];
  weaknesses: Weakness[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: {
    name: string;
    series: string;
    printedTotal: number;
    total: number;
  };
  images: {
    large: string;
  };
  flavorText: string;
}

interface PokemonCardProps {
  cardInfo: CardInfo;
  error?: string;
}

const Card = ({ cardInfo, error }: PokemonCardProps) => {
  const [isSaved, toggleCardInLocalStorage] = useLocalStorageCard(
    cardInfo.id,
    cardInfo
  );
  console.log("cardInfo", cardInfo);
  return (
    <div className="w-100 flex flex-col justify-center items-center m-10 p-10">
      <button
        className={
          isSaved
            ? "bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
            : "bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        }
        onClick={toggleCardInLocalStorage}
      >
        {isSaved ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <div>
        <div className="flex w-full mx-auto mt-10 rounded-2xl  shadow-lg bg-white">
          <div className="flex items-center w-1/2">
            <img
              src={cardInfo.images.large}
              alt={cardInfo.name}
              className="w-full object-cover"
            />
          </div>
          <div className="w-100 flex">
            <div className="px-6 py-4 bg-slate-100 rounded-2xl w-1/2">
              <div className="font-bold text-3xl mb-2">{cardInfo.name}</div>
              <p className="text-gray-700 text-md">
                Supertype: {cardInfo.supertype} - {cardInfo.subtypes.join(", ")}
              </p>
              <p className="text-gray-700 text-md">
                HP: {cardInfo.hp} | Type: {cardInfo.types.join(", ")}
              </p>
              <div className="mt-20">
                {cardInfo.evolvesTo && cardInfo.evolvesTo.length > 0 && (
                  <p className="text-gray-700 text-md">
                    Evolves to: {cardInfo.evolvesTo.join(", ")}
                  </p>
                )}
                {cardInfo.attacks.map((attack, index) => (
                  <div key={index} className="mt-2">
                    <p className="text-gray-800 font-semibold">{attack.name}</p>
                    <p className="text-gray-600">
                      {attack.text} (Damage: {attack.damage || "None"})
                    </p>
                  </div>
                ))}
                <p className="text-red-500 text-md">
                  Weaknesses:{" "}
                  {cardInfo.weaknesses
                    .map((w) => `${w.type} ${w.value}`)
                    .join(", ")}
                </p>
                <p className="text-gray-700 text-md">
                  Retreat Cost:{" "}
                  {cardInfo.retreatCost && cardInfo.retreatCost.join(", ")}{" "}
                  (Converted: {cardInfo.convertedRetreatCost})
                </p>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-300  rounded-2xl  w-1/2 ">
              <p className="text-lg italic">{cardInfo.flavorText}</p>
              <p className="text-lg">
                Set: {cardInfo.set.name} - {cardInfo.set.series} (
                {cardInfo.set.printedTotal}/{cardInfo.set.total})
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as { id: string };

  try {
    const response = await api.getCard(id);
    return {
      props: { cardInfo: response.data.data },
    };
  } catch (error) {
    console.error("Failed to fetch card info:", error);
    return {
      props: { error: "Failed to load the card information." },
    };
  }
}
