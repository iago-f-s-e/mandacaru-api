export const isValidBirthdate = (value: string): boolean => {
  const tester = /(0[1-9]|\d{1}|\d{2}|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d{2})/;

  return tester.test(value);
};
