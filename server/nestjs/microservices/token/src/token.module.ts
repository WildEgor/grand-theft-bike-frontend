import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenController } from './token.controller';
import { TokenService } from './services/token.service';
import { JwtConfigService } from './services/config/jwt-config.service';
import { MongoConfigService } from './services/config/mongo-config.service';
import { TokenSchema } from './schemas/token.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: 'Token',
        schema: TokenSchema,
      },
    ]),
    ClientsModule.register([
      {
        name: 'TOKEN_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'kafka',
            brokers: ['kafka:9093'],
          },
          consumer: {
            groupId: 'kafka-consumer'
          }
        }
      },
    ]),
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {
}
