export const getLocalStorage = (key: string) => {
  const lsData = localStorage.getItem(key);
  let lsDataParsed;
  if (lsData !== null) {
    lsDataParsed = JSON.parse(lsData);
    return lsDataParsed;
  } else {
    return null;
  }
};

export const getSessionStorage = (key: string) => {
  const lsData = sessionStorage.getItem(key);
  let lsDataParsed;
  if (lsData !== null) {
    lsDataParsed = JSON.parse(lsData);
    return lsDataParsed;
  } else {
    return null;
  }
};
