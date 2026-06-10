/**
 * 
 * @param {string} val 
 * @returns {string}
 */

export const content = (val) => {
  if(!val) {
    return '내용은 필수입니다.';
  }

  if(val.length > 200) {
    return '내용은 200자 이내로 입력해주세요.';
  }

  return '';
}

export const image = (val) => {
  if(!val) {
    return '이미지는 필수입니다';
  }

  return '';
}
