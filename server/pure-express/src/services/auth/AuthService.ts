import CreateUserDto from "../../models/User/user.dto";
import userModel from "../../models/User/user.model";

class AuthenticationService {
    public user = userModel;

    public async register(userData: CreateUserDto) {
        const isUserExist = await this.user.findOne({ email: userData.email })

        if (isUserExist) {
            // throw new UserWithThatEmailAlreadyExistsException(userData.email);
        } else {
            console.log('Register')
        }
    }
}

export default AuthenticationService;