import { act, renderHook } from "@testing-library/react-hooks";
import "../__mocks__/localStorageMock";
import useLocalStorageCard from "../useLocalStorageCard";

describe("useLocalStorageCard", () => {
  const cardId = "123";
  const cardInfo = {
    id: cardId,
    name: "Test Card",
    description: "This is a test card.",
  };

  afterEach(() => {
    localStorage.clear();
  });

  it("should indicate that the card is not saved initially", () => {
    const { result } = renderHook(() => useLocalStorageCard(cardId, cardInfo));
    expect(result.current[0]).toBe(false);
  });

  it("should save the card to localStorage when saved", () => {
    const { result } = renderHook(() => useLocalStorageCard(cardId, cardInfo));
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);
    expect(localStorage.getItem(cardId)).toEqual(JSON.stringify(cardInfo));
  });

  it("should remove the card from localStorage when it is already saved", () => {
    localStorage.setItem(cardId, JSON.stringify(cardInfo));
    const { result } = renderHook(() => useLocalStorageCard(cardId, cardInfo));

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(false);
    expect(localStorage.getItem(cardId)).toBeNull();
  });
});
