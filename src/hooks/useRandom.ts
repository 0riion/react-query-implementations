import { useQuery } from "@tanstack/react-query";

export default function useRandom() {

  const getRandomNumberFromApi = async (): Promise<number> => {
    const response = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new');
    const numberString = await response.text();

    if (Math.random() > 0.5) {
      throw new Error('Timeout randomQuery.isError, please reload!');
    }

    return parseInt(numberString);
  };

  const randomQuery = useQuery(
    ['randomNumber'],
    getRandomNumberFromApi,
  );

  return {
    randomQuery,
  };

};
