import { Link } from "react-router-dom";
import { BlogCardType } from "../types";
import Avatar from "./Avatar";

export default function BlogCard({ authorName, title, content, publishedDate, id}: BlogCardType) {
    return (
        <Link to={`/blog/${id}`}>
            <article className="mx-32 p-5 border-b border-b-slate-200 flex flex-col gap-3 cursor-pointer">
                <header className="flex gap-3">
                    <div className="flex flex-col justify-center">
                        <Avatar />
                    </div>

                    <p className="text-md">{`${authorName[0].toUpperCase()}${authorName.slice(1, authorName.length + 1)}.`}</p>
                    <p className="text-gray-400">&bull;</p>
                    <p className="font-thin text-sm flex flex-col justify-center text-gray-400">{publishedDate}</p>
                </header>

                <section>
                    <header className="font-bold text-xl pb-2">{title}</header>
                    <main className="text-gray-600">{content.length > 150 ? content.slice(0, 150) + "..." : content}</main>
                </section>

                <footer className="pt-3 text-gray-400 font-thin tracking-tight text-sm">
                    {Math.ceil(content.length / 100) + " min read"}
                </footer>
            </article>
        </Link>
    );
}
