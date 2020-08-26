import React, {useEffect, useState} from "react";
import {Box, Stack, Spinner} from "@chakra-ui/core";
import {BusinessCard} from "../businessCard/BusinessCard";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DropZone} from "../dropzone/DropZone";

const axios = require("axios");

export function Feed() {
    const [requestMade, setRequestMade] = useState(false);
    const [businesses, setBusinesses] = useState();
    const [hiddenBusinesses, setHiddenBusinesses] = useState([]);
    const [hiddenCategories, setHiddenCategories] = useState([]);
    const [locationError, setLocationError] = useState("");
    /*  Puts the business currently displayed to the user into the hiddenBusinesses array
        and each of its categories into the hiddenCategories map.
     */
    const lessCallback = () => {
        let business = businesses[0];
        let categoryTitles = business.categories.map((elem) => elem.title);
        let newCategories = hiddenCategories;
        let matches = businesses.filter((elem) => {
            for (let category of elem.categories) {
                if (categoryTitles.includes(category.title)) {
                    return true;
                }
            }
            return false;
        });
        let remainingBusinesses = businesses.filter((elem) => !matches.includes(elem));
        setHiddenBusinesses(hiddenBusinesses.concat(matches));
        setHiddenCategories(hiddenCategories.concat(categoryTitles));
        setBusinesses(remainingBusinesses);
    }
    //  Places all businesses of the same categories to the front of the businesses array.
    const moreCallback = () => {
        console.log('businesses: ', businesses);
    }

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

    return business ?
        (
            <Stack justifyContent="center" alignItems="center" isInline={true} spacing={20}>
                <DndProvider backend={HTML5Backend}>
                    <DropZone color="red.200" text="Less like this" onDrop={lessCallback}/>
                    <Box
                        as="a"
                        href={business.url}
                        bg="gray.100"
                        rounded="10px"
                    >
                        <BusinessCard business={business} />
                    </Box>
                    <DropZone color="green.200" text="More like this" onDrop={moreCallback}/>
                </DndProvider>
            </Stack>
        )
        :
        <Spinner />
}
