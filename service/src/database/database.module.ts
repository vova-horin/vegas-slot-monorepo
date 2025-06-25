import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { UserRepository } from "./user.repository";

@Module({
  providers: [DatabaseService, UserRepository],
  exports: [DatabaseService, UserRepository],
})
export class DatabaseModule {}
