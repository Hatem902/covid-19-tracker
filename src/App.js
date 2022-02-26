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
  Container,
  Center,
  VStack,
  Box,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import './App.css';
import ColorModeSwitch from './Components/ColorSwitchMode';
import { useEffect, useState } from 'react';
import { sortData } from './utils/sort';
import Map from './Components/Map';
import 'leaflet/dist/leaflet.css';
import LineGraph from './Components/LineGraph';
import { prettyPrintStat } from './utils/dataOnMap';
import InfoButton from './Components/InfoButton';
import { CasesTypeColors } from './utils/casesTypeColors';
import numeral from 'numeral';

function App() {
  const casesTypeColors = CasesTypeColors();
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
          todayCases: data.todayCases,
          todayRecovered: data.todayRecovered,
          todayDeaths: data.todayDeaths,
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
          todayCases: data.todayCases,
          todayRecovered: data.todayRecovered,
          todayDeaths: data.todayDeaths,
          cases: data.cases,
          recovered: data.recovered,
          deaths: data.deaths,
        });
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <Flex
      flexDir={['column', 'column', 'row', 'row']}
      justifyContent='space-evenly'
      p={5}
      bgColor='#E6FFFA'
      height='100vh'
    >
      <Flex flexDir='column' flex='0.9'>
        <Flex
          flexDir='row'
          justifyContent='space-between'
          alignItems='center'
          mb={5}
        >
          <Heading color='#1D4044'>Covid 19 tracker</Heading>
          <Menu>
            <MenuButton
              px={4}
              py={2}
              transition='all 0.2s'
              borderRadius='md'
              borderWidth='1px'
              bg='#FFFFFF'
              _hover={{ bg: 'gray.400' }}
              _expanded={{ bg: 'blue.400' }}
              _focus={{ boxShadow: 'outline' }}
              color='#1D4044'
              fontWeight='500'
            >
              {country.name}
              <ChevronDownIcon ml='4px' />
            </MenuButton>
            <MenuList>
              <Flex flexDir='column' overflow='auto' height='172px'>
                {countries.map((country) => (
                  <MenuItem
                    key={country.name}
                    value={country.name}
                    onClick={onCountryClick}
                    color='#1D4044'
                    fontWeight='400'
                  >
                    {country.name}
                  </MenuItem>
                ))}
              </Flex>
            </MenuList>
          </Menu>
        </Flex>

        <Flex my={1} justifyContent='space-between'>
          <InfoButton
            setCasesType={setCasesType}
            casesType={'cases'}
            color={casesTypeColors['cases'].hex}
            todayData={country.todayCases}
            data={country.cases}
            text={'Coronavirus cases'}
            borderTop={casesType === 'cases'}
          />

          <InfoButton
            setCasesType={setCasesType}
            casesType={'recovered'}
            color={casesTypeColors['recovered'].hex}
            todayData={country.todayRecovered}
            data={country.recovered}
            text={'Recovered'}
            borderTop={casesType === 'recovered'}
          />
          <InfoButton
            setCasesType={setCasesType}
            casesType={'deaths'}
            color={casesTypeColors['deaths'].hex}
            todayData={country.todayDeaths}
            data={country.deaths}
            text={'Deaths'}
            borderTop={casesType === 'deaths'}
          />
        </Flex>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
        {/* <Flex borderRadius='lg' mb='30' p={3} textAlign='center' bg={bg}> */}

        {/* </Flex> */}
      </Flex>
      {/* <Center> */}
      <Flex
        flexDir='column'
        w={['null', 'null', '300px', '300px']}
        alignItems='center'
        mt={['30px', '30px', '0px', '0px']}
      >
        <Flex overflow='auto' height='480px' mb='1'>
          <Table variant='striped' colorScheme='teal' size='sm'>
            <TableCaption color='#1D4044'>Live Cases By Country</TableCaption>
            <Thead>
              <Tr>
                <Th fontWeight='800'>Country</Th>

                <Th
                  /* isNumeric */ fontWeight='800'
                  color={casesTypeColors['cases'].hex}
                >
                  Live - Cases
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((country) => (
                <Tr key={country.name}>
                  <Td color='#1D4044' fontWeight='500'>
                    {country.name}
                  </Td>
                  <Td color='#1D4044' fontWeight='700'>
                    {numeral(country.cases).format('0,0')}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>

        {/* <Flex bg={bg}> */}
        <LineGraph casesType={casesType} />
        {/* </Flex> */}
      </Flex>
      {/* </Center> */}
    </Flex>
  );
}

export default App;
{
}
{
  /* <ColorModeSwitch /> */
}
