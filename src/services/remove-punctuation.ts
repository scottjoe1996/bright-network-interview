export const removePunctuation = (input: string): string => {
  return input.replace(/\p{P}+/gu, "");
};
