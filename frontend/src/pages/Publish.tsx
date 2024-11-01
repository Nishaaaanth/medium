import axios from "axios";
import Nav from "../components/Nav"
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Publish() {
    return (
        <main>
            <Nav avatar={"Nishanth"} />
            <Form />
        </main >
    );
}

function Form() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    return (
        <article className="pt-48 bg-gray-50 flex justify-start flex-col gap-4 h-screen">
            <header className="text-2xl font-bold mx-12 text-gray-500">Publish an Article</header>

            <input onChange={(e) => {
                setTitle(e.target.value);
            }} type="text" placeholder="Title" className="mx-12 border border-gray-200 rounded-lg px-4 py-2"></input>


            <input onChange={(e) => {
                setDescription(e.target.value);
            }} type="text" placeholder="Description..." className="mx-12 border border-gray-200 rounded-lg px-4 py-2"></input>

            <button onClick={async () => {
                const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                    title,
                    content: description,
                }, {
                    headers: {
                        Authorization: localStorage.getItem("jwt")
                    }
                })

                navigate(`/blog/${res.data.id}`);
            }} type="submit">Publish</button>
        </article>
    );
}
