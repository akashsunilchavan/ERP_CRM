export interface AuthModel {
    accessToken: string;
    // refreshToken?: string;
    // userId: string;
}
export interface UserModel {
    role: string;
    token: string;
    user: {
        user_id: string;
        first_name: string;
        last_name: string;
        email: string;
        is_newUser: boolean;
    };
}
