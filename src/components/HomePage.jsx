import { About } from './About';
import { HowWorks } from './HowWorks';
import { Reviews } from './Reviews';
import { FormOrder } from './FormOrder';


export const HomePage = () => {

    return(
        <>
            <FormOrder/>
            <About/>
            <HowWorks/>
            <Reviews/>
        </>
    )
}