import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { Request, Response } from 'express';
import { AppAuthGuard } from '../../common/guards/auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('')
  @UseGuards(AppAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get List of All Users' })
  @ApiResponse({ status: 200, description: 'User Found.' })
  @ApiResponse({ status: 404, description: 'No Users found.' })
  public async getAllUsers(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session,
  ) {
    const users: UserEntity[] = await this.usersService.findAll();
    return res.status(HttpStatus.OK).send(users);
  }

  @Post('sign_up')
  @ApiOperation({ summary: 'Create User' })
  public async create(@Body() createUser: CreateUserDto, @Res() res) {
    await this.usersService.createUser(createUser);
    return res.status(HttpStatus.CREATED).send();
  }

  @Post('sign_in')
  @UseGuards(AppAuthGuard)
  @ApiOperation({ summary: 'Authenticate' })
  @ApiBearerAuth()
  public async login(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session,
  ) {
    const ses = session;
    await this.usersService.authenticateUser(req.user);
    return res.status(HttpStatus.OK).send();
  }
}
