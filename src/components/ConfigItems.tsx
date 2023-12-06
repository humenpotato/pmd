import {useEffect, useState} from "react";
import {GetConfigInfo} from "../Services/GoogleAPIs/Sheets";
import * as React from "react";
import {Card} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const ConfigItems = () => {
    const [Data, setData] = useState<[]>([]);

    useEffect(() => {
        (async () => {
            const Data = await GetConfigInfo();
            setData(Data);
        })()
    }, []);

    return (
        <Box>
            {Data.map(eachItem => (
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {JSON.stringify(eachItem)}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    )

}