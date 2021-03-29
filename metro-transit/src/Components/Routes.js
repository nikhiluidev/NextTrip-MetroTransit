import React, { useState, useEffect } from "react";
import { fetchApi } from '../fetchData';
import { DepartureList } from './departureList';
import { useHistory } from 'react-router-dom';


export function Routes(props) {
	const [routeData, setRouteData] = useState([]);
    const [directions, setDirectionsData] = useState([]);
    const [stopData, setStopsData] = useState([]);
    const [departureData, setDepartureData] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState('');
    const [selectedDirection, setSelectedDirection] = useState('');
    const [selectedStop, setSelectedStop] = useState('');
    const [showDirection, setShowDirection] = useState(false);
    const [showStop, setShowStop] = useState(false);
    const [showDepartureList, setShowDepartureList] = useState(false);
    const [departureListStops, setDepartureListStops] = useState([]);
    const [stopTimer, setStopTimer] = useState(0);
    let history = useHistory();
    
    // Make API call to get updated Departure list if the route, direction and stop are selected
    const updateDepartureData = async () => {
        if(selectedRoute !== '' && selectedDirection !== '' && selectedStop !== '') {
            const query = selectedRoute+'/'+selectedDirection+'/'+selectedStop;
            await fetchApi(query).then(departureList => {setDepartureData(departureList.departures); setDepartureListStops(departureList.stops);});
        }
    };

	useEffect(() => {
        fetchApi('routes').then(routes => setRouteData(routes));
      }, []);

    useEffect(() => {
        clearInterval(stopTimer);
        setStopTimer(setInterval(() => updateDepartureData(), 60000));
    }, [selectedRoute, selectedDirection, selectedStop]);
    
    // Makes API call to get directions list in the select dropdown and append the selected route to the URL
    const handleRouteChange = (event) => {
        let value = event.target.value;
        setShowDirection(false);
        setShowStop(false);
        setDirectionsData([]);
        setDepartureData([]);
        setShowDepartureList(false);
        setSelectedRoute('');
        setSelectedDirection('');
        if (value !== 'Select route') {
            fetchApi('directions/'+value)
            .then(direction => {setDirectionsData(direction); setShowDirection(true); setSelectedRoute(value);})
        } 
    }

    // Makes API call to get stops list in the select dropdown and append the selected departure to the URL
    const handleDirectionChange = (event) => {
        let value = event.target.value;
        setShowStop(false);
        setStopsData([]);
        setSelectedDirection('');
        setSelectedStop('');
        setDepartureData([]);
        setShowDepartureList(false);
        if (value !== 'Select direction') {
            fetchApi('stops/'+selectedRoute+'/'+value)
            .then(stops => {setStopsData(stops); setSelectedDirection(value); setShowStop(true);})
        } 
    }

    // Makes API call to get departures list in the select dropdown and append the selected stop to the URL
    const handleStopChange = (event) => {
        let value = event.target.value; 
        setSelectedStop('');
        setShowDepartureList(false);
        setDepartureData([]);
        setDepartureListStops([]);
        if (value !== 'Select stop') {
            history.push(`/${selectedRoute}/${selectedDirection}/${value}`);
            fetchApi(selectedRoute+'/'+selectedDirection+'/'+value)
            .then(departureList => {setDepartureData(departureList.departures); setDepartureListStops(departureList.stops); setSelectedStop(value); setShowDepartureList(true);})
        }
    }

	return (
		<div>
            <div className="select-panel">
            {/* Display routes select dropdown if there is routes data and handle route change */}
            { routeData.length ? 
                <select data-testid="selectRoute" className="custom-select" onChange={handleRouteChange}>
                    <option>Select route</option>
                    { routeData.map(route => <option role="routeOption" key={route.route_id} value={route.route_id}>{route.route_label}</option>)}
                </select> :
                (routeData.errors && <div>We are unable to get the desired route option for you to select, Kindly try again after some time</div>) }
                {/* Display directions select dropdown if there is directions data and handle direction change */}
                { (showDirection && directions.length) &&
                <select className="custom-select" onChange={handleDirectionChange}>
                    <option>Select direction</option>
                    { directions.map(direction => <option key={direction.direction_id} value={direction.direction_id}>{direction.direction_name}</option>)}
                </select>
                }
                {/* Display stops select dropdown if there is stops data and handle stops change */}
                { (showStop && stopData.length) &&
                <select className="custom-select" onChange={handleStopChange}>
                    <option>Select stop</option>
                    { stopData.map(stop => <option key={stop.place_code} value={stop.place_code}>{stop.description}</option>)}
                </select>
                }
                {/* Display Departures list and selected stop description if the departure list data is available */}
                { showDepartureList && <DepartureList departureList = {departureData} stops={departureListStops}/> }
            </div>
        </div>
	);
}