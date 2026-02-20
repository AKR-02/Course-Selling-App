import courseimg from "../../assets/courseimage/courseimg.png"

export default function DisplayCourse() {
    return (
        <ul className="flex flex-col gap-10 w-full px-45 py-15">
            <li className="flex items-center gap-4">
                <img className="max-w-50 w-auto h-auto rounded-md" src={courseimg} alt="" />
                <div className="flex items-start flex-col gap-9">
                    <h1 className="text-3xl">This is My Course</h1>
                    <p>Does it ever seem like certain website color schemes just get all the attention? As with every other aspect of web design, there are color schemes that tend to trend more than others. Bright colors, stark palettes, and even some mismatching schemes are elements of color that are trending.</p>
                </div>
            </li>
        </ul>
    )
}