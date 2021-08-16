import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TokenService } from './services/token.service';
import { ITokenResponse } from './interfaces/token-response.interface';
import { ITokenDataResponse } from './interfaces/token-data-response.interface';
import { ITokenDestroyResponse } from './interfaces/token-destroy-response.interface';
import { IKafkaMessage } from './interfaces/kafka-message.interface';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @MessagePattern('token_create')
  public async createToken(@Payload() data: IKafkaMessage<{ userId: string }> ): Promise<ITokenResponse> {
    let result: ITokenResponse;
    if (data.value && data.value.userId) {
      try {
        const createResult = await this.tokenService.createToken(data.value.userId);
        result = {
          status: HttpStatus.CREATED,
          message: 'token_create_success',
          token: createResult.token,
        };
      } catch (e) {
        result = {
          status: HttpStatus.BAD_REQUEST,
          message: 'token_create_bad_request',
          token: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'token_create_bad_request',
        token: null,
      };
    }

    return result;
  }

  @MessagePattern('token_destroy')
  public async destroyToken(@Payload() data: IKafkaMessage<{
    userId: string;
  }>): Promise<ITokenDestroyResponse> {
    return {
      status: data.value && data.value.userId ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      message:
        data && data.value.userId
          ? (await this.tokenService.deleteTokenForUserId(data.value.userId)) &&
            'token_destroy_success'
          : 'token_destroy_bad_request',
      errors: null,
    };
  }

  @MessagePattern('token_decode')
  public async decodeToken(@Payload() data: IKafkaMessage<{
    token: string;
  }>): Promise<ITokenDataResponse> {
    const tokenData = await this.tokenService.decodeToken(data.value.token);
    return {
      status: tokenData ? HttpStatus.OK : HttpStatus.UNAUTHORIZED,
      message: tokenData ? 'token_decode_success' : 'token_decode_unauthorized',
      data: tokenData,
    };
  }
}
