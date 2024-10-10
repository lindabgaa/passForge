// ---- Helper function to check if an option is selected or not (checked : true/false)
export const checkOption = (allOptions, optionId) =>
  allOptions.find((option) => option.id === optionId)?.checked || false;

// ---- Helper function to shuffle an array
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
