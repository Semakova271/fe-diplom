import reviews_1 from '../img/image-reviews_1.png';
import reviews_2 from '../img/image-reviews_2.png'


export const Reviews = () => {

    return(
        <>
            <section className="reviews" id='reviews'>
                <h2 className="reviews-title">Отзывы</h2>
                <div className="reviews-list">
                    <div className="reviews-item">
                        <img className="reviews-img" src={reviews_1}/>
                        <div className="review">
                            <h3 className="review-title">Екатерина Вальнова </h3>
                            <p className="review-text">
                                "Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет,
                                даже если вы заказываете онлайн билет впервые."
                            </p>
                        </div>
                    </div>
                    <div className="reviews-item">
                        <img className="reviews-img" src={reviews_2}/>
                        <div className="review">
                            <h3 className="review-title">Евгений Стрыкало</h3>
                            <p className="review-text">
                                "СМС-сопровождение до посадки 
                                Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке."
                            </p>
                        </div>
                    </div>
                    
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="140" height="19" viewBox="0 0 140 19" fill="none" className='carousel'>
                    <ellipse cx="9.66851" cy="9.5" rx="9.66851" ry="9.5" fill="#C4C4C4"/>
                    <ellipse cx="39.8343" cy="9.5" rx="9.66851" ry="9.5" fill="#E5E5E5"/>
                    <ellipse cx="70" cy="9.5" rx="9.66851" ry="9.5" fill="#E5E5E5"/>
                    <ellipse cx="100.166" cy="9.5" rx="9.66851" ry="9.5" fill="#E5E5E5"/>
                    <ellipse cx="130.331" cy="9.5" rx="9.66851" ry="9.5" fill="#E5E5E5"/>
                </svg>
            </section>
        </>
    )
}