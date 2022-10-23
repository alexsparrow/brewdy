import { useState } from "react";
import { ppgToYield, yieldToPPG } from "../algos/gravity";
import { OlFarve } from "../algos/olfarve";
import { AddIngredient, Addition, Ingredient } from "./AddIngredient";
import { AnchorButton } from "./AnchorButton";

type DetailsProps<A extends Addition> = {
  item: A;
  editing: boolean;
  onChange: (v: any) => void;
};

export const FermentableDetails = ({
  item: fermentable,
  editing,
  onChange,
}: DetailsProps<BeerJSON.FermentableAdditionType>) => (
  <>
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
  </>
);

export const HopDetails = ({
  item,
  editing,
  onChange,
}: DetailsProps<BeerJSON.HopAdditionType>) => (
  <>
    <div className="w-24 h-8">
      {editing ? (
        <NumericEdit
          label="weight"
          initialValue={item.alpha_acid.value}
          onChange={(value) =>
            onChange({
              alpha_acid: {
                ...item.alpha_acid,
                value,
              },
            })
          }
        />
      ) : (
        <>{item.alpha_acid.value} %</>
      )}
    </div>
    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
      @ {item.timing.time?.value} {item.timing.time?.unit}
    </span>
  </>
);

export const CultureDetails = ({
  item,
  editing,
  onChange,
}: DetailsProps<BeerJSON.CultureAdditionType>) => (
  <>
    <div className="w-24 h-8">
      {editing ? (
        <NumericEdit
          label="weight"
          initialValue={item.attenuation!.value}
          onChange={(value) =>
            onChange({
              alpha_acid: {
                ...item.attenuation,
                value,
              },
            })
          }
        />
      ) : (
        <>{item.attenuation!.value} %</>
      )}
    </div>
  </>
);

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

export const Row = <A extends Addition>({
  item,
  image,
  editing,
  onEdit,
  onEditSave,
  onEditCancel,
  onChange,
  onDelete,
  Details,
}: {
  item: A;
  image: string;
  editing: boolean;
  onEdit: () => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onChange: (v: any) => void;
  onDelete: () => void;
  Details: React.ComponentType<DetailsProps<A>>;
}) => (
  <tr>
    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
      <div className="flex items-center">
        <div className="h-10 w-10 flex-shrink-0">
          <img className="h-10 w-10 rounded-full" src={image} alt="" />
        </div>
        <div className="ml-4">
          <div className="font-medium text-gray-900">{item.name}</div>
          <div className="text-gray-500">{item.producer}</div>
        </div>
      </div>
    </td>
    <td className="whitespace-nowrap px-3 py-4 text-2xl">
      <Details item={item} editing={editing} onChange={onChange} />
    </td>
    <td className="whitespace-nowrap px-3 py-4 text-2xl">
      <div className="w-24 h-8">
        {editing ? (
          <NumericEdit
            label="weight"
            initialValue={item.amount?.value || 0}
            onChange={(value) =>
              onChange({
                amount: {
                  ...item.amount,
                  value,
                },
              })
            }
          />
        ) : (
          <>
            {item.amount?.value} {item.amount?.unit}
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

export const IngredientTable = <A extends Addition, I extends Ingredient>({
  ingredients,
  title,
  items,
  image,
  update,
  add,
  delete_,
  Details,
}: {
  ingredients: I[];
  title: string;
  items: A[];
  image: string;
  update: (idx: number, item: A) => void;
  add: (item: I) => void;
  delete_: (idx: number) => void;
  Details: React.ComponentType<DetailsProps<A>>;
}) => {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [restoreValue, setRestoreValue] = useState<A | null>(null);

  const onAdd = (item: I) => {
    setEditingIdx(items.length);
    add(item);
  };
  const [addOpen, setAddOpen] = useState(false);

  return (
    <>
      <AddIngredient
        ingredients={ingredients}
        onAdd={onAdd}
        open={addOpen}
        setOpen={setAddOpen}
      />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              onClick={() => setAddOpen(true)}
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
                    {items.map((item, idx) => (
                      <Row
                        image={image}
                        item={item}
                        editing={editingIdx === idx}
                        key={idx}
                        onEdit={() => {
                          setRestoreValue({ ...item });
                          setEditingIdx(idx);
                        }}
                        onEditCancel={() => {
                          if (restoreValue) {
                            update(idx, restoreValue);
                          }
                          setRestoreValue(null);
                          setEditingIdx(null);
                        }}
                        onEditSave={() => {
                          setRestoreValue(null);
                          setEditingIdx(null);
                        }}
                        onChange={(v) => {
                          update(idx, { ...item, ...v });
                        }}
                        onDelete={() => delete_(idx)}
                        Details={Details}
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
