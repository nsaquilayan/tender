import React, {useEffect, useState} from "react";
import {Box, Stack, Spinner, Button, Image, PseudoBox} from "@chakra-ui/core";
import {BusinessCard} from "../businessCard/BusinessCard";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const axios = require("axios");

export function Feed() {
    const [requestMade, setRequestMade] = useState(false);
    const [businesses, setBusinesses] = useState();
    const [locationError, setLocationError] = useState("");

    useEffect(() => {
        const fetchData = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                //fetch businesses
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
            <Stack justifyContent="center" alignItems="center" isInline={true} spacing={20}>
                <Button variantColor="red">
                    Less like this
                </Button>
                {business ?
                    <Box
                        as="a"
                        href={business.url}
                        bg="gray.100"
                        rounded="10px"
                    >
                        <DndProvider backend={HTML5Backend}>
                            <BusinessCard business={business} />
                        </DndProvider>
                    </Box>
                    :
                    <Spinner />
                }
                <Button variantColor="green">
                    More like this
                </Button>
            </Stack>
    )
}
