import React from "react";
import {Text, Box, Link} from "@chakra-ui/core";

export function Description() {
    return (
        <Box fontSize="20px" textAlign="center" maxWidth="1200px" my="75px" mx="auto">
            <Text>
                Filter through nearby food places by liking or blacklisting categories of food.
            </Text>
            <Link href="https://www.yelp.com/fusion">Data courtesy of Yelp Fusion</Link>.
        </Box>
    )
}