import { URL_LIVELLO, URL_ONDE_LAGUNA } from "../../apis/api";
import Header from "../../components/header/headerComponent";
import MenuSX from "../../components/menusx/menusxComponent";
import SingleGraph from "../../components/singleGraph/singleGraphComponent";

export default function Graph() {
    const apisWithName = [
        [URL_LIVELLO, "Livello Idrico"], 
        [URL_ONDE_LAGUNA, "Onde Laguna"]
    ]

    return(
        <section>
            <Header></Header>
            <div className="grid grid-cols-6">
                <MenuSX list={apisWithName}></MenuSX>
                <div className="col-span-5">
                    {apisWithName.map(api => 
                        <div className="" id={api[1]}>
                            <h1 className="text-center text-4xl my-5">{api[1]}</h1>
                            <SingleGraph URL={api}></SingleGraph>
                        </div>
                    )}
                </div>
            </div>
            
        </section>
    )
}