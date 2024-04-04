import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
        ){}
    
    async validateUser(username:string, password: string):Promise<any>{
        const user = await this.userService.findByUsername(username)
        const isValidPassword = await this.userService.checkPassword(
            password,
            user.password,
        )

        if(user && isValidPassword) return user;

        return null;
    }

    async singIn(user:any){
        const payload = {
            username: user.username,
            sub: user._id

        }
        return {access_token: this.jwtService.sign(payload)}
    }

    async singUp(userDTO: UserDTO){
        return this.userService.create(userDTO)
    }
}   