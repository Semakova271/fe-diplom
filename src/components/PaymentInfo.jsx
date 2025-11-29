import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setPersonalData } from "../redux/slice/passengersSlice";
import { useDispatch, useSelector } from "react-redux";


export const PaymentInfo = () => {
    const { personalData } = useSelector(state => state.passengers)
    const navigate = useNavigate();
    const [info, setInfo] = useState({
        name: personalData.name,
        surname: personalData.surname,
        secondName: personalData.secondName,
        mail: personalData.mail,
        telephone: personalData.telephone,
        payment: personalData.payment 
    })
    const [online, setOnline] = useState(false);
    const [cash, setCash] = useState(false);
    const dispatch = useDispatch();
   
    let valid = false;
    let validEmail;
    let validTelephone;
    console.log(online, cash)
    
    useEffect(() => {
        if (online === true) {
            setInfo(prevInfo => ({...prevInfo, payment: 'online'}))
        } else if (cash === true) {
            setInfo(prevInfo => ({...prevInfo, payment: 'cash'}))
        }
    },[online, cash])
    

    if (info.telephone != '') {
        let reg;
        reg = /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/
        validTelephone = reg.test(info.telephone);
    }
    
    if (info.mail != '') {
        let reg;
        reg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
        validEmail = reg.test(info.mail);
    }

    
    if ((info.name !== '' && info.secondName !== '' && info.surname !== '') && validEmail && validTelephone && (online || cash) ) {
        valid = true;
    }

    console.log(info)

    const handleClick = () => {
        console.log(info)
        dispatch(setPersonalData({data: info}))
        navigate('/fe-diplom/checkorder/')
    }

    return (
        <>
            <section className="payment-info-block">
                <div className="payment-info">
                    <div className="payment-info-personal-data-block">
                        <h3 className="payment-info-title">Персональные данные</h3>
                        <div className="payment-info-fullname-block">
                                <div className="payment-info-fullname">
                                    <label className="payment-info-fullname-label">Фамилия</label>
                                    <input type='text' value={info.surname} onChange={(e) => setInfo(prevInfo => ({...prevInfo, surname: e.target.value }))} required className="payment-info-fullname-input"/>
                                </div>
                                <div className="payment-info-fullname">
                                    <label className="payment-info-fullname-label">Имя</label>
                                    <input type='text' value={info.name} onChange={(e) => setInfo(prevInfo => ({...prevInfo, name: e.target.value }))} required className="payment-info-fullname-input"/>
                                </div>
                                <div className="payment-info-fullname">
                                    <label className="payment-info-fullname-label">Отчество</label>
                                    <input type='text' value={info.secondName} onChange={(e) => setInfo(prevInfo => ({...prevInfo, secondName: e.target.value }))} required className="payment-info-fullname-input"/>
                                </div>
                        </div>
                        <div className="payment-info-mobily">
                            <label className="payment-info-mobily-label">Контактный телефон</label>
                            <input className="payment-info-mobily-input" value={info.telephone} placeholder="+7 __ __ _ _" onChange={(e) => setInfo(prevInfo => ({...prevInfo, telephone: e.target.value }))}/>
                        </div>
                        <div className="payment-info-mail">
                            <label className="payment-info-mail-label">E-mail</label>
                            <input className="payment-info-mail-input" value={info.mail} placeholder="inbox@gmail.ru" onChange={(e) => setInfo(prevInfo => ({...prevInfo, mail: e.target.value }))}/>
                        </div>
                    </div>
                    <div className="payment-info-methods-payment-block">
                        <h3 className="payment-info-title">Способы оплаты</h3>
                        <div className="payment-info-methods-payment-online">
                            <input type="checkbox" className="payment-info-methods-payment-online-input" id='checkbox-online' value={online} onChange={() => setOnline(!online)}/>
                            <label htmlFor='checkbox-online'></label>
                            <span className="payment-info-methods-payment-online-text" style={{color: online === true ? '#FFA800' : '#928F94'}}>Онлайн</span>
                        </div>
                        <ul className="payment-info-methods-payment-online-items">
                            <li className="payment-info-methods-payment-online-item">Банковской картой</li>
                            <li className="payment-info-methods-payment-online-item">PayPal</li>
                            <li className="payment-info-methods-payment-online-item">Visa QIWI Wallet</li>
                        </ul>
                        <div className="payment-info-methods-payment-cash">
                            <input type="checkbox" className="payment-info-methods-payment-cash-input" id='checkbox-cash'  value={cash} onChange={() => setCash(!cash)}/>
                            <label htmlFor='checkbox-cash'></label>
                            <span className="payment-info-methods-payment-cash-text" style={{color: cash === true ? '#FFA800' : '#928F94'}}>Наличными</span>
                        </div>
                    </div>
                </div>
                <button className={valid === false ? "btn payment-info-btn payment-info-btn-noactive" : "btn payment-info-btn"} disabled={valid === false ? true : false} onClick={handleClick}>Купить билеты</button>
            </section>
        </>
    )
}