import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useEffect, useState} from "react";
import { useNavigate, useParams  } from "react-router-dom";
import {RenderDataTable} from "./DataTableRender";
import {BasicCards} from "./Cards";
import {GetConfigInfo} from "../Services/GoogleAPIs/Sheets";

function samePageLinkNavigation(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
    if (
        event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
    ) {
        return false;
    }
    return true;
}

export interface ConfigListItem {
    // Sheet_ID: string;
    // Range: string;
    Dashboard_Name: string;
    // Department: string;
    // Section: string;
    Dashboard_Path: string;
    label?: string;
    href: string;

}

function LinkTab(props: ConfigListItem) {
    const navigate = useNavigate();
    return (
        <Tab
            component="a"
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                // Routing libraries handle this, you can remove the onClick handle when using them.
                if (samePageLinkNavigation(event)) {
                    event.preventDefault();
                    navigate(`/dashboard/${props?.Dashboard_Path}`)
                }
            }}
            {...props}
        />
    );
}

export const Dashboard = () => {
    // const { parameter } = useParams();

    const [value, setValue] = React.useState('0');
    const [ConfigList, setData] = useState<ConfigListItem[]>([]);

    useEffect(() => {
        (async () => {
            const Data = await GetConfigInfo();
            setData(Data);
        })()
        // setData(JSON.parse(`[ {"Sheet_ID": "1_u95ycKX2f4cEjEpoU8wXOjGWHVTUyTZqhy2ooZvwwc","Range": "Engineered!A2:S","Dashboard_Name": "Engineered","Department": "Design & Mechanical","Section": "Part Master Database","Dashboard_Path": "engineered","DisplayNColumn": "4" }, {"Sheet_ID": "1_u95ycKX2f4cEjEpoU8wXOjGWHVTUyTZqhy2ooZvwwc","Range": "COTS!A2:N","Dashboard_Name": "COTS","Department": "Design & Mechanical","Section": "Part Master Database","Dashboard_Path": "cots","DisplayNColumn": "5" }, {"Sheet_ID": "1_u95ycKX2f4cEjEpoU8wXOjGWHVTUyTZqhy2ooZvwwc","Range": "BOM Sheets!A:I","Dashboard_Name": "BOM Sheets","Department": "Design & Mechanical","Section": "Part Master Database","Dashboard_Path": "bom_sheets","DisplayNColumn": "2" }, {"Sheet_ID": "1_u95ycKX2f4cEjEpoU8wXOjGWHVTUyTZqhy2ooZvwwc","Range": "Orders!E:V","Dashboard_Name": "Orders","Department": "Design & Mechanical","Section": "Part Master Database","Dashboard_Path": "orders","DisplayNColumn": "6" }
// ]`))
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        if (
            event.type !== 'click' ||
            (event.type === 'click' &&
                samePageLinkNavigation(
                    event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
                ))
        ) {
            setValue(newValue);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} >
                            <Tab key={0} value={"0"} label={"Configuration"} />
                            {ConfigList.map((eachItem, index) => (
                                <Tab key={index + 1} value={(index + 1).toString()} label={eachItem?.Dashboard_Name} />
                            ))}
                        </TabList>
                    </Box>
                    <TabPanel key={0} value={"0"} >{BasicCards(ConfigList)}</TabPanel>
                    {ConfigList.map((eachItem, index) => (
                        <TabPanel key={index + 1} value={(index +1).toString()}>
                            {/*{eachItem.label}*/}
                            <RenderDataTable props={eachItem} />
                        </TabPanel>
                    ))}
                </TabContext>
        </Box>
    );
}
