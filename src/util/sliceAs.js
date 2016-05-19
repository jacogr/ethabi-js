// export function asU32 (slice) {
// 	if !slice[..28].iter().all(|x| *x == 0) {
// 		return Err(Error::InvalidData);
// 	}
//
// 	let result = ((slice[28] as u32) << 24) +
// 		((slice[29] as u32) << 16) +
// 		((slice[30] as u32) << 8) +
// 		(slice[31] as u32);
//
// 	Ok(result)
// }
//
export function asAddress (slice) {
  // TODO: address validation?

  return slice.slice(-40);
}

export function asBool (slice) {
  // TODO: everything else should be 0

  return slice[63] === '1';
}
