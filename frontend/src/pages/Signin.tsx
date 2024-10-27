import Auth from "../components/Auth";
import Quote from "../components/Quote";
import { Type } from "../types";

export default function Signin() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
            <Auth type={Type.SIGNIN}/>
            <Quote />
        </div>
    );
}
