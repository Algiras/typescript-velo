export const waitUntil = <T>(check: () => T, retry = 10) => {
  try {
    const result = check();
    return Promise.resolve(result);
  } catch (e) {
    if (retry > 0) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitUntil(check, retry - 1));
        }, 10);
      });
    } else {
      return Promise.reject(e);
    }
  }
};
