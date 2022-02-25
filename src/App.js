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
import { sortData } from './utils/sort';
import Map from './Components/Map';
import 'leaflet/dist/leaflet.css';
import LineGraph from './Components/LineGraph';

function App() {
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const bg = useColorModeValue('whiteAlpha.500', 'whiteAlpha.200');
  const all = 'Worldwide';
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  const tableData = sortData(
    countries.filter((country) => country.name != all)
  );
  const getCountries = async () => {
    await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        setCountries([
          { name: all },
          ...data.map((country) => ({
            name: country.country,
            cases: country.cases,
          })),
        ]);
        setMapCountries(data);
      });
  };
  useEffect(getCountries, []);
  const getCountry = async () => {
    await fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) =>
        setCountry({
          name: all,
          cases: data.cases,
          recovered: data.recovered,
          deaths: data.deaths,
        })
      );
  };
  useEffect(getCountry, []);
  const onCountryClick = async (e) => {
    const clickedCountry = e.target.value;
    const allParam = clickedCountry === all;
    await fetch(
      allParam
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${clickedCountry}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCountry({
          name: allParam ? all : data.country,
          cases: data.cases,
          recovered: data.recovered,
          deaths: data.deaths,
        });
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
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
                <MenuItem
                  key={country.name}
                  value={country.name}
                  onClick={onCountryClick}
                >
                  {country.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <ColorModeSwitch />

          <Flex />
          <Flex>
            <Button variant='ghost' onClick={(e) => setCasesType('cases')}>
              {country.cases}
            </Button>
            <Button variant='ghost' onClick={(e) => setCasesType('recovered')}>
              {country.recovered}
            </Button>
            <Button variant='ghost' onClick={(e) => setCasesType('deaths')}>
              {country.deaths}
            </Button>
          </Flex>

          {/* <Flex borderRadius='lg' mb={6} p={3} textAlign='center' bg={bg}> */}

          {/* </Flex> */}
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
              <Tbody /* overflow='scroll' height='400px' */>
                {tableData.map((country) => (
                  <Tr key={country.name}>
                    <Td>{country.name}</Td>
                    <Td>{country.cases}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
          <Flex>
            <Text fontSize='2xl'>Worldwide New Cases</Text>
            <Flex borderRadius='lg' mb={6} p={3} textAlign='center' bg={bg}>
              GRAPH <LineGraph casesType={casesType} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Map
        countries={mapCountries}
        casesType={casesType}
        center={mapCenter}
        zoom={mapZoom}
      />
    </>
  );
}

export default App;
