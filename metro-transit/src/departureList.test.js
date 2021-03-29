import React from 'react';
import { render, cleanup, fireEvent, getByTestId, queryByAttribute } from '@testing-library/react';
import { DepartureList } from './Components/departureList';


afterEach(cleanup);

const departureListStops = [
    {
      "stop_id": 56028,
      "latitude": 44.950663,
      "longitude": -93.097492,
      "description": "10th St Station"
    }
  ];
const departureData = [
    {
        "actual": true,
        "trip_id": "18469104-MAR21-RAIL-Sunday-01",
        "stop_id": 56028,
        "departure_text": "6 Min",
        "departure_time": 1616961360,
        "description": "to Mpls-Target Field",
        "route_id": "902",
        "route_short_name": "Green",
        "direction_id": 1,
        "direction_text": "WB",
        "schedule_relationship": "Scheduled"
    },
    {
        "actual": false,
        "trip_id": "18469105-MAR21-RAIL-Sunday-01",
        "stop_id": 56028,
        "departure_text": "3:06",
        "departure_time": 1616961960,
        "description": "to Mpls-Target Field",
        "route_id": "902",
        "route_short_name": "Green",
        "direction_id": 1,
        "direction_text": "WB",
        "schedule_relationship": "Scheduled"
    },
    {
        "actual": false,
        "trip_id": "18469106-MAR21-RAIL-Sunday-01",
        "stop_id": 56028,
        "departure_text": "3:16",
        "departure_time": 1616962560,
        "description": "to Mpls-Target Field",
        "route_id": "902",
        "route_short_name": "Green",
        "direction_id": 1,
        "direction_text": "WB",
        "schedule_relationship": "Scheduled"
    },
    {
        "actual": false,
        "trip_id": "18469108-MAR21-RAIL-Sunday-01",
        "stop_id": 56028,
        "departure_text": "3:26",
        "departure_time": 1616963160,
        "description": "to Mpls-Target Field",
        "route_id": "902",
        "route_short_name": "Green",
        "direction_id": 1,
        "direction_text": "WB",
        "schedule_relationship": "Scheduled"
    }
];

test('renders No results message if no stops and departure list', () => {
    const { getByText } = render(<DepartureList />);
    const noResults = getByText(/We are unable to get the desired direction for your select, Kindly try chaning the option for the route, direction and stop/i);
    expect(noResults).toBeInTheDocument();
});

test('render the stop number', () => {
    const { getByText } = render(<DepartureList departureList = {departureData} stops={departureListStops}/>);
    const stopNumber = getByText(/56028/i);
    expect(stopNumber).toBeInTheDocument();
});

test('Check the button icon change when click on minus icon depture', () => {
    const { getByTestId } = render(<DepartureList departureList = {departureData} stops={departureListStops} />);
    fireEvent.click(getByTestId(/colapsed/i));
    const showMore = getByTestId(/expand/i);
    expect(showMore).toBeInTheDocument();
});




  