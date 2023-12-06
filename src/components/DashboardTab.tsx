import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import { Tabs } from '@mui/base/Tabs';
// import {Tab, TabsList, TabPanel} from '../Styles/DashboardStyles'
import DashboardOld from './DashboardOld'
// import SpeedDailNavigation from "./SpeedDail";
import Box from '@mui/material/Box';
// import {Configure} from "./Configure";
// import {_get_PMD_Engineered_Data, GetConfigInfo} from "../Services/GoogleAPIs/Sheets";
// import {useEffect, useState} from "react";
import {ConfigItems} from "./ConfigItems";
import {useEffect, useState} from "react";
import {GetConfigInfo} from "../Services/GoogleAPIs/Sheets";
import {Card} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface ConfigListItem {
    Sheet_ID: string;
    Range: string;
    Dashboard_Name: string;
    Department: string;
    Section: string;
    Value: number;
}

export const DashboardTabs = () => {
    const [ConfigList, setData] = useState<ConfigListItem[]>([]);

    useEffect(() => {
        // (async () => {
        //     const Data = await GetConfigInfo();
        //     setData(Data);
        // })()
        setData(JSON.parse(`[{"Sheet_ID": "1_u95ycKX2f4cEjEpoU8wXOjGWHVTUyTZqhy2ooZvwwc","Range": "Engineered!A2:S","Dashboard_Name": "Engineered","Department": "Design & Mechanical","Section": "Part Master Database"},{"Sheet_ID": "1_u95ycKX2f4cEjEpoU8wXOjGWHVTUyTZqhy2ooZvwwc","Range": "COTS!A2:N","Dashboard_Name": "COTS","Department": "Design & Mechanical","Section": "Part Master Database"},{"Sheet_ID": "1_u95ycKX2f4cEjEpoU8wXOjGWHVTUyTZqhy2ooZvwwc","Range": "BOM Sheets!A:I","Dashboard_Name": "BOM Sheets","Department": "Design & Mechanical","Section": "Part Master Database"},{"Sheet_ID": "1_u95ycKX2f4cEjEpoU8wXOjGWHVTUyTZqhy2ooZvwwc","Range": "Orders!E:V","Dashboard_Name": "Orders","Department": "Design & Mechanical","Section": "Part Master Database"}]`))
    }, []);
console.log(ConfigList)
    return (
            <Box>
                <Tabs>
                {/*<Tabs defaultValue={0}>*/}
                    {/*<TabsList>*/}
                    {/*    <Tab value={0}>Configure</Tab>*/}
                    {/*    <Tab value={1}>Engineered</Tab>*/}
                    {/*    <Tab value={2}>Profile</Tab>*/}
                    {/*    <Tab value={3}>Language</Tab>*/}
                    {/*</TabsList>*/}
                    {/*<TabPanel value={0} key="0"> <ConfigItems /></TabPanel>*/}
                    {/*<TabPanel value={1} key="1"><DashboardOld/></TabPanel>*/}
                    {/*<TabPanel value={2} key="2">Profile page</TabPanel>*/}
                    {/*<TabPanel value={3} key="3">Language page</TabPanel>*/}
                    {/*{ConfigList.map(eachItem => (*/}
                    {/*    <Tab value={eachItem.Value}>EachItem Dashboard_Name</Tab>*/}
                    {/*))}*/}
                </Tabs>
            </Box>
    );
}
