import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  DB_HOST: string = process.env.PGHOST;

  @IsNumber()
  DB_PORT: number = Number(process.env.PGPORT);

  @IsString()
  DB_USERNAME: string = process.env.PGUSER;

  @IsString()
  DB_PASSWORD: string = process.env.PGPASSWORD;

  @IsString()
  DB_NAME: string = process.env.PGDATABASE;

  @IsString()
  SECRET: string = process.env.SECRET;
}

export function validate(config: Record<string, unknown>) {
  console.log('Validating environment variables:', config);

  const validatedConfig = new EnvironmentVariables();

  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    console.error('Validation errors:', errors);
    throw new Error(errors.toString());
  }
  return validatedConfig;
}