import React, {useEffect, useRef, useState} from "react";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";
import {_get_PMD_Engineered_Data, EngineeredEncoder, GetDataFromSheet} from "../Services/GoogleAPIs/Sheets";
import {User}  from "../Services/UserAuth";
import {useNavigate} from "react-router-dom";
import {Paper} from "@mui/material";
import {SkeletonAnimations} from "./Skeleton"

export const RenderDataTable = (props: any) => {

    const navigate = useNavigate();
    const [Data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const user : any = User();

    console.log("RenderDataTable", props)

    useEffect(() => {
        if (!user) {
            navigate("/signin")
        } else {
            (async () => {
                const Data = await GetDataFromSheet(props.props);
                setData(Data);
            })()
        }
    }, []);

    console.log(Data);

    useEffect(() => {
        if (Data.length === 0){
            return
        }
        let CoulmnInfo: any[] = []
        const [Headers, ...body] = Data;
    console.log(Headers)
        for (let index = 0; index<Headers.length;index++){
            if (index < Number(props.props.DisplayNColumn)) {
                CoulmnInfo.push({ "title": Headers[index].toString(), "data": index })
            }
        }

        console.log(CoulmnInfo)
        let table = $(`#${props.props.Dashboard_Path}`).DataTable({
            data: body,
            destroy: true,
            paging: true,
            autoWidth: true,
            "dom": "Rfrtip",
            stateSave: true,
            pageLength: 500,
            columns:  CoulmnInfo,
        });

        console.log(table)

        setLoading(false)

        return () => {
            table.destroy();
        };
    }, [Data]);

    return (
        loading ?
            <SkeletonAnimations /> :
            <Paper elevation={3} sx={{padding: "10px"}}>
                <table className="display table-striped" width="100%" id={props.props.Dashboard_Path}/>
            </Paper>
    )
}