import "./sidebar.css"
import { useEffect, useState } from "react";
import axios from "axios";
import Env from "../../config/env";


export default function Sidebar() {

    const [categorie, setCategorie] = useState([]);

    useEffect(() => {
        const fetchingCategorie = async () => {
            await axios.get(Env.url +"/api/categorie/getAll")
                .then((response) => {
                    setCategorie(response.data);
                })
        }
        fetchingCategorie()
    }, [])

    return (
        <section className="sidebar">
            <aside className="sidebarItem">
                <h1 className="sidebarTitle">ABOUT ME</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, exercitationem.</p>
            </aside>
            <aside className="sidebarItem">
                <h1 className="sidebarTitle">CATEGORIES</h1>
                <ul className="sidebarList">
                    {categorie.map((categorie) => (
                        <li className="sidebarListItem" key={categorie.id}>
                            <a href={`/?cat=${categorie.nom}`}>{categorie.nom}</a>
                        </li>
                    )
                    )}
                </ul>
            </aside>
            <aside className="sidebarItem">
                <h1 className="sidebarTitle">FOLLOW US</h1>
                <aside className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square" />
                    <i className="sidebarIcon fab fa-twitter-square" />
                </aside>
            </aside>
        </section>
    )
}
