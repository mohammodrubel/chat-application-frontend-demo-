import { baseApi } from "../../api/api";


const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getMessage :builder.query({
            query:(id)=>({
                url:`/message/${id}`,
                method:'GET',
            }),
            providesTags:['message']
        }),
        sendingMessage :builder.mutation({
            query:(information)=>({
                url:`/message/create-message`,
                method:'POST',
                body:information
            }),
            invalidatesTags:['message']
        }),
    })
})

export const {useGetMessageQuery,useSendingMessageMutation} = authApi