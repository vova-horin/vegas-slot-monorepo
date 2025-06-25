import { ApiProperty } from "@nestjs/swagger";

export class CashoutResponseDto {
  @ApiProperty({
    description: "Session ID that was cashed out",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  sessionId: string;

  @ApiProperty({
    description: "Amount of credits cashed out from the session",
    example: 45,
  })
  cashedOutCredits: number;

  @ApiProperty({
    description: "Cashout timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  cashedOutAt: Date;
}
