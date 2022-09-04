import Axios from "axios"
import {BaseURL} from "../configs/BaseURL"

export default class ArticleService {
    static async getListArticle(params?:any) {
        try {
            const url = `${BaseURL}/articles`

            const res = await Axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                },
                params
            })

            return res
        } catch (error: any) {
            return error.response
        }
    }

    static async createArticle(fields:{data:{title:string, content:string}}) {
        try {
            const url = `${BaseURL}/articles`

            const res = await Axios.post(url, fields, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                },
            })

            return res
        } catch (error: any) {
            return error.response
        }
    }

    static async updateArticle(id:number, fields:{data:{title:string, content:string}}) {
        try {
            const url = `${BaseURL}/articles/${id}`

            const res = await Axios.put(url, fields, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                },
            })

            return res
        } catch (error: any) {
            return error.response
        }
    }

    static async deleteArticle(id:number) {
        try {
            const url = `${BaseURL}/articles/${id}`

            const res = await Axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                },
            })

            return res
        } catch (error: any) {
            return error.response
        }
    }
}