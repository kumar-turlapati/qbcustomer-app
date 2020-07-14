export const isMobileNumberValid = mobileNumber => {
  let isAllDigits = true;
  if (mobileNumber.length !== 10)
    return {status: false, reason: 'Mobile number must be 10 digits'};
  if (parseInt(mobileNumber[0], 10) < 6)
    return {
      status: false,
      reason: 'Mobile number should start with 6,7,8 or 9',
    };

  for (i = 0; i < mobileNumber.length; i++) {
    if (
      !(mobileNumber.charCodeAt(i) >= 48 && mobileNumber.charCodeAt(i) <= 57)
    ) {
      return {
        status: false,
        reason: 'Mobile number must be all digits',
      };
    }
  }

  if (!isAllDigits) return {status: true, reason: 'Mobile number valid'};
};
