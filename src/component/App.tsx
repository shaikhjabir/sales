import React, { useState } from "react";
import Table from "./Table";
import NewRecord from "./NewRecord";

function App() {
  const [newRecord, setNewRecord] = useState<boolean>(false);
  function setNewRecordHandler(flag: boolean) {
    setNewRecord(flag);
  }
  return (
    <div className="container px-11 pt-6">
      {!newRecord && <Table setNewRecordHandler={setNewRecordHandler}/>}
      {newRecord && <NewRecord setNewRecordHandler={setNewRecordHandler}/>}
    </div>
  );
}

export default App;
