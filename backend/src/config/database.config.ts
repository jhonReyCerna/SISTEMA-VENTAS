import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'sistema_ventas',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true, // Solo usar en desarrollo
};