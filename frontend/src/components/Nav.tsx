import { Link } from "react-router-dom";
import { Type } from "../types";

export default function Nav({ type, avatar }: { type?: Type, avatar?: string }) {
    return (
        <nav className="flex justify-between py-6 px-8 fixed bg-white w-full">
            <Link to={"/blogs"} className="text-2xl font-bold font-serif">Medium</Link>
            {type === Type.SIGNIN || type === Type.SIGNUP ?
                <div>
                </div>
                :
                <div>
                    <Link to={"/publish"} className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full mr-6">Publish</Link>
                    <Avatar fill={avatar && avatar[0].toUpperCase() || ""} />
                </div>
            }
        </nav>
    );
}

function Avatar({ fill }: { fill: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{fill}</span>
        </div>
    );
}
