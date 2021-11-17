import React from 'react'
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useLocation } from "react-router"
import { useEffect, useState } from "react";
import axios from 'axios';
import { decryptData } from '../../config/utils';
import Env from '../../config/env';


export default function ProfilDel() {
    const location = useLocation().pathname.split("/")[4];
    const { token, username } = useContext(Context);
    const [categorieListe, setCategorieListe] = useState([]);
    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');
    const [categorie, setCategorie] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            id: location,
            titre,
            contenu
        }
        //Verifie si une caté est bien selectionnée
        await axios.put(Env.url +"/article/auteur/" + username + "/modify?categorie=" + categorie,
            newPost,
            {
                headers: { 'Authorization': decryptData(token) }
            })
        window.location.replace("/profil/")
    }

    useEffect(() => {
        const fetchingProfilArticle = async () => {
            await axios.get(Env.url +"/article/get/" + location, { headers: { 'Authorization': decryptData(token) } })
                .then((response) => {
                    setCategorie(response.data.categorie.nom);
                    setTitre(response.data.titre);
                    setContenu(response.data.contenu);
                })
        }
        fetchingProfilArticle();
    }, [])

    useEffect(() => {
        const fetchingCategorie = async () => {
            await axios.get(Env.url +"/api/categorie/getAll")
                .then((response) => {
                    setCategorieListe(response.data);
                })
        }
        fetchingCategorie()
    }, [])

    return (
        <div>
            <form action="" method="get" className="form-example" onSubmit={handleSubmit}>
                <div className="form-example">
                    <label htmlFor="name">Titre: </label>
                    <input
                        defaultValue={titre}
                        type="text"
                        name="titre"
                        className="titre"
                        onChange={e => setTitre(e.target.value)}
                        required />
                </div>

                <label className="categorie-label" htmlFor="cat-select">Catégorie</label>
                <select
                    className="categorie-form"
                    id="cat-select"
                    defaultValue={categorie}
                    onChange={e => setCategorie(e.target.value)}>
                    <option>
                        {categorie}
                    </option>
                    {
                        categorieListe.map((categorie) => (
                            <option key={categorie.id} defaultValue={categorie.nom}>{categorie.nom}</option>
                        ))
                    }
                </select>

                <div className="contenu">
                    <label
                        htmlFor="email">Contenu: </label>
                    <textarea
                        defaultValue={contenu}
                        type="text"
                        name="contenu"
                        className="input-contenu"
                        rows="15"
                        cols="50"
                        onChange={e => setContenu(e.target.value)}/>
                </div>

                <div className="form-example">
                    <input type="submit" defaultValue="Modifier" />
                </div>

            </form>



        </div>
    )
}
