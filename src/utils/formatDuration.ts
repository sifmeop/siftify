export const formatDuration = (
  duration: number | undefined
): string | undefined => {
  if (!duration) return
  const minutes = Math.floor((duration % 3600) / 60)
    .toString()
    .padStart(2, '0')
  const seconds = Math.floor(duration % 60)
    .toString()
    .padStart(2, '0')
  return `${minutes}:${seconds}`
}
