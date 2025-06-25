import { ApiProperty } from "@nestjs/swagger";

export class UserProfileDto {
  @ApiProperty({
    description: "Unique user identifier",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id: string;

  @ApiProperty({
    description: "Current game credits balance",
    example: 10,
  })
  gameCredits: number;

  @ApiProperty({
    description: "User creation timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  createdAt: Date;
}
