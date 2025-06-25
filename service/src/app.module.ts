import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { HealthModule } from "./health/health.module";
import { GameModule } from "./game/game.module";
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: [".env.local", ".env"],
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    HealthModule,
    GameModule,
  ],
})
export class AppModule {}
