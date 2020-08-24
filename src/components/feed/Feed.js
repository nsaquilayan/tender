import React, {useEffect, useState} from "react";
import {Box, Stack, Spinner, Button, Image, PseudoBox} from "@chakra-ui/core";
import regular_0 from "./regular_0@2x.png";
import regular_1 from "./regular_1@2x.png";
import regular_1_half from "./regular_1_half@2x.png";
import regular_2 from "./regular_2@2x.png";
import regular_2_half from "./regular_2_half@2x.png";
import regular_3 from "./regular_3@2x.png";
import regular_3_half from "./regular_3_half@2x.png";
import regular_4 from "./regular_4@2x.png";
import regular_4_half from "./regular_4_half@2x.png";
import regular_5 from "./regular_5@2x.png";
const ratingToImage = {
    0: regular_0,
    1: regular_1,
    1.5: regular_1_half,
    2: regular_2,
    2.5: regular_2_half,
    3: regular_3,
    3.5: regular_3_half,
    4: regular_4,
    4.5: regular_4_half,
    5: regular_5,
};
const axios = require("axios");

export function Feed() {
    const [requestMade, setRequestMade] = useState(false);
    const [businesses, setBusinesses] = useState();
    const [locationError, setLocationError] = useState("");

    useEffect(() => {
        const fetchData = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                // fetch businesses
                if (!requestMade) {
                    axios.get("http://localhost:3001/", {
                        params: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    }).then((response) => {
                        setRequestMade(true);
                        let businessArray = response.data.businesses;
                        if (businessArray) {
                            setBusinesses(businessArray);
                        }
                        console.log("response: ", businessArray);
                    });
                }
            }, (error) => {
                // TODO: handle user not allowing location permission, maybe input lat, lon
                console.log("user denied location permissions: ", error);
                setLocationError("Location permissions required to use the app.");
            });
        }
        if (!requestMade) {
            fetchData();
        }
    }, []);

    if (!requestMade) {
        return (
            <Stack alignItems="center">
                <Spinner />
                <Box>
                    {locationError}
                </Box>
            </Stack>
        );
    }
    const business = businesses && businesses[0];
    return  (
        <Stack justifyContent="center" alignItems="center" isInline={true}>
            <Button variantColor="red">
                Less like this
            </Button>
            {business ? (
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
                                <Image src={ratingToImage[business.rating]} alt="stars" />
                            </Box>
                            <Image src={business.image_url} objectFit={"scale-down"} size="250px" />
                        </Stack>
                </PseudoBox>
                )
                :
                <Spinner />
            }
            <Button variantColor="green">
                More like this
            </Button>
        </Stack>
    )
}
