export const getLocalstorageItem = (key: string) => {
  try {
    return window && window.localStorage && window.localStorage.getItem(key);
  } catch (error) {
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setLocalstorageItem = (key: string, value: any) => {
  try {
    return (
      window && window.localStorage && window.localStorage.setItem(key, value)
    );
  } catch (error) {
    return null;
  }
};

export const removeLocalstorageItem = (key: string) => {
  try {
    return window && window.localStorage && window.localStorage.removeItem(key);
  } catch (error) {
    return null;
  }
};
