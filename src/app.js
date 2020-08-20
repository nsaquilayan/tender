import React from "react";
import {TopBar} from "./components/topBar/TopBar";
import {Feed} from "./components/feed/Feed";
import {Description} from "./components/description/Description";
import {Box} from "@chakra-ui/core";

export function App() {
    return (
        <Box>
            <TopBar />
            <Description />
            <Feed />
        </Box>
    );
}