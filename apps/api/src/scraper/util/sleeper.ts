export const sleeper = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
