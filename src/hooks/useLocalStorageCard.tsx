import { useEffect, useState } from "react";

interface CardInfo {
  id: string;
  name: string;
}

function useLocalStorageCard(
  cardId: string,
  cardInfo: CardInfo
): [boolean, () => void] {
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    const storedCard = localStorage.getItem(cardId);
    setIsSaved(!!storedCard);
  }, [cardId]);

  const saveCard = (): void => {
    localStorage.setItem(cardId, JSON.stringify(cardInfo));
    setIsSaved(true);
  };

  const removeCard = (): void => {
    localStorage.removeItem(cardId);
    setIsSaved(false);
  };

  const toggleCardInLocalStorage = (): void => {
    if (isSaved) {
      removeCard();
    } else {
      saveCard();
    }
  };

  return [isSaved, toggleCardInLocalStorage];
}

export default useLocalStorageCard;
