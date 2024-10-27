import { Link, useNavigate } from "react-router-dom";
import { ButtonType, InputType, Type } from "../types";
import { useState } from "react";
import { Signin, Signup } from "@nishanth2696/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

const headerStyle: string = "text-3xl font-bold text-center";

export default function Auth({ type }: { type: Type }) {
    const navigate = useNavigate();

    const [postSignupInputs, setPostSignupInputs] = useState<Signup>({
        name: "",
        username: "",
        password: ""
    });
    const [postSigninInputs, setPostSigninInputs] = useState<Signin>({
        username: "",
        password: ""
    });

    async function sendRequest() {
        if (type === Type.SIGNUP) {
            try {
                const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postSignupInputs);
                const jwt = res.data;
                localStorage.setItem("jwt", jwt);
                navigate("/blog/bulk");
            } catch (err) {
                alert("Error while signing up");
            }
        } else {
            try {
                const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postSigninInputs);
                const jwt = res.data;
                localStorage.setItem("jwt", jwt);
                navigate("/blog/bulk");
            } catch (err) {
                alert("Error while signing in");
            }
        }
    }

    return (
        <div className="flex justify-center items-center bg-gray-50">
            {type == Type.SIGNUP ?
                <main>
                    <header className={headerStyle}> Create an Account</header>
                    <p className="text-slate-400 font-semibold text-center">Already have an account? <Link to={"/signin"} className="text-blue-400 underline">Login</Link></p>

                    <section className="flex flex-col items-center">
                        <Input type={type} inputType="text" placeholder="Name" onChange={(e) => {
                            setPostSignupInputs(c => ({
                                ...c,
                                name: e.target.value,
                            }));
                        }} />
                        <Input type={type} inputType="email" placeholder="Username" onChange={(e) => {
                            setPostSignupInputs(c => ({
                                ...c,
                                username: e.target.value,
                            }));
                        }} />
                        <Input type={type} inputType="password" placeholder="Password" onChange={(e) => {
                            setPostSignupInputs(c => ({
                                ...c,
                                password: e.target.value
                            }));
                        }} />
                        <Button onClick={sendRequest} type={type} />
                    </section>
                </main> :

                <main>
                    <header className={headerStyle}>Login to your Account</header>
                    <p className="text-slate-400 font-semibold mt-3 text-center">Don't have an account? <Link to={"/signup"} className="text-blue-400 underline">Register</Link></p>

                    <section className="flex flex-col items-center">
                        <Input type={type} inputType="email" placeholder="Username" onChange={(e) => {
                            setPostSigninInputs(c => ({
                                ...c,
                                username: e.target.value,
                            }));
                        }} />
                        <Input type={type} inputType="password" placeholder="Password" onChange={(e) => {
                            setPostSigninInputs(c => ({
                                ...c,
                                password: e.target.value
                            }));
                        }} />
                        <Button onClick={sendRequest} type={type} />
                    </section>
                </main>
            }
        </div>
    );
}

function Input({ placeholder, inputType, type, onChange }: InputType) {
    return (
        <main className="w-full max-w-sm min-w-[300px] m-4 mt-5">
            <section>
                <input type={inputType} className="w-full pl-3 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder={placeholder} onChange={onChange} required={inputType != "name"} />
            </section>

            <section>
                {(type == Type.SIGNIN && inputType == "password") ?
                    <div>
                        <p className="flex ms-start mt-4 text-xs text-slate-400 justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1.5">
                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                            </svg>
                            Use at least 8 characters.
                        </p>
                    </div> :
                    null
                }
            </section>
        </main >
    );
}

function Button({ type, onClick }: ButtonType) {
    return (
        <main className="flex justify-evenly mt-6">
            <button onClick={onClick} className="bg-transparent hover:bg-blue-500 text-blue-400 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                {type == Type.SIGNUP ? "Register" : "Login"}
            </button>
        </main>
    );
}
