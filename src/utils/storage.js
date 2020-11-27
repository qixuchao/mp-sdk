const KEY = 'M$P_FC';

const today = (() => {
  const date = new Date();
  const month = date.getMonth() + 1;
  return date.getFullYear() + '-' + month + '-' + date.getDate();
})();

export const getFreqControl = () => {
  let data = {};
  try {
    data = JSON.parse(localStorage[KEY]);
  } catch (e) {}
  return data[today] || {};
};

export const setFreqControl = (key, value) => {
  const data = getFreqControl();
  data[key] = value;

  try {
    // 只存取当前数据，默认重置非当天数据
    localStorage.setItem(
      KEY,
      JSON.stringify({
        [today]: data
      })
    );
  } catch (e) {
    console.log(e);
  }
};
