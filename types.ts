import 'react';

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number
    }
}

export type Slot = {
  timeslot: "AM" | "PM" | "EVE";
  status: "available" | "unavailable" | "full";
};
export type DateSlots = {
  formattedDate: string;
  slots: Slot[];
};
