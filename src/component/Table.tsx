import React, { FC, useEffect, useState } from "react";
import { getDetails, getHeader } from "../api/apiList";
import ScreenLoader from "../common/Loader/ScreenLoader";
import NewRecord from "./NewRecord";

interface IHead {
  vr_no: number;
  vr_date: string;
  ac_name: string;
  ac_amt: number;
  status: string;
}

interface IDetail {
  vr_no: number;
  sr_no: number;
  item_code: string;
  item_name: string;
  description: string;
  qty: number;
  rate: number;
}

interface IProp {
  setNewRecordHandler: (flag: boolean) => void;
}
const Table: FC<IProp> = ({setNewRecordHandler}) => {
  const [index, setIndex] = useState<number>();
  const [headers, setHeaders] = useState<IHead[]>([]);
  const [details, setDetails] = useState<IDetail[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [newRecord, setNewRecord] = useState<boolean>(false);
  const [selectHeader, setSelectHeader] = useState<IHead>({
    vr_no: 0,
    vr_date: "",
    ac_name: "",
    ac_amt: 0,
    status: "",
  });

  const header: string[] = ["vr_no", "vr_date", "ac_name", "ac_amt", "status"];
  const detail: string[] = [
    "vr_no",
    "sr_no",
    "item_code",
    "item_name",
    "description",
    "qty",
    "rate",
  ];

  useEffect(() => {
    async function callAPI() {
      setLoader(true);
      const headerResponse = await getHeader();
      const detailsResponse = await getDetails();
      setLoader(false);
      if (headerResponse.status === 200) {
        const headerResult = await headerResponse.json();
        setHeaders(headerResult);
      }
      if (detailsResponse.status === 200) {
        const detailsResult = await detailsResponse.json();
        setDetails(detailsResult);
      }
    }
    try {
      callAPI();
    } catch {}
  }, []);

  function headerHandler(vr_no: number, index: number) {
    setIndex(index);
    const foundElement = headers.find((head: IHead) => head.vr_no === vr_no);
    if (foundElement) {
      setSelectHeader(foundElement);
    }
  }

  return (
    <div>
      {loader && <ScreenLoader />}
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <div className="flex">
                <div className="flex-auto">
                  <table className="min-w-full text-center text-sm font-light">
                    <thead>
                      <tr>
                        <th>
                          <table className="min-w-full text-center text-sm font-light">
                            <thead>
                              <tr className="border-b dark:border-neutral-500">
                                <th
                                  className="whitespace-nowrap  px-6 py-4 font-medium bg-blue-400"
                                  colSpan={5}
                                >
                                  Header
                                </th>
                              </tr>
                              <tr className="border-b dark:border-neutral-500">
                                {header.map((header: string, index: number) => (
                                  <th
                                    className="whitespace-nowrap font-bold  px-6 py-4 "
                                    key={index}
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b dark:border-neutral-500 ">
                                <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                  {selectHeader.vr_no}
                                </td>
                                <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                  {selectHeader.vr_date}
                                </td>
                                <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                  {selectHeader.ac_name}
                                </td>
                                <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                  {selectHeader.ac_amt}
                                </td>
                                <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                  {selectHeader.status}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>
                          <table className="min-w-full text-center text-sm font-light">
                            <thead>
                              <tr className="border-b dark:border-neutral-500">
                                <th
                                  className="whitespace-nowrap  px-6 py-4 font-medium bg-blue-400"
                                  colSpan={7}
                                >
                                  Detail
                                </th>
                              </tr>
                              <tr className="border-b dark:border-neutral-500">
                                {detail.map((detail: string, index: number) => (
                                  <th
                                    className="whitespace-nowrap font-bold  px-6 py-4 "
                                    key={index}
                                  >
                                    {detail}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {details.map((data: IDetail, ndx: number) => (
                                <tr
                                  className={`border-b dark:border-neutral-500 hover:bg-green-300 ${
                                    index === ndx ? "bg-green-300" : ""
                                  }`}
                                  key={ndx}
                                  onClick={() => headerHandler(data.vr_no, ndx)}
                                >
                                  <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                    {data.vr_no}
                                  </td>
                                  <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                    {data.sr_no}
                                  </td>
                                  <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                    {data.item_code}
                                  </td>
                                  <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                    {data.item_name}
                                  </td>
                                  <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                    {data.description}
                                  </td>
                                  <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                    {data.qty}
                                  </td>
                                  <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                    {data.rate}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-col pl-2">
                  <button
                    className="border py-1.5 px-8 my-1 hover:bg-blue-500 fixed"
                    onClick={() => setNewRecordHandler(true)}
                  >
                    create
                  </button>
                  <button
                    className="border py-1.5 px-8 my-1 hover:bg-blue-500 fixed top-24"
                    onClick={() => window.print()}
                  >
                    print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
