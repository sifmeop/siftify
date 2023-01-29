export const formatDuration = (
  duration: number | undefined,
  type: 'short' | 'normal' = 'normal'
): string => {
  if (!duration) return '00:00'
  const minutes = Math.floor((duration % 3600) / 60).toString()
  const seconds = Math.floor(duration % 60)
    .toString()
    .padStart(2, '0')
  if (type === 'normal') {
    return `${minutes}мин. ${seconds}сек.`
  }
  return `${minutes}:${seconds}`
}
