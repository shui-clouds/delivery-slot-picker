"use client";

import React, { useState } from "react";
import EmblaCarousel from "./EmblaCarousel";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";

import "./embla.css";

const groupSize = [
  { name: "Groups of 2", value: '50%', slidesToScroll: 2 },
  { name: "Groups of 3", value: '33%', slidesToScroll: 3 },
  { name: "Groups of 4", value: '25%', slidesToScroll: 4},
];
const data = [
  { id: 1, name: "John", age: 30, city: "New York" },
  { id: 2, name: "Joe", age: 40, city: "Los Angeles" },
  { id: 3, name: "Jane", age: 50, city: "Chicago" },
  { id: 4, name: "Bob", age: 60, city: "Houston" },
  { id: 5, name: "Joe", age: 40, city: "Los Angeles" },
  { id: 6, name: "Jane", age: 50, city: "Chicago" },
  { id: 7, name: "Bob", age: 60, city: "Houston" },
  { id: 8, name: "Bob2", age: 60, city: "Houston" },
];

export default function Home() {
  const [selectedGroupSize, setSelectedGroupSize] = useState(groupSize[0]);
  console.dir(selectedGroupSize.name);

  return (
    <main>
      <RadioGroup
        value={selectedGroupSize}
        onChange={setSelectedGroupSize}
        aria-label="Server size"
      >
        {groupSize.map((plan) => (
          <Field
            key={plan.name}
            disabled={!plan.value}
            className="flex items-center gap-2"
          >
            <Radio
              value={plan}
              className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400 data-[disabled]:bg-gray-100"
            >
              <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
            </Radio>
            <Label className="data-[disabled]:opacity-50">{plan.name}</Label>
          </Field>
        ))}
      </RadioGroup>
      <div className="my-14" style={{ "--slide-size": selectedGroupSize.value }}>
        <EmblaCarousel
          slides={data}
          options={{ slidesToScroll: selectedGroupSize.slidesToScroll }}
          aria-label="Delivery slot picker"
        />
      </div>
    </main>
  );
}
