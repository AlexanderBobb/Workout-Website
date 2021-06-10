export default function Home() {
    
    return (
        <div className="text-center">
            <h1 className="font-bold text-3xl mt-8 w-full text-gray-600">
                Workout Plan
            </h1>

            <div className="mt-20">
                <div>
                    <a href="/lifting" className="text-base font-medium underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Lifting</a>
                </div>
                <div className="mt-2">
                    <a href="/cardio" className="text-base font-medium mt-5 underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Cardio</a>
                </div>
            </div>
        </div>
    )
}