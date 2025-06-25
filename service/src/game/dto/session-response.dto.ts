import { ApiProperty } from "@nestjs/swagger";

export class SessionResponseDto {
  @ApiProperty({
    description: "Session ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  sessionId: string;

  @ApiProperty({
    description: "Current credits in the session",
    example: 10,
  })
  credits: number;

  @ApiProperty({
    description: "Whether the session is active",
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: "Session creation timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  createdAt: Date;
}
