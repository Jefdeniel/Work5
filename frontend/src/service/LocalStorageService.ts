// service/LocalStorageService.ts
export const getLocalstorageItem = (key: string): string | null => {
  try {
    const item = window.localStorage.getItem(key);
    console.log(`Retrieved ${key} from localStorage: `, item);
    return item;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage`, error);
    return null;
  }
};

export const setLocalstorageItem = (key: string, value: any): void => {
  try {
    window.localStorage.setItem(key, value);
    console.log(`Stored ${key} in localStorage: `, value);
  } catch (error) {
    console.error(`Error storing ${key} in localStorage`, error);
  }
};

export const removeLocalstorageItem = (key: string): void => {
  try {
    window.localStorage.removeItem(key);
    console.log(`Removed ${key} from localStorage`);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage`, error);
  }
};
