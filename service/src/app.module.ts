import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, HealthModule],
})
export class AppModule {}
