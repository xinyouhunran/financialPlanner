export const CHECKNAME = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
export const CHECKPHONE = /^1[0-9]{10}$/;
export const CHECKPWD = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
export const CHECKIDCARD = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
export const CHECKIDCARD_2 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
export const CHECKNAME4 = /^[\u0391-\uFFE5]{2,6}$/
export const NEWCHECKNAME4 = /^[\u0391-\uFFE5]+(\.|·)?[\u0391-\uFFE5]+$/

export const testIdCard = function (value){
  let CHECKIDCARD = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  if(CHECKIDCARD.test(value.trim())){
    return true;
  }
  if (!value) {
    return false;
  } else if (!CHECKIDCARD.test(value.trim())) {
    return false;
  } else {
    if (value.length == 18) {
      var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
      var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
      var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
      for (var i = 0; i < 17; i++) {
        idCardWiSum += value.substring(i, i + 1) * idCardWi[i];
      }

      var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
      var idCardLast = value.substring(17); //得到最后一位身份证号码

      //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod == 2) {
        if (idCardLast == "X" || idCardLast == "x") {
          return true
        } else {
          return false
        }
      } else {
        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == idCardY[idCardMod]) {
          return true
        } else {
          return false
        }
      }
    }
  }
}
