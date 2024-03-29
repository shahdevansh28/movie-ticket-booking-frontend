import { Container, Typography } from "@mui/material";
import React from "react";

export default function Loader({show}){
    return show && (
        <>
            <Container>
                <Typography variant="h6">We are proceesing...Thank you for your time</Typography>
            </Container>
        </>
    )
}