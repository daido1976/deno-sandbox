import { difference } from "https://deno.land/std@0.181.0/datetime/difference.ts";
import { format } from "https://deno.land/std@0.181.0/datetime/mod.ts";

export function getSlotsRangeOf(
  startTime: string,
  endTime: string,
  // NOTE: デフォルトでは 30 分間隔にしている
  // 現状は milliseconds の number だが、この関数のユースケースを考えると minutes の number で渡してもいいかもしれない
  interval: number = 30 * 60 * 1000
): string[] {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const diff = difference(startDate, endDate, {
    units: ["milliseconds"],
  }).milliseconds;

  if (!diff) {
    return [];
  }

  const slotCount = diff / interval;

  return Array.from({ length: slotCount }, (_, index) =>
    format(new Date(startDate.getTime() + index * interval), "yyyy/MM/dd HH:mm")
  );
}
