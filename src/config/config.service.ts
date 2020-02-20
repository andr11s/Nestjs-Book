import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevelopedEnv = process.env.NODE_ENV !== 'production';

    if (isDevelopedEnv) {
      const envFilePath = __dirname + '../../../.env';
      const existsPath = fs.existsSync(envFilePath);

      if (!existsPath) {
        console.log('.env File does not exist');
        process.exit(0);
      }

      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      PORT: process.env.PORT;
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
