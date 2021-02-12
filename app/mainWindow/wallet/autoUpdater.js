// Copyright (C) 2019 ExtraHash
// Copyright (C) 2020 Deeterd
//
// Please see the included LICENSE file for more information.
import request from 'request-promise';
import log from 'electron-log';
import semver from 'semver';
import os from 'os';
import { eventEmitter } from '../index';
import npmPackage from '../../../package.json';

const currentVersion = npmPackage.version;
const operatingSystem = os.platform();
const arch = os.arch();

export default class AutoUpdater {
  getLatestVersion() {
    if (process.env.NODE_ENV !== 'development') {
      log.debug('Checking for updates...');
      const options = {
        method: 'GET',
        url: `https://github.com/cirquity/cirquity-wallet/releases/latest/${operatingSystem}/${currentVersion}/${arch}`,
        json: true
      };
      log.debug(options);
      request(options, (error, response, body) => {
        if (error) {
          log.debug('Error when contacting update server...');
          return;
        }
        if (semver.gt(body.latestVersion, npmPackage.version)) {
          log.debug(
            `Update required! Local version: ${
              npmPackage.version
            }, latest version: ${body.latestVersion}`
          );
          const updateFile = body.downloadPath;
          eventEmitter.emit('updateRequired', updateFile);
        } else {
          log.debug('No update found.');
        }
        return body;
      });
    } else {
      log.debug('Development environment detected.');
    }
  }
}
