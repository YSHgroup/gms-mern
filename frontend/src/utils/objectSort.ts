export const objectCompare = (index: string) => {
  return (pre: Record<string, any>, next: Record<string, any>) => {
    if (pre[index] < next[index]) {
      return -1;
    }
    if (pre[index] > next[index]) {
      return 1;
    }
    return 0;
  };
};
