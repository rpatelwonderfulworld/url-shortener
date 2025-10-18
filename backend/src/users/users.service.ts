import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findByUsername(username: string) {
    return this.repo.findOne({ where: { username } });
  }

  async create(username: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.repo.create({ username, passwordHash });
    return this.repo.save(user);
  }

  async validate(username: string, password: string) {
    const user = await this.findByUsername(username);
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.passwordHash);
    return ok ? user : null;
  }
}
