import { PassengersItem } from "./PassengersItem";
import { AddPassengers } from "./AddPassengers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PassengersBlock = ({count, setCount, handleDelete}) => {
    const { passengers } = useSelector(state => state.passengers)
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/fe-diplom/payment/')
    }
    let valid = passengers.length === count.length ? true : false 
    console.log(valid)
    return (
        <>
            <section className="passengers-block">
                { count.map((item) => (
                    <PassengersItem key={item} id={item} handleDelete={handleDelete} passengers={passengers} count={count.length}/>
                ))
                }
                <AddPassengers count={count} setCount={setCount}/>
                <button className="btn passengers-block-next" onClick={handleClick} disabled={ valid ? false : true }>Далее</button>
            </section>
        </>
    )
}