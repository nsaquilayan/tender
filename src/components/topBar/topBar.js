import React from "react";
import {Flex, Text, Box, Button, Stack} from "@chakra-ui/core";

export function TopBar () {
    return (
        <Box mt={"10px"} mx={"10px"}  maxWidth={"1200px"} mx={"auto"}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Text fontFamily={"Tahoma"} fontSize="30px"> Tender </Text>
                <Box>
                    <Stack isInline={true}>
                        <Button>
                            Source
                        </Button>
                        <Button>
                            Yelp
                        </Button>
                    </Stack>
                </Box>
            </Flex>
        </Box>
    );
}