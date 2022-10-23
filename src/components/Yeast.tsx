import { useState } from "react";
import { AnchorButton } from "./AnchorButton";

export const NumericEdit = ({
  label,
  initialValue,
  onChange,
}: {
  label: string;
  initialValue: number;
  onChange: (value: number) => void;
}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <div>
      <label htmlFor="email" className="sr-only">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const numeric = Number(e.target.value);
          setValue(numeric);
          onChange(numeric);
        }}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder={label}
      />
    </div>
  );
};

const Row = ({
  item,
  editing,
  onEdit,
  onEditSave,
  onEditCancel,
  onChange,
}: {
  item: BeerJSON.CultureAdditionType;
  editing: boolean;
  onEdit: () => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onChange: (v: any) => void;
}) => (
  <tr>
    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
      <div className="flex items-center">
        <div className="h-10 w-10 flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={"/1280px-S_cerevisiae_under_DIC_microscopy.jpg"}
            alt=""
          />
        </div>
        <div className="ml-4">
          <div className="font-medium text-gray-900">{item.name}</div>
          <div className="text-gray-500">{item.producer}</div>
        </div>
      </div>
    </td>
    <td className="whitespace-nowrap px-3 py-4 text-2xl">
      <div className="w-24 h-8">Attenuation: {item.attenuation?.value}</div>
    </td>
    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
      {editing ? (
        <div className="space-x-2">
          <AnchorButton onClick={onEditSave}>Save</AnchorButton>
          <AnchorButton onClick={onEditCancel}>Cancel</AnchorButton>
        </div>
      ) : (
        <AnchorButton onClick={onEdit}>Edit</AnchorButton>
      )}
    </td>
  </tr>
);

export const Yeast = ({
  yeast,
  updateYeast,
}: {
  yeast: BeerJSON.CultureAdditionType[];
  updateYeast: (idx: number, yeast: BeerJSON.CultureAdditionType) => void;
}) => {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [restoreValue, setRestoreValue] =
    useState<BeerJSON.CultureAdditionType | null>(null);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Cultures</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Details
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {yeast.map((yeast, idx) => (
                    <Row
                      item={yeast}
                      editing={editingIdx === idx}
                      key={idx}
                      onEdit={() => {
                        setRestoreValue({ ...yeast });
                        setEditingIdx(idx);
                      }}
                      onEditCancel={() => {
                        if (restoreValue) {
                          updateYeast(idx, restoreValue);
                        }
                        setRestoreValue(null);
                        setEditingIdx(null);
                      }}
                      onEditSave={() => {
                        setRestoreValue(null);
                        setEditingIdx(null);
                      }}
                      onChange={(v) => {
                        updateYeast(idx, { ...yeast, ...v });
                      }}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
