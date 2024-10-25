const quote: string = '"Fullstack Medium like blogsite with CRUD features."';
const author: string = "Nishanth";
const designation: string = "Creator.";

export default function Quote() {
    return (
        <main className="bg-slate-200 h-screen flex flex-col justify-center max-w-full p-16 invisible md:visible">
            <article className="text-3xl font-bold">{quote}</article>
            <section className="ml-1 mt-4">
                <article className="text-xl font-semibold">{author}</article>
                <article className="text-sm text-slate-600">{designation}</article>
            </section>
        </main>
    );
}
