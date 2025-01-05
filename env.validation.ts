import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  SECRET: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = new EnvironmentVariables();
  validatedConfig.DB_HOST = config.DB_HOST as string;
  validatedConfig.DB_PORT = Number(config.DB_PORT);
  validatedConfig.DB_USERNAME = config.DB_USERNAME as string;
  validatedConfig.DB_PASSWORD = config.DB_PASSWORD as string;
  validatedConfig.DB_NAME = config.DB_NAME as string;
  validatedConfig.SECRET = config.SECRET as string;

  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}