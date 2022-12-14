import Tippy from "@tippyjs/react";
import React from "react";
import "./Range.css";
import colors from "tailwindcss/colors";

const RegularSlider = ({
  range,
  value,
  step,
}: {
  range: number[];
  value: number;
  step: number;
}) => (
  <input
    id="default-range"
    type="range"
    value={value}
    onChange={() => null}
    min={range[0]}
    max={range[1]}
    step={step}
    className="my-auto opacity-50 w-full bg-white h-2 appearance-none focus:outline-none relative pointer-events-none slider"
    style={
      {
        "--SliderColor": colors.blue[600],
      } as React.CSSProperties
    }
  />
);

const FancyColorSlider = ({
  range,
  value,
  step,
  color,
  colorFrom,
  colorTo,
}: {
  range: number[];
  value: number;
  step: number;
  color: string;
  colorFrom: string;
  colorTo: string;
}) => (
  <input
    id="default-range"
    type="range"
    value={value}
    onChange={() => null}
    min={range[0]}
    max={range[1]}
    step={step}
    className="my-auto opacity-100 border-y w-full h-2 appearance-none focus:outline-none relative bg-gradient-to-r slider pointer-none pointer-events-none"
    style={
      {
        color: colorFrom,
        "--tw-gradient-from": colorFrom,
        "--tw-gradient-to": colorTo,
        "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to)",
        "--SliderColor": color,
      } as React.CSSProperties
    }
  />
);

export const Range = ({
  label,
  value,
  step,
  range,
  yellow,
  green,
  color,
  colorFrom,
  colorTo,
  decimalPlaces,
}: {
  label: string;
  value: number;
  step: number;
  range: number[];
  yellow: number[];
  green: number[];
  color?: string;
  colorFrom?: string;
  colorTo?: string;
  decimalPlaces: number;
}) => {
  const width = range[1] - range[0];
  const yellowLeft = (yellow[0] - range[0]) / width;
  const yellowWidth = (yellow[1] - yellow[0]) / width;
  const greenLeft = (green[0] - range[0]) / width;
  const greenWidth = (green[1] - green[0]) / width;

  return (
    <div>
      <label
        htmlFor="default-range"
        className="block text-md font-bold text-gray-500 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="flex flex-row items-center">
        <div className="m-2 text-sm text-gray-500 w-12">
          {value.toFixed(decimalPlaces)}
        </div>
        <div className="relative h-6 flex flex-1">
          <Tippy
            content={`${range[0].toFixed(decimalPlaces)} - ${range[1].toFixed(
              decimalPlaces
            )}`}
          >
            <div className="from-red-400 to-red-500 absolute inset-0 bg-gradient-to-b hover:opacity-75 rounded-md" />
          </Tippy>
          <Tippy
            content={`${yellow[0].toFixed(decimalPlaces)} - ${yellow[1].toFixed(
              decimalPlaces
            )}`}
          >
            <div
              className="from-yellow-400 to-yellow-500 inset-y-0 absolute hover:opacity-75 bg-gradient-to-b"
              style={{
                left: `${100 * yellowLeft}%`,
                width: `${100 * yellowWidth}%`,
              }}
            />
          </Tippy>
          <Tippy
            content={`${green[0].toFixed(decimalPlaces)} - ${green[1].toFixed(
              decimalPlaces
            )}`}
          >
            <div
              className="from-green-400 to-green-500 inset-y-0 absolute hover:opacity-75 bg-gradient-to-b"
              style={{
                left: `${100 * greenLeft}%`,
                width: `${100 * greenWidth}%`,
              }}
            />
          </Tippy>

          {colorFrom && colorTo && color ? (
            <FancyColorSlider
              value={value}
              step={step}
              range={range}
              color={color}
              colorFrom={colorFrom}
              colorTo={colorTo}
            />
          ) : (
            <RegularSlider value={value} step={step} range={range} />
          )}
        </div>
      </div>
    </div>
  );
};
