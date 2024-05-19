import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'sanzhar', description: 'The username of the commenter' })
  username: string;

  @ApiProperty({ example: 'Great course! Learned a lot.', description: 'The review content' })
  review: string;

  @ApiProperty({ example: 5, description: 'The rating given by the commenter' })
  rating: number;
}
