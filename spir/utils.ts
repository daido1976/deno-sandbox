// TODO: 30 分間隔という知識や locale も外部から注入する
export function getSlotsRangeOf(startTime: string, endTime: string): string[] {
  // const startDate: Date = new Date(startTime);
  // const endDate: Date = new Date(endTime);

  // const timeSlots: string[] = [];

  // // 開始時間が終了時間よりも前である場合、時間帯の配列を生成します。
  // while (startDate < endDate) {
  //   const timeSlot: string = startDate.toLocaleString();
  //   timeSlots.push(timeSlot);

  //   startDate.setTime(startDate.getTime() + 30 * 60 * 1000);
  // }

  // return timeSlots;
  // TODO: 👆 を https://deno.land/std@0.178.0/collections/mod.ts?s=takeWhile で書き直す
  // もしくは https://deno.land/std@0.178.0/datetime/mod.ts?s=difference 使って minutes の diff 取って Array.from({length: ...}) でもいいかも
  const startDate: Date = new Date(startTime);
  const endDate: Date = new Date(endTime);

  const timeSlotCount: number =
    (endDate.getTime() - startDate.getTime()) / (30 * 60 * 1000);

  return Array.from({ length: timeSlotCount }, (_, index) => {
    const timeSlotDate = new Date(startDate.getTime() + index * 30 * 60 * 1000);
    return timeSlotDate.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  });
}
