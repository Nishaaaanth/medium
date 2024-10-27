const quote: string = '"Fullstack Medium like blogsite with CRUD features."';
const author: string = "Nishanth";
const designation: string = "Creator.";

export default function Quote() {
    return (
        <main className="bg-slate-200 max-w-full p-16 hidden lg:flex lg:flex-col justify-center">
            <article className="text-3xl font-bold">{quote}</article>
            <section className="ml-1 mt-4">
                <article className="text-xl font-semibold">{author}</article>
                <article className="text-semibold text-slate-500">{designation}</article>
            </section>
        </main>
    );
}
