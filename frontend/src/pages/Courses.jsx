import DisplayCourse from "../components/coursescomponents/Course.jsx"

export default function Courses(){
    return(
        <div className="font-display flex items-center py-2  flex-col bg-gray-800 min-h-screen w-full text-white overflow-x-hidden">
            <div className="flex justify-center items-center p-2 rounded-md font-bold hover:border-amber-300">
                <button className="w-22 h-auto px-2 mx-1 hover:border-amber-50 rounded-md border-2 text-amber-300">Courses</button>
                <button className="w-30 h-auto px-2 mx-1 hover:border-amber-50 rounded-md border-2 text-amber-300">My Courses</button>
            </div>
            <div className="border-2 my-10 mx-30">
                <div>
                    <DisplayCourse />
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}