export class User{
    mobile: string;
    username: string;
    password: string;
    email: string;
    // secPwd: string;      // 用于验证，数据库中没有该字段

    constructor(mobile?: string, username?: string,
                password?: string, email?: string) {
        this.mobile = mobile;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}