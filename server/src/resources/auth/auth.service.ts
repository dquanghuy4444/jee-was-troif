import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { ChangePasswordRequest, ForgetPassRequest, LoginRequest, RegisterRequest } from './dto/auth-req.dto';
import { LoginResponse } from './dto/auth-res.dto';
import { ERROR_MESSENGER_INVALID_PHONE_NUMBER, ERROR_MESSENGER_PASSWORD_SAME, Role } from 'constant';
import { UserService } from 'resources/user/user.service';

const SECRET_OR_PUBLIC_KEY = process.env["SECRET_OR_PUBLIC_KEY"] || "SECRET_OR_PUBLIC_KEY"

@Injectable()
export class AuthService {
    constructor(
        @Inject(UserService) private readonly userService: UserService) { }

    async register(registerRequest: RegisterRequest): Promise<LoginResponse> {

        const userResponse = await this.userService.create(registerRequest)

        const authToken = this.createToken(userResponse.id, userResponse.role);
        return new LoginResponse(authToken);
    }

    async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        const userResponse = await this.userService.getByAccount(loginRequest)

        const authToken = this.createToken(userResponse.id, userResponse.role);

        return new LoginResponse(authToken);
    }


    async changePassword(changePasswordRequest: ChangePasswordRequest): Promise<void> {
        const { phoneNumber, oldPassword, newPassword } = changePasswordRequest;

        if (oldPassword === newPassword) {
            throw new BadRequestException(ERROR_MESSENGER_PASSWORD_SAME)
        }

        await this.userService.changePassword(phoneNumber, newPassword, oldPassword)

    }

    async forgetPassword(request: ForgetPassRequest): Promise<void> {
        const { phoneNumber, password } = request;

        await this.userService.changePassword(phoneNumber, password)
    }

    async authenticate(id: string): Promise<void> {
        await this.userService.findById(id)

    }


    private createToken(userId: string, role: Role): string {
        return sign(
            {
                id: userId,
                role
            },
            SECRET_OR_PUBLIC_KEY
        );
    }
}
