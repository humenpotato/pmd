import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface ConfigListItem {
    // Sheet_ID: string;
    // Range: string;
    // Dashboard_Name: string;
    // Department: string;
    // Section: string;
    Dashboard_Path: string;
    label?: string;
    href: string;

}

export function BasicCards(props: ConfigListItem[]) {
    return (
        <Box>
            {props?.map((eachItem, index) => (
                <Card sx={{ minWidth: 275 }} key={index}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {JSON.stringify(eachItem)}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}
