"use client";

import { useState } from "react";
import EmblaCarousel from "./EmblaCarousel";
import { Radio, RadioGroup } from "@headlessui/react";
import "./embla.css";
import { DateSlots } from "../../types";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DeliverySlotSelector({
  daysOfSlots,
}: {
  daysOfSlots: DateSlots[];
}) {
  const [selectedGroupSize, setSelectedGroupSize] = useState<2 | 3 | 4>(2);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <fieldset className="mt-8">
        <legend className="text-sm font-semibold leading-6 text-gray-900">
          Slot Group Size
        </legend>

        <div className="mt-1 space-y-6 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          {([2, 3, 4] as const).map((groupSize) => (
            <div key={groupSize} className="flex items-center">
              <input
                defaultChecked={groupSize === 2}
                id={`group-size-option-${groupSize}`}
                name="group-size"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                onChange={() => setSelectedGroupSize(groupSize)}
              />
              <label
                htmlFor={`group-size-option-${groupSize}`}
                className="ml-3 block text-sm leading-6 text-gray-900"
              >
                Groups of {groupSize}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      <p className="my-4">
        Selected slot: {selectedSlot ? selectedSlot : "None"}
      </p>

      <div>
        <EmblaCarousel
          options={{ slidesToScroll: selectedGroupSize }}
          aria-label="Delivery slot picker"
        >
          {daysOfSlots.map((dayOfSlots) => (
            <div key={dayOfSlots.formattedDate}>
              <h1 className="text-xl font-bold">{dayOfSlots.formattedDate}</h1>
              <RadioGroup
                className={"py-4"}
                value={selectedSlot}
                onChange={setSelectedSlot}
              >
                {dayOfSlots.slots.map((slot) => (
                  <Radio
                    key={`${dayOfSlots.formattedDate} - ${slot.timeslot}`}
                    value={`${dayOfSlots.formattedDate} - ${slot.timeslot}`}
                    disabled={
                      slot.status === "unavailable" || slot.status === "full"
                    }
                    className={classNames(
                      slot.status === "available"
                        ? "cursor-pointer focus:outline-none ring-1"
                        : "cursor-not-allowed opacity-100 bg-gray-200 hover:bg-gray-200 text-zinc-400 ring-0",
                      "my-2 flex items-center justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold ring-gray-300 hover:bg-gray-50 data-[checked]:bg-emerald-600 data-[checked]:text-white data-[checked]:ring-0 data-[focus]:data-[checked]:ring-2 data-[focus]:ring-2 data-[focus]:ring-emerald-600 data-[focus]:ring-offset-2 data-[checked]:hover:bg-emerald-500 sm:flex-1 [&:not([data-focus],[data-checked])]:ring-inset"
                    )}
                  >
                    {slot.timeslot}{" "}
                    {slot.status == "unavailable" && "(Unavailable)"}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          ))}
        </EmblaCarousel>
      </div>
    </main>
  );
}
