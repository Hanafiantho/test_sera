import Axios from "axios"
import {BaseURL} from "../configs/BaseURL"
import {IRegist, ILogin} from "../models/RegisterModel"

export default class AuthService {
    static async regist(fields: IRegist) {
        try {
            const url = `${BaseURL}/auth/local/register`

            const res = await Axios.post(url, fields)

            return res
        } catch (error: any) {
            return error.response
        }
    }

    static async login(fields: ILogin) {
        try {
            const url = `${BaseURL}/auth/local`

            const res = await Axios.post(url, fields)

            return res
        } catch (error: any) {
            return error.response
        }
    }
}