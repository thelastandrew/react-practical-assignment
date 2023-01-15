export const dateToReadable = (date) => {
  let postDate = new Date(Number(date)).toString();
  return postDate.substring(0, postDate.length - 32);
};

export const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    const fnCall = () => { fn.apply(this, args) };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, delay)
  };
}