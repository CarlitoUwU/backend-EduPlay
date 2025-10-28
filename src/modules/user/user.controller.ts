import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user account with the provided information',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'User data for creation',
  })
  @ApiCreatedResponse({
    description: 'User has been successfully created',
    type: UserDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data or validation errors',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieves a list of all registered users',
  })
  @ApiOkResponse({
    description: 'List of users retrieved successfully',
    type: [UserDto],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieves a specific user by their unique identifier',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user',
    example: 'clm123abc456def789',
    type: String,
  })
  @ApiOkResponse({
    description: 'User found and retrieved successfully',
    type: UserDto,
  })
  @ApiNotFoundResponse({
    description: 'User with the specified ID was not found',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update user',
    description: 'Updates an existing user with the provided information',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user to update',
    example: 'clm123abc456def789',
    type: String,
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'User data for update (partial)',
  })
  @ApiOkResponse({
    description: 'User has been successfully updated',
    type: UserDto,
  })
  @ApiNotFoundResponse({
    description: 'User with the specified ID was not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data or validation errors',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Removes a user from the system permanently',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user to delete',
    example: 'clm123abc456def789',
    type: String,
  })
  @ApiOkResponse({
    description: 'User has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'User with the specified ID was not found',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
