import train from '../img/Group_9.svg';
import vector_there from '../img/Vector-there.svg';
import vector_back from '../img/Vector-back.svg';
import ruble from '../img/ruble.svg';
import icon from '../img/Group_2.2.svg';
import { useNavigate } from 'react-router-dom';
import { TrainCard } from './TrainCard';


export const TrainCards = ({items}) => {

    console.log(items)
    
    return (
        <>
            <div className="train-cards">
                {
                    items?.map(item => {
                        return (
                            <TrainCard key={item.departure._id} item={item}/>
                        ) 
                    })
                }
            </div>
        </>
    )
}