import React, { FC, useEffect, useState } from "react";
import { createData, getDetails, getHeader } from "../api/apiList";
import ScreenLoader from "../common/Loader/ScreenLoader";

interface IProp {
  setNewRecordHandler: (flag: boolean) => void;
}

const NewRecord: FC<IProp> = ({ setNewRecordHandler }) => {
  const [loader, setLoader] = useState<boolean>(false);

  async function submitHandler(event: any) {
    event.preventDefault();
    const data = {
      header_table: {
        vr_no: parseInt(event.target.vr_no.value || 0),
        vr_date: event.target.vr_date.value,
        ac_name: event.target.ac_name.value,
        ac_amt: parseInt(event.target.ac_amt.value || 0),
        status: event.target.status.value,
      },
      detail_table: [
        {
          vr_no: parseInt(event.target.vr_no.value || 0),
          sr_no: parseInt(event.target.sr_no.value || 0),
          item_code: parseInt(event.target.item_code.value || 0),
          item_name: event.target.item_name.value,
          description: "",
          qty: parseInt(event.target.qty.value || 0),
          rate: parseInt(event.target.rate.value || 0),
        },
      ],
    };
    setLoader(true);
    await createData(data);
    setLoader(false);
    setNewRecordHandler(false);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col">
        {loader && <ScreenLoader />}
        <div>
          <div className="w-full text-center bg-yellow-500 ">Header</div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="vr_no"
              >
                Vr No
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="vr_no"
                type="number"
                name="vr_no"
              />
            </div>
            <div className="w-full md:w-1/3 px-3">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="vr_date"
              >
                Vr Date
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="vr_date"
                type="date"
                name="vr_date"
              />
            </div>
            <div className="w-full md:w-1/3 px-3">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="status"
              >
                Status
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="status"
                name="status"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-1/2 px-3">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="ac_name"
              >
                Ac Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="ac_name"
                name="ac_name"
              />
            </div>
            <div className="w-1/2 px-3">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="ac_amt"
              >
                Ac Amt
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="ac_amt"
                name="ac_amt"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="w-full text-center bg-yellow-500 ">Detail</div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="sr_no"
              >
                Sr NO
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="sr_no"
                name="sr_no"
                type="number"
              />
            </div>
            <div className="w-full md:w-1/3 px-3">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="item_code"
              >
                Item Code
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="item_code"
                name="item_code"
                type="number"
              />
            </div>
            <div className="w-full md:w-1/3 px-3">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="item_name"
              >
                Item Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="item_name"
                name="item_name"
              />
            </div>
            <div className="w-full md:w-1/3 px-3">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="qty"
              >
                Qty
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="qty"
                name="qty"
                type="number"
              />
            </div>
            <div className="w-full md:w-1/3 px-3">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="rate"
              >
                Rate
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="rate"
                name="rate"
                type="number"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="border py-1.5 px-8 my-1 hover:bg-blue-500 fixed"
          type="submit"
        >
          create
        </button>
      </div>
    </form>
  );
};

export default NewRecord;
