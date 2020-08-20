import React from "react";
import {Link, Flex, Text, Box, Button, Stack} from "@chakra-ui/core";
import {FaGithub, FaYelp} from "react-icons/fa/index";

export function TopBar () {
    return (
        <Box mt={"10px"} mx={"10px"}  maxWidth={"1200px"} mx={"auto"}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Text fontFamily={"Tahoma"} fontSize="30px"> Tender </Text>
                <Box>
                    <Stack isInline={true}>
                        <Button as={Link} href={"https://github.com/nsaquilayan/tender"} leftIcon={FaGithub}>
                            Source
                        </Button>
                        <Button as={Link} href={"https://www.yelp.com/fusion"} variantColor={"red"} leftIcon={FaYelp}>
                            Yelp
                        </Button>
                    </Stack>
                </Box>
            </Flex>
        </Box>
    );
}