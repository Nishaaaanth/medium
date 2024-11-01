import Auth from "../components/Auth";
import Nav from "../components/Nav";
import Quote from "../components/Quote";
import { Type } from "../types";

export default function Signup() {
    return (
        <div>
            <Nav type={Type.SIGNUP} />
            <main className="grid grid-cols-1 lg:grid-cols-2 h-screen">
                <Auth type={Type.SIGNUP} />
                <Quote />
            </main>
        </div>
    );
}
