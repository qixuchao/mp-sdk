(function () {
  const getRandomString = function () {
    return Math.random().toString(36).toUpperCase();
  };

  const cookieName = 'auto_jump_cookie';
  const imeiLocalstorageName = 'imei';
  const requestId = `H${Math.floor(
    +new Date() / 10000
  )}-${getRandomString().slice(-6)}-${getRandomString().slice(
    -6
  )}-${getRandomString().slice(-4)}`;

  const getImei = function () {
    let imei = '';
    try {
      imei = window.localStorage.getItem(imeiLocalstorageName);
    } catch (e) {}

    if (!imei) {
      imei = `H${Math.floor(+new Date() / 10000)}-${getRandomString().slice(
        -6
      )}-${getRandomString().slice(-6)}-${getRandomString().slice(-4)}`;

      window.localStorage.setItem(imeiLocalstorageName, imei);
    }

    return imei;
  };
  //写cookies
  const setCookie = function (name, value, expire) {
    expire = expire || 0;
    let exp = new Date();
    exp.setTime(exp.getTime() + expire);
    document.cookie =
      name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/';
  };

  //读取cookies
  const getCookie = function (name) {
    let arr,
      reg = new RegExp(name + '=([^;]*)');
    if ((arr = document.cookie.match(reg))) return unescape(arr[1]);
    else return null;
  };

  const schemeLinkObj = {
    1102: 'openapp.jdmobile://virtual?params=%7B%22category%22%3A%22jump%22%2C%22des%22%3A%22m%22%2C%22url%22%3A%22https%3A%2F%2Fccc-x.jd.com%2Fdsp%2Fcl%3Fposid%3D1999%26v%3D707%26union_id%3D1000023384%26pid%3D2909%26tagid%3D105151%26didmd5%3D__IMEI__%26idfamd5%3D__IDFA__%26did%3D__IMEIIMEI__%26idfa%3D__IDFAIDFA__%26to%3Dhttps%253A%252F%252Fh5.m.jd.com%252FbabelDiy%252FZeus%252FVfr818K8Q69jt2MqesNiKQTJv5L%252Findex.html%253Fad_od%253D1%2526babelChannel%253Dttt2%2526channel%253Djd-ms11dc-szmj-all%22%2C%22m_param%22%3A%7B%22jdv%22%3A%22122270672%7Ckong%7Ct_1000023384_105151%7Czssc%7Cd36d13b9-61c4-4fdf-b7f2-11dbc28d14dd-p_1999-pr_2909-at_105151%22%7D%2C%22keplerFrom%22%3A%221%22%2C%22kepler_param%22%3A%7B%22source%22%3A%22kepler-open%22%2C%22otherData%22%3A%7B%22channel%22%3A%22b4dc3278288f4a25982ccdec07ebdc41%22%7D%7D%7D',
    1104: 'openapp.jdmobile://virtual?params=%7B%22category%22%3A%22jump%22%2C%22des%22%3A%22m%22%2C%22url%22%3A%22https%3A%2F%2Fccc-x.jd.com%2Fdsp%2Fcl%3Fposid%3D1999%26v%3D707%26union_id%3D1000027278%26pid%3D2737%26tagid%3D128212%26didmd5%3D__IMEI__%26idfamd5%3D__IDFA__%26did%3D__IMEIIMEI__%26idfa%3D__IDFAIDFA__%26to%3Dhttps%253A%252F%252Fpro.m.jd.com%252Fmall%252Factive%252FBggQSgjTtAjR16M7vcDkPkyxEw1%252Findex.html%253Fad_od%253D1%22%2C%22m_param%22%3A%7B%22jdv%22%3A%22122270672%7Ckong%7Ct_1000027278_128212%7Czssc%7Cd36d13b9-61c4-4fdf-b7f2-11dbc28d14dd-p_1999-pr_2737-at_128212%22%7D%2C%22keplerFrom%22%3A%221%22%2C%22kepler_param%22%3A%7B%22source%22%3A%22kepler-open%22%2C%22otherData%22%3A%7B%22channel%22%3A%22b4dc3278288f4a25982ccdec07ebdc41%22%7D%7D%7D'
  };

  const schemeLink = schemeLinkObj[1104];

  const exportAction = function (action) {
    const actionUrl =
      '//l.fancyapi.com/action?aid=' +
      '20201102' +
      '&action=' +
      action +
      '&data=' +
      JSON.stringify({
        schemeLink: schemeLink,
        imei: getImei(),
        requestId: requestId
      }) +
      '&_rm_=' +
      +new Date();
    new Image().src = actionUrl;
  };

  exportAction('landing');

  const openApp = function () {
    const cookie = getCookie(cookieName);
    if (!cookie) {
      exportAction('openApp');

      window.location.href = schemeLink;

      setTimeout(function () {
        setCookie(cookieName, +new Date(), 6 * 60 * 60 * 1000);

        if (document.hidden) {
          exportAction('openAppSuccess');
        } else {
          exportAction('openAppFail');
        }
      }, 1000);
    }
  };

  openApp();
})();
