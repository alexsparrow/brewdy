import { useState } from "react";
import { ppgToYield, yieldToPPG } from "../algos/gravity";
import { OlFarve } from "../algos/olfarve";
import { AddFermentable } from "./AddFermentable";
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

export const FermentableRow = ({
  fermentable,
  editing,
  onEdit,
  onEditSave,
  onEditCancel,
  onChange,
  onDelete,
}: {
  fermentable: BeerJSON.FermentableAdditionType;
  editing: boolean;
  onEdit: () => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onChange: (v: any) => void;
  onDelete: () => void;
}) => (
  <tr>
    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
      <div className="flex items-center">
        <div className="h-10 w-10 flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={"/Malt_en_grain.JPG"}
            alt=""
          />
        </div>
        <div className="ml-4">
          <div className="font-medium text-gray-900">{fermentable.name}</div>
          <div className="text-gray-500">{fermentable.producer}</div>
        </div>
      </div>
    </td>
    <td className="whitespace-nowrap px-3 py-4 text-2xl">
      <div className="w-24 h-8">
        {editing ? (
          <NumericEdit
            label="yield"
            initialValue={yieldToPPG(fermentable.yield)}
            onChange={(value) =>
              onChange({
                yield: {
                  fine_grind: {
                    ...fermentable.yield.fine_grind,
                    value: ppgToYield(value),
                  },
                },
              })
            }
          />
        ) : (
          <>{yieldToPPG(fermentable.yield).toFixed(3)} PPG</>
        )}
      </div>
      <span
        className="inline-flex rounded-full px-2 text-xs leading-5 text-gray-500"
        style={{
          backgroundColor: OlFarve.rgbToHex(
            OlFarve.ebcToSRGB(fermentable.color.value)
          ),
        }}
      >
        {fermentable.color.value} {fermentable.color.unit}
      </span>
    </td>
    <td className="whitespace-nowrap px-3 py-4 text-2xl">
      <div className="w-24 h-8">
        {editing ? (
          <NumericEdit
            label="weight"
            initialValue={fermentable.amount.value}
            onChange={(value) =>
              onChange({
                amount: {
                  ...fermentable.amount,
                  value,
                },
              })
            }
          />
        ) : (
          <>
            {fermentable.amount.value} {fermentable.amount.unit}{" "}
          </>
        )}
      </div>
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        Mash
      </span>
    </td>
    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
      <div className="space-x-2">
        {editing ? (
          <>
            <AnchorButton onClick={onEditSave}>Save</AnchorButton>
            <AnchorButton onClick={onEditCancel}>Cancel</AnchorButton>
          </>
        ) : (
          <>
            <AnchorButton onClick={onEdit}>Edit</AnchorButton>
            <AnchorButton onClick={onDelete}>Delete</AnchorButton>
          </>
        )}
      </div>
    </td>
  </tr>
);

export const Fermentables = ({
  fermentables,
  updateFermentable,
  addFermentable,
  deleteFermentable,
}: {
  fermentables: BeerJSON.FermentableAdditionType[];
  updateFermentable: (
    idx: number,
    fermentable: BeerJSON.FermentableAdditionType
  ) => void;
  addFermentable: (fermentable: BeerJSON.FermentableType) => void;
  deleteFermentable: (idx: number) => void;
}) => {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [restoreValue, setRestoreValue] =
    useState<BeerJSON.FermentableAdditionType | null>(null);

  const onAdd = (fermentable: BeerJSON.FermentableType) => {
    setEditingIdx(fermentables.length);
    addFermentable(fermentable);
  };
  const [addFermentableOpen, setAddFermentableOpen] = useState(false);

  return (
    <>
      <AddFermentable
        onAdd={onAdd}
        open={addFermentableOpen}
        setOpen={setAddFermentableOpen}
      />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Fermentables
            </h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              onClick={() => setAddFermentableOpen(true)}
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
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Addition
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
                    {fermentables.map((fermentable, idx) => (
                      <FermentableRow
                        fermentable={fermentable}
                        editing={editingIdx === idx}
                        key={idx}
                        onEdit={() => {
                          setRestoreValue({ ...fermentable });
                          setEditingIdx(idx);
                        }}
                        onEditCancel={() => {
                          if (restoreValue) {
                            updateFermentable(idx, restoreValue);
                          }
                          setRestoreValue(null);
                          setEditingIdx(null);
                        }}
                        onEditSave={() => {
                          setRestoreValue(null);
                          setEditingIdx(null);
                        }}
                        onChange={(v) => {
                          updateFermentable(idx, { ...fermentable, ...v });
                        }}
                        onDelete={() => deleteFermentable(idx)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
