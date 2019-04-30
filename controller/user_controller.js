let userData = require('./users.json');

class User {
    constructor(user_id) {
        this.userId = user_id;
    }

    getUserDetails() {
        let user = JSON.parse(JSON.stringify(userData.filter((data => {
            return data.user_id === this.userId
        }))))[0];
        delete user.password
        return user;
    }

    verifyUser(username, password) {
        try {
            let user = JSON.parse(JSON.stringify(userData.filter((data => {
                return data.username === username && data.password === password
            }))))[0];
            if (user) {
                delete user.password;
                return user
            }
            throw new Error("User Not Found");
        } catch (error) {
            throw Error(error);
        }
    }
}

module.exports = User;
