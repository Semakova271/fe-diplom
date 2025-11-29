import icon_1 from '../img/Group_3.svg'
import icon_2 from '../img/Group_4.svg'
import icon_3 from '../img/Group_5.svg'

export const HowWorks = () => {
    return (
        <>
            <section className="how-works" id='howworks'>
                <h2 className='title-how-works'>Как это работает</h2>
                <button className='btn button-how-works'>Узнать больше</button>
                <ul className='how-works-list'>
                    <li className='how-works-item'>
                        <img className='how-works-icon' src={icon_1}/>
                        Удобный заказ на сайте
                    </li>
                    <li className='how-works-item'>
                        <img className='how-works-icon' src={icon_2}/>
                        Нет необходимости ехать в офис
                    </li>
                    <li className='how-works-item'>
                        <img className='how-works-icon' src={icon_3}/>
                        Огромный выбор направлений
                    </li>
                </ul>
            </section>
        </>
    )
}