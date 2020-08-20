import React from "react";
import {Box, Stack, Button, Image} from "@chakra-ui/core";

export function Feed() {
    return  (
        <Stack justifyContent={"center"} alignItems={"center"} isInline={true}>
            <Button variantColor={"red"}>
                Less like this
            </Button>
            <Image src={"https://bit.ly/3iY5urS"} objectFit={"scale-down"} size={"250px"} />
            <Stack>
                <Box>
                    <Image src={"regular_5.png"} alt={"stars"} />
                </Box>
                <Box>
                    Review(s)
                </Box>
            </Stack>
            <Button variantColor={"green"}>
                More like this
            </Button>
        </Stack>
    )
}