import React, {useEffect, useState} from "react";
import {Box, Stack, Spinner} from "@chakra-ui/core";
import {BusinessCard} from "../businessCard/BusinessCard";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DropZone} from "../dropzone/DropZone";

const axios = require("axios");

export function Feed() {
    const [requestMade, setRequestMade] = useState(false);
    const [businesses, setBusinesses] = useState([]);
    const [hiddenBusinesses, setHiddenBusinesses] = useState([]);
    const [hiddenCategories, setHiddenCategories] = useState([]);
    const [locationError, setLocationError] = useState("");
    // Filter function that returns the businesses that have categories in categoryTitles
    const containsCategory = (elem, categoryTitles) => {
        for (let category of elem.categories) {
            if (categoryTitles.includes(category.title)) {
                return true;
            }
        }
        return false;
    }
    /*  Puts the business currently displayed to the user into the hiddenBusinesses array
        and each of its categories into the hiddenCategories map.
     */
    const lessCallback = () => {
        let business = businesses[0];
        let categoryTitles = business.categories.map((elem) => elem.title);
        let matches = businesses.filter((elem) => containsCategory(elem, categoryTitles));
        let remainingBusinesses = businesses.filter((elem) => !matches.includes(elem));
        setHiddenBusinesses(hiddenBusinesses.concat(matches));
        setHiddenCategories(hiddenCategories.concat(categoryTitles));
        setBusinesses(remainingBusinesses);
    }
    //  Places all businesses of the same categories to the front of the businesses array.
    const moreCallback = () => {
        let business = businesses[0];
        let categoryTitles = business.categories.map((elem) => elem.title);
        let matches = businesses.slice(1).filter((elem) => containsCategory(elem, categoryTitles));
        //matches = matches.concat(hiddenBusinesses.filter((elem) => containsCategory(elem, categoryTitles)));
        let remaining = businesses.slice(1).filter((elem) => !matches.includes(elem));
        setBusinesses(matches.concat(remaining));
    }
    // Remove the current business being displayed.
    const skipCallback = () => {
        setBusinesses(businesses.slice(1));
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
                });
            }, (error) => {
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

    if (businesses.length === 1 && requestMade) {
        return (
            <Stack>
                <Box textAlign="center">
                    No more businesses remaining, here is the last one available.
                </Box>
                <DndProvider backend={HTML5Backend}>
                    <Box
                        as="a"
                        href={business.url}
                        bg="gray.100"
                        rounded="10px"
                    >
                        <BusinessCard business={business} />
                    </Box>
                </DndProvider>
            </Stack>
        );
    }

    return business ?
        (
            <Stack justifyContent="center" alignItems="center">
                <Box>Remaining: {businesses.length}</Box>
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
                        <Stack>
                            <DropZone color="green.200" text="More like this" onDrop={moreCallback}/>
                            <DropZone color="gray.200" text="Skip" onDrop={skipCallback}/>
                        </Stack>
                    </DndProvider>
                </Stack>
            </Stack>
        )
        :
        <Spinner />
}
