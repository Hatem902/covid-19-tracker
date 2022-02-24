import {
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useColorModeValue,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import './App.css';
import ColorModeSwitch from './Components/ColorSwitchMode';
import { useEffect, useState } from 'react';

function App() {
  const bg = useColorModeValue('whiteAlpha.500', 'whiteAlpha.200');
  const all = 'Worldwide';
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState([]);
  const getCountries = async () => {
    await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) =>
        setCountries([{ name: all }, ...data.map((country) => ({ name: country.country, cases: country.cases }))])
      );
  };
  useEffect(getCountries, []);
  const getCountry = async () => {
    await fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => setCountry({ name: all, cases: data.cases, recovered: data.recovered, deaths: data.deaths }));
  };
  useEffect(getCountry, []);
  const onCountryClick = async (e) => {
    const clickedCountry = e.target.value;
    const allParam = clickedCountry === all;
    await fetch(
      allParam ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${clickedCountry}`
    )
      .then((response) => response.json())
      .then((data) =>
        setCountry({
          name: allParam ? all : data.country,
          cases: data.cases,
          recovered: data.recovered,
          deaths: data.deaths,
        })
      );
  };

  return (
    <>
      <Flex>
        <Flex>
          <Heading>Covid 19 tracker</Heading>
          <Menu>
            <MenuButton
              px={4}
              py={2}
              transition='all 0.2s'
              borderRadius='md'
              borderWidth='1px'
              _hover={{ bg: 'gray.400' }}
              _expanded={{ bg: 'blue.400' }}
              _focus={{ boxShadow: 'outline' }}
            >
              {country.name} <ChevronDownIcon />
            </MenuButton>
            <MenuList overflow='scroll' height='400px'>
              {countries.map((country) => (
                <MenuItem key={country.name} value={country.name} onClick={onCountryClick}>
                  {country.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <ColorModeSwitch />

          <Flex />
          <Flex>
            <Button variant='ghost'>{country.cases}</Button>
            <Button variant='ghost'>{country.recovered}</Button>
            <Button variant='ghost'>{country.deaths}</Button>
          </Flex>

          <Flex borderRadius='lg' mb={6} p={3} textAlign='center' bg={bg}>
            GEO MAP
          </Flex>
        </Flex>
        <Flex>
          <Flex>
            <Table variant='striped' colorScheme='teal'>
              <TableCaption>Live Cases By Country</TableCaption>
              <Thead>
                <Tr>
                  <Th>Country</Th>

                  <Th isNumeric>Live Cases</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimeters (mm)</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                  <Td>feet</Td>
                  <Td>centimeters (cm)</Td>
                  <Td isNumeric>30.48</Td>
                </Tr>
                <Tr>
                  <Td>yards</Td>
                  <Td>metres (m)</Td>
                  <Td isNumeric>0.91444</Td>
                </Tr>
              </Tbody>
            </Table>
          </Flex>
          <Flex>
            <Text fontSize='2xl'>Worldwide New Cases</Text>
            <Flex borderRadius='lg' mb={6} p={3} textAlign='center' bg={bg}>
              GRAPH
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default App;
