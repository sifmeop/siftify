export const checkTracksLength = (length: number | undefined): string => {
  if (!length) return 'треков'
  if (length === 1) {
    return 'трек'
  } else if (length > 1 && length < 5) {
    return 'трека'
  } else {
    return 'треков'
  }
}
