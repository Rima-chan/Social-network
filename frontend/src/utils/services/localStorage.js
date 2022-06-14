export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("userState");
    console.log(JSON.parse(serializedState));
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    return undefined;
  }
};

export const saveToLocalStorage = (data) => {
  if (!data) return;
  try {
    const serializedState = JSON.stringify(data);
    localStorage.setItem("userState", serializedState);
  } catch (err) {
    console.log(err);
  }
};
