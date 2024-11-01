import { BlogsType } from "../types";

interface BlogsLayoutProps {
    blog: BlogsType
}

const publishedDate: string = "24 August 2024";

export default function BlogsLayout({ blog }: BlogsLayoutProps) {
    return (
        <main className="grid grid-cols-12 pt-32 w-full px-28 h-full">
            <article className="col-span-8">
                <header className="text-5xl font-extrabold lg:text-5xl">
                    {blog ? blog.title : "No content available"}
                </header>
                <section className="text-md text-slate-400 pt-3">
                    Posted on {publishedDate}
                </section>
                <main className="text-lg pt-6">
                    {blog ? blog.content : "No content available"}
                </main>
            </article>

            <article className="col-span-4 flex flex-col">
                <header className="font-semibold text-lg text-slate-700 m-5">
                    Author
                </header>
                <main className="flex">
                    <section className="h-7 w-7 bg-slate-400 rounded-2xl m-5">
                    </section>

                    <section>
                        <div className="text-2xl font-bold">{blog.author.name ? blog.author.name : "Anonymous"}</div>
                        <div className="text-slate-400 text-lg font-semibold">hi</div>
                    </section>
                </main>
            </article>
        </main>
    );
}
