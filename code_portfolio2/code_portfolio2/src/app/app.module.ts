import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { TokenMiddleware } from './auth/token.middleware';
import { DataModule } from './data.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
	imports: [
		ThrottlerModule.forRoot
		([{
			ttl: 60000,
			limit: 100,
		}]),
		MongooseModule.forRoot(
			`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
		),

		AuthModule,
		DataModule,
		RouterModule.register([
			{
				path: 'auth',
				module: AuthModule,
			},
			{
				path: 'data',
				module: DataModule,
			},
		]),
	],
	controllers: [],
	providers: [
		{
		provide: APP_GUARD,
		useClass: ThrottlerGuard
	  }
	  ],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(TokenMiddleware)
			.exclude({ path: 'api/auth/login', method: RequestMethod.POST })
			.forRoutes('*');
	}
}
