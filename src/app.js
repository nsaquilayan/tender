import React from "react";
import {TopBar} from "./components/topBar/topBar";
import {Description} from "./components/description/description";
import {Box} from "@chakra-ui/core";

export function App() {
    return (
        <Box>
            <TopBar />
            <Description />
        </Box>
    );
}