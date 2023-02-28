declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REDIS_PORT_NUMBER: number;
      REDIS_DOMAIN_NAME: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}