import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const Welcome = () => {

    const { username} = useAuth();


    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date)

    const content = (
        <section className="welcome"> 
            <p>{today}</p>

            <h1>Welcome {username}</h1>

            <p><Link to="/dash/notes">View TechNotes</Link></p>

            <p><Link to="/dash/notes/new">Add New TechNotes</Link></p>


        </section>
    )

    return content
}

export default Welcome