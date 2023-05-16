import { useEffect, useState } from 'react';

export default function CryptoRandom() {
  const [number, setNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getRandomNumberFromApi = async (): Promise<number> => {
    const response = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new');
    const numberString = await response.text();

    if (Math.random() > 0.5) {
      throw new Error('Timeout error, please reload!');
    }

    return parseInt(numberString);
  };
 
  useEffect(() => {
    setLoading(true);
    getRandomNumberFromApi()
      .then((num) => {
        setNumber(num);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setNumber(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  const handleReload = () => {
    if (!loading) {
      setNumber(null);
      setError(null);
      setLoading(true);
      getRandomNumberFromApi()
        .then((num) => {
          setNumber(num);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <>
      {loading && <h3>Loading...</h3>}
      
      {
        (number !== null)
          && (!loading)
          && (!error)
          && <h3>Hash number is: {number}</h3>}
      
      {
        (error)
          && (!loading)
          && <h3>{error}</h3>}
      
      <button
        onClick={handleReload}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Reload'}
      </button>
    </>
  );
}
