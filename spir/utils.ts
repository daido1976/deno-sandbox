import { difference } from "https://deno.land/std@0.181.0/datetime/difference.ts";
import { format } from "https://deno.land/std@0.181.0/datetime/mod.ts";

// TODO: 30 分間隔という知識も外部から注入する
export function getSlotsRangeOf(startTime: string, endTime: string): string[] {
  const startDate: Date = new Date(startTime);
  const endDate: Date = new Date(endTime);
  const intervalInMinutes = 30;

  const diffInMinutes = difference(startDate, endDate, {
    units: ["minutes"],
  }).minutes;

  if (!diffInMinutes) {
    return [];
  }

  const timeSlotCount: number = diffInMinutes / intervalInMinutes;

  return Array.from({ length: timeSlotCount }, (_, index) => {
    const timeSlotDate = new Date(
      startDate.getTime() + index * intervalInMinutes * 60 * 1000
    );
    return format(timeSlotDate, "yyyy/MM/dd HH:mm");
  });
}
