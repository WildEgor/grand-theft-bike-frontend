import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions, MicroserviceOptions } from '@nestjs/microservices';

import { TokenModule } from './token.module';
import { ConfigService } from './services/config/config.service';

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice(TokenModule, {
//     transport: Transport.TCP,
//     options: {
//       host: '0.0.0.0',
//       port: new ConfigService().get('port'),
//     },
//   } as TcpOptions);
//   await app.listen();
// }

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(TokenModule, {
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
  );
  
  await app.listen();
}

bootstrap();


