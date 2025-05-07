import { URL_LIVELLO, URL_PRESSIONE, URL_SOLE, URL_UMIDITA, URL_VENTO } from "../../apis/api";
import Header from "../../components/header/headerComponent";
import MenuSX from "../../components/menusx/menusxComponent";
import SingleGraph from "../../components/singleGraph/singleGraphComponent";

export default function Graph() {
    const apisWithName = [
        [URL_LIVELLO, "Livello Idrico"], 
        [URL_VENTO, "Livello del vento"],
        [URL_PRESSIONE, "Livello di pressione"],
        [URL_UMIDITA, "Livello di umidità"],
        [URL_SOLE, "Livello di sole"]
    ]

    function formatLink(url){
        let pieces = url.split(' ');
        return pieces[0] + '%20' + pieces[1]
    }

    setInterval(() => {
        window.location.reload();
    }, 300000) 

    return(
        <section>
            <Header></Header>
            <div className="grid grid-cols-6">
                <MenuSX list={apisWithName}></MenuSX>
                <div className="col-span-12">
                    {apisWithName.map(api => 
                        <div className="" id={formatLink(api[1])}>
                            <h1 className="text-center text-4xl my-5">{api[1]}</h1>
                            <SingleGraph URL={api}></SingleGraph>
                        </div>
                    )}
                </div>
            </div>
            
        </section>
    )
}