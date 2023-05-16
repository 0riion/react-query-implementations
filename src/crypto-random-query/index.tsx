import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import useRandom from '../hooks/useRandom';

function CryptoRandomQuery() {

  const { randomQuery } = useRandom();

  return (
    <>
      {randomQuery.isFetching && <h3>Loading...</h3>}

      {
        (randomQuery.data !== null)
        && (!randomQuery.isFetching)
        && (!randomQuery.isError)
        && <h3>Hash number is: {randomQuery.data}</h3>}

      {
        (randomQuery.isError)
        && (!randomQuery.isLoading)
        && (<h3>{`${randomQuery.error}`}</h3>)
      }

      <button
        onClick={() => randomQuery.refetch()}
        disabled={randomQuery.isFetching}
      >
        {randomQuery.isFetching ? 'Loading...' : 'Reload'}
      </button>

    </>
  );
};


const queryClient = new QueryClient()

function WithQueryClient(Component: React.ComponentType) {
  return function WithQueryClientComponent(props: any) {
    return (
      <QueryClientProvider client={queryClient}>
        <Component {...props} />
      </QueryClientProvider>
    )
  }
}

const CryptoRandomQueryWithQueryClient = WithQueryClient(CryptoRandomQuery)
export default CryptoRandomQueryWithQueryClient;
