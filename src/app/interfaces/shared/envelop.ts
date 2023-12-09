import { User } from "../administration/user";

export interface Envelop<T> {
    success:boolean,
    message:"message",
    data:T,
}
