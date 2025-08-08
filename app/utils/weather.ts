import { format } from 'date-fns'

export function processDayData(hourly: any) {
  if (!hourly || !hourly.time) return []

  const today = format(new Date(), 'yyyy-MM-dd')

  return hourly.time
    .map((time: string, index: number) => {
      if (!time.startsWith(today)) return null

      return {
        label: format(new Date(time), 'HH:00'),
        temperature: hourly.temperature_2m?.[index] ?? 0,
        precipitation: hourly.precipitation?.[index] ?? 0,
        wind: hourly.windspeed_10m?.[index] ?? 0,
      }
    })
    .filter(Boolean)
}

export function processWeekData(hourly: any) {
  if (!hourly || !hourly.time) return []

  const result: any[] = []
  const dayMap: Record<string, any[]> = {}

  const getPeriodLabel = (hour: number) => {
    if (hour >= 6 && hour < 12) return 'morning'
    if (hour >= 12 && hour < 18) return 'day'
    if (hour >= 18 && hour < 24) return 'evening'
    return null
  }

  hourly.time.forEach((time: string, index: number) => {
    const [date, timePart] = time.split('T')
    const hour = parseInt(timePart)

    const period = getPeriodLabel(hour)
    if (!period) return

    const key = `${date}-${period}`

    if (!dayMap[key]) dayMap[key] = []

    dayMap[key].push({
      temperature: hourly.temperature_2m?.[index] ?? 0,
      precipitation: hourly.precipitation?.[index] ?? 0,
      wind: hourly.windspeed_10m?.[index] ?? 0,
    })
  })

  for (const [key, values] of Object.entries(dayMap)) {
    const avg = (arr: number[]) =>
      arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : '0'

    const [date, period] = key.split('-')

    result.push({
      label: `${date} ${period}`,
      temperature: avg(values.map((v) => v.temperature)),
      precipitation: avg(values.map((v) => v.precipitation)),
      wind: avg(values.map((v) => v.wind)),
    })
  }

  return result
}

export function processMonthData(daily: any) {
  if (!daily || !daily.time) return []

  const result: any[] = []

  daily.time.forEach((date: string, index: number) => {
    result.push({
      label: date,
      temperature: daily.temperature_2m_mean?.[index] ?? 0,
      precipitation: daily.precipitation_sum?.[index] ?? 0,
      wind: daily.wind_speed_10m_max?.[index] ?? 0,
    })
  })

  return result
}
