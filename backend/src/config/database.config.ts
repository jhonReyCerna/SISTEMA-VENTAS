import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'sistema_ventas',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true, // Solo usar en desarrollo
  charset: 'utf8mb4',
};