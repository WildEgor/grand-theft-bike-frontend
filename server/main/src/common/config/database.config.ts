export default () => ({
  database: {
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DBNAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
});
