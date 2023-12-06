import React, {useEffect, useRef, useState} from "react";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";
import { _get_PMD_Engineered_Data, EngineeredEncoder } from "../Services/GoogleAPIs/Sheets";
import {User}  from "../Services/UserAuth";
import {useNavigate} from "react-router-dom";

const DashboardOld = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState<any>([]);
  const tableName = "engineered"
  const user : any = User();

  useEffect(() => {
    if (!user) {
      navigate("/signin")
    } else {
      (async () => {
        const Data = await _get_PMD_Engineered_Data();
        setData(Data);
      })()
    }
  }, []);

  console.log(Data);

  useEffect(() => {
    let table = $(`#${tableName}`).DataTable({
      data: Data,
      destroy: true,
      paging: true,
      autoWidth: true,
      "dom": "Rlfrtip",
      stateSave: true,
      pageLength: 50,
      columns: [
        { title: "Sl. No.", data: "SlNo" },
        { title: "Part Number", data: "PartNumber" },
        { title: "Name", data: "Name" },
        { title: "Part Description", data: "PartDescription" },
        // { title: "Revision", data: "Revision" },
        // { title: "Drawing", data: "Drawing" },
        // { title: "2D CAD", data: "_2DCAD" },
        // { title: "3D CAD", data: "_3DCAD" },
        // { title: "Material", data: "Material" },
        // { title: "Process", data: "Process" },
        // { title: "Finish", data: "Finish" },
        // { title: "Cost", data: "Cost" },
        // { title: "Supplier", data: "Supplier" },
        // { title: "RoHS", data: "RoHS" },
        // { title: "ISO 13485", data: "ISO13485" },
        // { title: "Is Traceable?", data: "IsTraceable" },
        // { title: "InDemand", data: "InDemand" },
        // { title: "In Order", data: "InOrder" },
        // { title: "InStock", data: "InStock" },
      ]
    });

    return () => {
      table.destroy();
    };
  }, [Data]);

  return (
      <div>
        <table className="display table-striped" width="100%" id={tableName} />
      </div>
  )
};

export default DashboardOld;
