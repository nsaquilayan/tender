import React from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Box, Image, PseudoBox, Stack} from "@chakra-ui/core";

export function BusinessCard(props) {
    const business = props.business;
    const ratingImage = props.ratingImage;
    return (
        <DndProvider backend={HTML5Backend}>
            <PseudoBox
                as="a"
                href={business.url}
                _hover={{ bg: "gray.100" }}
                p="8px"
                rounded="10px"
            >
                <Stack alignItems="center">
                    <Box fontSize="20px">
                        <Box>
                            Name: {business.name}
                        </Box>
                        <Box>
                            Categories: {business.categories.map((category) => {
                            return category.title;
                        }).join(", ")}
                        </Box>
                    </Box>
                    <Box>
                        <Image src={ratingImage} alt="stars" />
                    </Box>
                    <Image src={business.image_url} objectFit={"scale-down"} size="250px" />
                </Stack>
            </PseudoBox>
        </DndProvider>
    );
}