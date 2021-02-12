// Copyright (C) 2019 ExtraHash
// Copyright (C) 2020 Deeterd
//
// Please see the included LICENSE file for more information.
import fs from 'fs';
import log from 'electron-log';
import { config } from '../index';

export default class ProtonConfig {
  configPath;

  constructor(pConfig: any, configPath: string) {
    this.config = pConfig;
    this.configPath = configPath;
  }

  getConfigPath(): string {
    return this.configPath;
  }

  setConfigPath(path: string) {
    this.configPath = path;
  }

  modifyConfig(propertyName: string, value: any) {
    const programDirectory = this.getConfigPath();
    log.debug(`Config update: ${propertyName} set to ${value}`);
    config[propertyName] = value;
    fs.writeFileSync(
      `${programDirectory}/config.json`,
      JSON.stringify(config, null, 4),
      err => {
        if (err) throw err;
        log.debug(err);
        return false;
      }
    );
  }
}
