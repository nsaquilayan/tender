import React from 'react';
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../constants/constants";
import {Box} from "@chakra-ui/core";

export function DropZone(props) {
    const dropCallback = props.onDrop;
    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.BUSINESS,
        drop: dropCallback,
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })

    return (
        <Box textAlign="center" rounded="10px" ref={drop} bg={props.color} fontSize="20px" p="10px" m="100px" position="relative">
            {isOver && (
                <Box
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 1,
                        opacity: 0.5,
                        backgroundColor: 'yellow',
                    }}
                />
            )}
            {props.text}
        </Box>
    );
};