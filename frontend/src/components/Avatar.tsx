export default function Avatar() {
    return (
        <div className="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg className="absolute w-7 h-7 text-gray-400 -left-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
        </div>
    );
}
