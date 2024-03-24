import { baseApi } from "../../api/api";


const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(userinfo)=>({
                url:'/auth/login',
                method:'POST',
                body:userinfo
            })
        }),
        register:builder.mutation({
            query:(data)=>({
                url:'/auth/create-user',
                method:'POST',
                body:data
            })
        }),
        getAllUsers:builder.query({
            query:(data)=>({
                url:'/auth/user',
                method:'GET'
            })
        }),
        getSingleUsers:builder.query({
            query:(id)=>({
                url:`/auth/user/${id}`,
                method:'GET'
            })
        })
    })
})

export const {useLoginMutation,useRegisterMutation,useGetAllUsersQuery,useGetSingleUsersQuery} = authApi