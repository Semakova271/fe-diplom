import vector from '../img/vector_1.svg'

export const StatusBar = ({status}) => {
   
    return(
        <>
            <div className="status-bar">
            <ul className='status-bar-items'>
                <li className={(status === 1 || status === 2 || status === 3 || status === 4) ? "status-bar-item status-bar-item-tickets status": "status-bar-item status-bar-item-tickets"}>
                    <p className="status-bar-number">1</p>
                    Билеты
                    <img src={vector} className='status-vector'/>
                </li>
                <li className={(status === 2 || status === 3 || status === 4) ? "status-bar-item status-bar-item-passengers status ": "status-bar-item status-bar-item-passengers"}>
                 
                    <p className="status-bar-number">2</p>
                    Пассажиры
                    <img src={vector} className='status-vector'/>
                </li>
                <li className={(status === 3 || status ===  4) ? "status-bar-item status-bar-item-payment status": "status-bar-item status-bar-item-payment"}>
                    <p className="status-bar-number">3</p>
                    Оплата
                    <img src={vector} className='status-vector'/>
                </li>
                <li className={status === 4 ? "status-bar-item status-bar-item-check  status" : "status-bar-item status-bar-item-check"}>
                    <p className="status-bar-number">4</p>
                    Проверка
                </li>
            </ul>
            </div>
        </>
    )
}