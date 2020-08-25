import React from 'react';
import {useDrag} from "react-dnd";
import {Box, Image, PseudoBox, Stack} from "@chakra-ui/core";
import {ItemTypes, ratingToImage} from "../../constants/constants";

export function BusinessCard(props) {
    const business = props.business;
    const [{isDragging}, drag] = useDrag({
        item: {type: ItemTypes.BUSINESS},
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    });

    return (
        <Box
            p="8px"
            ref={drag}
            style={{
                opacity: isDragging ? 0.3 : 1,
                fontSize: 25,
                cursor: 'move',
            }}
        >
                <PseudoBox
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
                            <Image src={ratingToImage[business.rating]} alt="stars" />
                        </Box>
                        <Image src={business.image_url} objectFit={"scale-down"} size="250px" />
                    </Stack>
                </PseudoBox>
        </Box>
    );
}