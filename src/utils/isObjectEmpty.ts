const isObjectEmpty = (obj = {}): boolean => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export default isObjectEmpty;
