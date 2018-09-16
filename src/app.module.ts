import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FacilityModule } from './facility/facility.module';

@Module({
  imports: [
      TypeOrmModule.forRoot(),
      AuthModule,
      UserModule,
      FacilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
