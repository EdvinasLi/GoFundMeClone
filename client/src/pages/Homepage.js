import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import axios from "axios";
import "./homepage.css";

const Home = (props) => {
    const { id } = useParams();
    const { loggedIn } = props;
    const [posts, setPosts] = useState([]);
    const [alert, setAlert] = useState({
        message: "",
        status: "",
    });
    const [keyword, setKeyword] = useState("");
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        amount: '',
        donator: '',
    });
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
    const handleForm = (e, id) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/donation', { ...form, storyId: id })
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })

                navigate('/')
            })
            .catch(error => {
                console.log(error)
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })

                if (error.response.status === 401)
                    navigate('/login')
            })
    }

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

                                    <form onSubmit={handleSubmit}>
                                        <input type='text' placeholder="Vardas" name="donator" onChange={handleForm} />
                                        <input type='text' placeholder="Suma" name='amount' onChange={handleForm} />
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