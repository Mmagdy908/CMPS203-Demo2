export const filterObject = (obj: Object, ...fields: Array<string>): Object => {
  const newObj: Object = { ...obj };

  Object.keys(newObj).forEach((key: string) => {
    if (!fields.includes(key)) delete newObj[key as keyof Object];
  });

  return newObj;
};
