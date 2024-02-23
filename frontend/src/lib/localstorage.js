export const saveToLocalStorage = (data) => {
  const savedCodes = JSON.parse(localStorage.getItem("savedCodes")) || [];
  savedCodes.push(data);
  localStorage.setItem("savedCodes", JSON.stringify(savedCodes));
};

export const loadFromLocalStorage = () => {
  const savedCodes = JSON.parse(localStorage.getItem("savedCodes")) || [];
  return savedCodes;
};
