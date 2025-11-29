import gifTrain from '../img/loading.gif'

export const Loader = () => {

    return (
        <div className="loader-block">
            <p className='loader-text'>Идет поиск</p>
            <img src={gifTrain} alt='loading' className='loader'/>
        </div>
    )
}