import { ApiProperty } from "@nestjs/swagger";
import { RollSymbol } from "../../database/entities/game-roll.entity";

export class RollResponseDto {
  @ApiProperty({
    description: "Roll ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  rollId: string;

  @ApiProperty({
    description: "Array of 3 symbols from the roll",
    example: ["CHERRY", "CHERRY", "CHERRY"],
    enum: RollSymbol,
    isArray: true,
  })
  symbols: RollSymbol[];

  @ApiProperty({
    description: "Whether this roll was a win",
    example: true,
  })
  isWin: boolean;

  @ApiProperty({
    description: "Reward amount for this roll",
    example: 10,
  })
  reward: number;

  @ApiProperty({
    description: "Credits before the roll",
    example: 10,
  })
  creditsBefore: number;

  @ApiProperty({
    description: "Credits after the roll",
    example: 19,
  })
  creditsAfter: number;

  @ApiProperty({
    description: "Roll timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  createdAt: Date;
}
