import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async register(username: string, password: string) {
    return this.users.create(username, password);
  }

  async login(username: string, password: string) {
    console.log('🟢 Login attempt:', username);
    const user = await this.users.validate(username, password);
    if (!user) {
      console.log('❌ Invalid credentials for:', username);
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.username };
    const token = this.jwt.sign(payload);
    console.log('✅ Token generated:', token);
    return { access_token: token };
  }
}
