import dotenv from 'dotenv'
const { config } = dotenv

// We load DB config from .env file for development purposes. In real production system usually env variables will be populated using different mechanism, such as Kubernetes secrets.
// Using dotenv allows us to minimize differences in configuration code between production and development systems
config()

const env = { ...process.env }

export function getDbConfig() {
  return {
    host: getMandatory('DB_HOST'),
    port: getOptionalInteger('DB_PORT', 5432),
    database: getOptional('DB_DATABASE', 'postgres'),
    user: getOptional('DB_USER', 'postgres'),
    password: getNullable('DB_PASSWORD', undefined),
  }
}

function getMandatory(param: string): string {
  if (!env[param]) {
    throw new Error(`Mandatory param ${param} is not set`)
  }
  return env[param]!
}

function getOptional(param: string, defaultValue: string): string {
  return env[param] ?? defaultValue
}

function getNullable(param: string, defaultValue: string | undefined): string | undefined {
  return env[param] ?? defaultValue
}

function getOptionalInteger(param: string, defaultValue: number): number {
  return env[param] ? Number.parseInt(env[param]!) : defaultValue
}

export function isProduction() {
  return env.NODE_ENV === 'production'
}

export function isDevelopment() {
  return env.NODE_ENV !== 'production'
}
