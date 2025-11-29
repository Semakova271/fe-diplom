
import icon from '../img/Group_2.2.svg';
import ruble from '../img/ruble.svg';

export const LastTickets = ({lastRoutes}) => {


    return (
        <>
            <div className="last-tickets">
                <h2 className="last-tickets-title">Последние билеты</h2>
                { lastRoutes.map((route) => (
                     <div className="last-ticket" key={route.departure._id}>
                     <div className="last-ticket-point">
                         <div className="depature-point">
                             <span className="depature-city">{route.departure.from.city.name}</span>
                             <p className="depature-railway">{route.departure.from.railway_station_name} вокзал</p>
                         </div>
                         <div className="arrival-point">
                             <span className="arrival-city">{route.departure.to.city.name}</span>
                             <p className="arrival-railway">{route.departure.to.railway_station_name} вокзал</p>
                         </div>
                     </div>
                     <img className='last-ticket-icon' src={icon}/>
                     <div className='last-ticket-price'>
                         от
                         <p className='last-ticket-cost'>{route.min_price}</p>
                         <img className='last-ticket-ruble' src={ruble}/>
                     </div>
                 </div>
                ))
               }
                
            </div>
        </>
    )
}