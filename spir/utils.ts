import { difference } from "https://deno.land/std@0.181.0/datetime/difference.ts";
import { format } from "https://deno.land/std@0.181.0/datetime/mod.ts";

type TimeSlotsInRangeOptions = {
  intervalInMinutes?: number;
  // NOTE: 機能拡張が必要になったら Union 型にして拡張する
  formatString?: "yyyy/MM/dd HH:mm";
};

export function getTimeSlotsInRange(
  startTime: string,
  endTime: string,
  options: TimeSlotsInRangeOptions = {}
): string[] {
  const {
    // NOTE: デフォルトでは 30 分間隔にしている
    // TODO: 0 を渡された時にランタイムエラーが起きるのでハンドリングする
    intervalInMinutes = 30,
    formatString = "yyyy/MM/dd HH:mm",
  } = options;
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const diffInMinutes = difference(startDate, endDate, {
    units: ["minutes"],
  }).minutes;

  if (!diffInMinutes) {
    return [];
  }

  const slotCount = diffInMinutes / intervalInMinutes;
  const intervalInMs = intervalInMinutes * 60 * 1000;

  return Array.from({ length: slotCount }, (_, index) =>
    format(new Date(startDate.getTime() + index * intervalInMs), formatString)
  );
}
