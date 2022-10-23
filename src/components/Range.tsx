export const Range = ({
  label,
  value,
  step,
  range,
  yellow,
  green,
}: {
  label: string;
  value: number;
  step: number;
  range: number[];
  yellow: number[];
  green: number[];
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
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="flex flex-row">
        <div>{value.toFixed(3)}</div>
        <div className="relative flex-1">
          <div className="bg-red-400 absolute inset-0" />
          <div
            className="bg-yellow-400 inset-y-0 absolute"
            style={{
              left: `${100 * yellowLeft}%`,
              width: `${100 * yellowWidth}%`,
            }}
          />
          <div
            className="bg-green-400 inset-y-0 absolute hover:opacity-50"
            style={{
              left: `${100 * greenLeft}%`,
              width: `${100 * greenWidth}%`,
            }}
          />

          <input
            id="default-range"
            type="range"
            value={value}
            min={range[0]}
            max={range[1]}
            step={step}
            className="w-full bg-white h-2 appearance-none focus:outline-none my-2 relative"
          />
        </div>
      </div>
    </div>
  );
};
