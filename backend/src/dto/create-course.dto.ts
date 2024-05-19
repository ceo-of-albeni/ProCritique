import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Introduction to Programming', description: 'The name of the course' })
  courseName: string;

  @ApiProperty({ example: 'This course covers the basics of programming...', description: 'Detailed description of the course' })
  detailedDescription: string;

  @ApiProperty({ example: 'Basic programming concepts.', description: 'Brief description of the course' })
  briefDescription: string;

  @ApiProperty({ example: 4.5, description: 'The rating of the course' })
  rating: number;

  @ApiProperty({ example: 'Programming', description: 'The category of the course' })
  category: string;

  @ApiProperty({ example: 100, description: 'The cost of the course' })
  cost: number;

  @ApiProperty({ example: ['Python', 'JavaScript'], description: 'The programming languages used in the course' })
  programmingLanguages: string[];

  @ApiProperty({ example: ['Django', 'React'], description: 'The frameworks used in the course' })
  frameworks: string[];
}
