import React , { useState }from 'react';
import '../App.css';

export function DepartureList(props) {
    const [departureCountToShow, setDepartureCountToShow] = useState(3);
    const [departureExpanded, setDepartureExpanded] = useState(false);

    const showMoreDeparture = () => {
        if(departureCountToShow === 3 ){
            setDepartureCountToShow(props.departureList.length);
            setDepartureExpanded(true);
        } else {
            setDepartureCountToShow(3);
            setDepartureExpanded(false);
        }
      }
    
    const departureList = props.departureList;
    const stops = props.stops;
    
    return (
        <div className="departure-list-panel">
            { (stops !== undefined || departureList !== undefined) ?
                <div>
                    <div className="stop-panel">
                        <h2>
                            {stops.map(stop => {
                                return (
                                <div key={stop.stop_id} className="stop-container">
                                    <div className="stop-description">{stop.description}</div>
                                    <div className="stop-id"><strong>Stop #:</strong>{stop.stop_id}</div>
                                </div>
                                )
                            })}
                        </h2>
                </div>
                {departureList.length !== 0 &&
                    <div role='list'>
                        <div className="departure-list">
                            <table className="departure-container">
                                <thead className="departure-header">
                                    <tr>
                                        <th className="route-details">Route</th>
                                        <th className="route-details">Destination</th>
                                        <th className="departure-text">Departs</th>
                                    </tr>
                                </thead>
                                {departureList.slice(0, departureCountToShow).map(departure => {
                                    return (
                                            <tbody className="departure-data">
                                                <tr className="departure-list-content" key={departure.route_id}>
                                                    <td className="route-details"><strong>{departure.route_short_name}</strong></td>
                                                    <td className="route-details">{departure.description}</td>
                                                    <td className="departure-text">{departure.actual && <span className="blink"></span>}<strong>{departure.departure_text}</strong></td>
                                                </tr> 
                                            </tbody>
                                    )
                                })}
                            </table>
                            </div>
                    </div>
                }
                    {/* show more/less departure list button */}
                    { departureList.length > 3 && 
                    <div className="button-container">
                        <button className="departure-toggle" onClick={showMoreDeparture}>
                            <span className={departureExpanded ? 'expand': 'colapsed'}></span>
                            Departures
                        </button>
                    </div>
                    }
                </div>
                :
                // Error message in case of any api service fails or wrong data passed
                <div>We are unable to get the desired direction for your select, Kindly try chaning the option for the route, direction and stop</div>
            }
        </div>
    );
}

