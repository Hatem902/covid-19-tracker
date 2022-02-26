import React from 'react';
import { Button, Text, VStack, Box } from '@chakra-ui/react';
import { prettyPrintStat } from '../utils/dataOnMap';
const InfoButton = ({ casesType, color, setCasesType, todayCases, cases }) => {
  return (
    <Button
      py={16}
      variant='ghost'
      onClick={(e) => setCasesType(casesType)}
      borderRadius='md'
      borderWidth='1px'
      boxShadow='md'
      bg='#FFFFFF'
      pr={16}
    >
      <Box mr='16' bg={color} borderRadius='md' w='8px' height='110px'></Box>
      <VStack>
        <Text fontSize='lg' color='#319795' fontWeight='600'>
          Coronavirus cases
        </Text>
        <Text fontSize='4xl' color={color} fontWeight='600'>
          +{prettyPrintStat(todayCases)}
        </Text>
        <Text pt='6px' fontSize='sm' color='#285E61' fontWeight='700'>
          {prettyPrintStat(cases)} Total
        </Text>
      </VStack>
    </Button>
  );
};

export default InfoButton;
