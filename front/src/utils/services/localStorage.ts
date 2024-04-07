export const loadFromLocalStorage = <T>(key: string, defaultValue: T) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState ? JSON.parse(serializedState) : defaultValue;
  } catch (err) {
    return undefined;
  }
};

export const saveToLocalStorage = <T>(key: string, item: T) => {
  if (!item) return;
  try {
    const serializedState = JSON.stringify(item);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.log(err);
  }
};

export const removeFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.log(err);
  }
};
