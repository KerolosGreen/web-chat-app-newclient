import './Hero.css'
import { ReactComponent as SvgSmiley } from "../../Assets/undraw_join_re_w1lh.svg";
function Hero(){
    return(
        <div className='Hero'>
        <SvgSmiley style={{ width: "60%" , height:"100%"}} />
        <h2>Join Room Now To Start Chatting !</h2>
        </div>
    )
}
export default Hero