export class Login{
    username: string;
    mobile: string;
    password: string;

    constructor(username?: string, mobile?: string, password?: string) {
        this.username = username;
        this.mobile = mobile;
        this.password = password;
    }
}