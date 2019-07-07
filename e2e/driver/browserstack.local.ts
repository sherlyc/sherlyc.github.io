// @ts-ignore
import * as browserstack from 'browserstack-local';

export const startBrowserStackLocal = (key: string, browser: string) => {
  const bsLocal = new browserstack.Local();
  const bsLocalArgs = {'key': key, 'localIdentifier': browser};

  return new Promise((resolve, reject) => {
    bsLocal.start(bsLocalArgs, (err?: Error) => {
      if (err) {
        console.error('Error starting browserStack', err);
        reject(err);
      }
      console.log(`Connected to BS - ${browser}`);
      resolve();
    });
  });
};



