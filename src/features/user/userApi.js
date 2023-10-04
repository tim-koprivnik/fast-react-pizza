import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAddress } from '../../services/apiGeocoding';

const getPosition = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const userApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    fetchAddress: builder.query({
      query: async () => {
        // 1) We get the user's geolocation position
        const positionObj = await getPosition();
        const position = {
          latitude: positionObj.coords.latitude,
          longitude: positionObj.coords.longitude,
        };

        // 2) We use a reverse geocoding API to get a description of the user's address
        // const response = await fetch(
        //   `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.latitude}&longitude=${position.longitude}`
        // );
        // const response = await getAddress(position);
        // const addressObj = await response.json();
        const addressObj = await getAddress(position);
        const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

        // 3) We return an object with the data that we are interested in
        return { position, address };
      },
    }),
  }),
});

export const { useFetchAddressQuery } = userApi;
export default userApi;
