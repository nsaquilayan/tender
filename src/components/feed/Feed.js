import React, {useState} from "react";
import {Box, Stack, Spinner, Button, Image} from "@chakra-ui/core";
const axios = require("axios");

export function Feed() {
    const [business, setBusiness] = useState();
    axios.get("http://localhost:3001/", {
        params: {
            latitude: "40.7128",
            longitude: "74.0060"
        }
    }).then((response) => {
        console.log("response: ", response);
    });
    return  (
        <Stack justifyContent={"center"} alignItems={"center"} isInline={true}>
            <Button variantColor={"red"}>
                Less like this
            </Button>
            {business ? (
                <Box>
                    <Image src={"https://bit.ly/3iY5urS"} objectFit={"scale-down"} size={"250px"} />
                    <Stack>
                        <Box>
                            business ? <Image src={"images\regular_0.png"} alt={"stars"} /> : <Box>No data loaded</Box>
                        </Box>
                        <Box>
                            Review(s)
                        </Box>
                    </Stack>
                </Box>
                )
                :
                <Spinner />
            }
            <Button variantColor={"green"}>
                More like this
            </Button>
        </Stack>
    )
}
