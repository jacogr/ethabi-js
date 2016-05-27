export function sliceData (data) {
  if (data.length % 64) {
    throw new Error('Invalid data length (not mod 64) passed to sliceData');
  }

  return data.match(/.{1,64}/g) || [];
}
