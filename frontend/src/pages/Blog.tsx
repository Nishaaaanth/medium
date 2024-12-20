import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { useBlog } from "../hooks";
import BlogsLayout from "../components/BlogsLayout";

export default function Blog() {
    const { id } = useParams();

    const { loading, blog } = useBlog({
        id: Number(id)
    });

    if (loading) {
        return (
            <main className="bg-gray-50 h-screen">
                <Nav avatar={"N"} />
                <section className="pt-24">
                    <Loader />
                </section>
            </main>
        );
    }

    return (
        <main className="bg-gray-50 h-screen">
            <Nav avatar={"N"} />
            {blog ? <BlogsLayout blog={blog} /> : "No content available"}
        </main>
    );
}

function Loader() {
    return (
        <main className="mx-32 pt-8 p-5">
            <div className="border-b border-blue-200 shadow rounded-md p-4">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-300 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 w-72 bg-slate-300 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-300 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
