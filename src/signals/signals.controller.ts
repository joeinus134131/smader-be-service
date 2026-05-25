import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { SignalsService } from './signals.service';
import { CreateSignalDto } from './dto/create-signal.dto';

@Controller('api/signals')
export class SignalsController {
  constructor(private readonly signalsService: SignalsService) {}

  @Post()
  create(@Body() createSignalDto: CreateSignalDto) {
    return this.signalsService.create(createSignalDto);
  }

  @Get()
  findAll() {
    return this.signalsService.findAll();
  }

  @Patch(':id/handle')
  handleSignal(@Param('id') id: string, @Body('handledBy') handledBy: string) {
    return this.signalsService.handleSignal(id, handledBy);
  }
}
