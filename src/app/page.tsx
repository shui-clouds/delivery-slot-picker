import { faker } from "@faker-js/faker";

import "./embla.css";
import DeliverySlotSelector from "./deliverySlotSelector";
import { addDays, addWeeks, isFriday, isSunday, isWednesday, startOfDay } from "date-fns";
import { DateSlots, Slot } from "../../types";

faker.seed(0);

const FRIDAY_COUNTER_START_DATE = new Date("2020-01-03");
function generateDaysOfSlots(
  includesPCParts: boolean,
  startDate: Date,
  numberOfWeeks: number
): DateSlots[] {
  let currentFriday = FRIDAY_COUNTER_START_DATE;
  let isFridaySlotsReduced = true;

  while (currentFriday < startDate) {
    currentFriday = addWeeks(currentFriday, 1);
    isFridaySlotsReduced = !isFridaySlotsReduced;
  }

  const endDate = addWeeks(startDate, numberOfWeeks);
  const result: DateSlots[] = [];

  for (let currentDate = startDate; currentDate <= endDate; currentDate = addDays(currentDate, 1)) {
    if (isSunday(currentDate)) continue;

    const slots = (["AM", "PM", "EVE"] as const).map((timeslot) => {
      let status: Slot["status"] = "available";
      if (includesPCParts && isWednesday(currentDate)) {
        status = "unavailable";
      } else if (isFriday(currentDate) && isFridaySlotsReduced && timeslot === "AM") {
        status = "unavailable";
      } else {
        // Randomly simulate 'full' slots
        status = faker.helpers.arrayElement<Slot["status"]>([
          "available",
          "full",
        ]);
      }
      return {timeslot, status};
    })

    result.push({
      formattedDate: currentDate.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
      slots: slots,
    });

    if (isFriday(currentDate)) isFridaySlotsReduced = !isFridaySlotsReduced;
  }
  return result;
}

export default function Home() {

  const daysOfSlots = generateDaysOfSlots(false, startOfDay(new Date()), 4);

  return <DeliverySlotSelector daysOfSlots={daysOfSlots} />;
}
