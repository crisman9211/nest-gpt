import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto } from './dtos/orthography.dto';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthograpy-check')
  orthographyCheck(
    @Body() orthographyDto: OrthographyDto
  ) {
    // return this.gptService.orthographyCheck();
    return orthographyDto;
  }
}
