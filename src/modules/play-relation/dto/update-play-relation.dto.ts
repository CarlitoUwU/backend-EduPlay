import { PartialType } from '@nestjs/swagger';
import { CreatePlayRelationDto } from './create-play-relation.dto';

export class UpdatePlayRelationDto extends PartialType(CreatePlayRelationDto) {}
