import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import axios from "axios";
import "./homepage.css";

const Home = (props) => {
    const { loggedIn } = props;
    const [donate, setDonate] = useState({
        amount: '',
        storiesId: '',
        donator: ''

    })
    const [posts, setPosts] = useState([]);
    const [alert, setAlert] = useState({
        message: "",
        status: "",
    });
    const [keyword, setKeyword] = useState("");
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("/api/stories/").then((resp) => {
            console.log(resp.data);
            if (resp.data.message) {
                setAlert({
                    message: resp.data.message,
                    status: "danger",
                });
                return;
            }

            setPosts(resp.data);
        });
    }, [refresh]);


    const handleDonate = (e, id) => {

        e.preventDefault();
        axios.post("/api/donation", { donate, storyId: id }).then((resp) => {

            if (resp.data.message) {
                setAlert({
                    message: resp.data.message,
                    status: "danger",
                });
                return;
            }
            setAlert({
                message: resp.data.message,
                status: "success",
            });
            setRefresh(!refresh);
        });
    };
    const handleForm = (e) => {
        setDonate({
            ...donate,
            [e.target.name]: e.target.value,
        });
    };


    return (

        <div className="container">
            {alert.message && (
                <div className={"alert alert-" + alert.status}>{alert.message}</div>
            )}

            <div className="articles">
                {posts.length > 0 &&
                    posts.map((article) => {

                        return (
                            <Card sx={{ maxWidth: 345 }} className='card' key={article.id}>

                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={article.image}
                                    alt={article.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {article.content}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <p>{article.current_sum} € raised of {article.reach_sum} €</p>
                                    </Typography>


                                </CardContent>
                                <CardActions>

                                    <form onSubmit={(e) => handleDonate(e, article.id)}>
                                        <input type='text' placeholder="Vardas" name="donator" onChange={(e) => handleForm(e)} />
                                        <input type='text' placeholder="Suma" name='amount' onChange={(e) => handleForm(e)} />
                                        <button>Donate</button>
                                    </form>
                                </CardActions>
                            </Card>
                        );
                    })}
            </div>
        </div>

    );
};

export default Home;