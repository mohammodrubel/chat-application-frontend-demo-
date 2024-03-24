import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setUsers } from '../featchers/auth/authSlice';


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:9000/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('authorization', `${token}`);
        }
        return headers;
    }
});

const customBaseQuery =async (args,api,extraOptions)=>{ 
    let result = await baseQuery(args,api,extraOptions)

        if(result?.error?.status === 401){
            

            const res = await fetch(`http://localhost:9000/api/v1/auth/refresh-token`,{
                method:'POST',
                credentials:'include'
            })
            const data = await res.json()
            
            if(data?.data?.data.accessToken){
                const user = api.getState().auth.user 
                api.dispatch(setUsers({user,token:data?.data?.data.accessToken}))
                await baseQuery(args,api,extraOptions)
            }else{
                api.dispatch(logout())
            }
            
        }

    return result
}

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: customBaseQuery,
    endpoints: () => ({})
});