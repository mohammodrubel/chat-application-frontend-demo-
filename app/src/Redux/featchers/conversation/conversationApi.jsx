import { baseApi } from "../../api/api";


const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getSingleConversation :builder.query({
            query:(id)=>({
                url:`/conversation/${id}`,
                method:'GET',
            })
        })
    })
})

export const {useGetSingleConversationQuery} = authApi