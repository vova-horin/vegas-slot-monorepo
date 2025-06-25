import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Injectable()
export class DatabaseService {
  constructor(public readonly user: UserRepository) {}
}
