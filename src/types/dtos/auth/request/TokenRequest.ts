import { UserType } from "../Token";

export type TokenRequest = {
    storeId: string;
    token: string;
    userType: UserType;
}