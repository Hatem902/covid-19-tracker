import React from 'react';
import { Button, Text, VStack, Box, Spacer } from '@chakra-ui/react';
import { prettyPrintStat } from '../utils/dataOnMap';
const InfoButton = ({
  casesType,
  color,
  setCasesType,
  todayData,
  data,
  text,
  borderTop,
}) => {
  return (
    <Button
      height='140px'
      variant='ghost'
      onClick={(e) => setCasesType(casesType)}
      borderRadius='md'
      borderWidth='1px'
      boxShadow={borderTop ? 'xl' : 'md'}
      bg='#FFFFFF'
      isFullWidth='300px'
      maxW='300px'
    >
      <Box
        bg={borderTop ? color : 'transparent'}
        borderRadius='md'
        w='8.2px'
        height='114px'
        justifyContent='start'
      ></Box>
      <Spacer />
      <VStack>
        <Text pt='10px' fontSize='lg' color='#319795' fontWeight='600'>
          {text}
        </Text>
        <Text fontSize='4xl' color={color} fontWeight='600'>
          {prettyPrintStat(data)}
        </Text>
        <Text pt='6px' fontSize='sm' color='#285E61' fontWeight='700'>
          +{prettyPrintStat(todayData)} Today
        </Text>
      </VStack>
      <Spacer />
    </Button>
  );
};

export default InfoButton;
