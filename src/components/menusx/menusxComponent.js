import { Link } from "react-router-dom";

export default function MenuSX(props){
    return(
        <section className="">
            <h2 className="pl-5 py-6 text-3xl border-r-2 text-center">Lista di grafici</h2>
            <div className="border-r-2 h-full">
                {props.list.map(elem => 
                <Link to={"/grafici/#" + elem[1]} className="py-2 pl-5 cursor-pointer hover:bg-slate-200 text-xl block">
                    {elem[1]}
                </Link>)}
            </div>
        </section>
    )
}