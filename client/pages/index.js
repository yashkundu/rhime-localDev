import {authenticate} from '../utils/authenticate'


import Feed from "../components/Feed";


const Index = ({ newsResults, randomUsersResults, ...props }) => {
    return (
        <Feed {...props}/>
    )
}

export default Index

export const getServerSideProps = async () => {

    const newsResults = await fetch(
        "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
    ).then((res) => res.json());

    // Who to follow section

    let randomUsersResults = [];

    try {
    const res = await fetch(
        "https://randomuser.me/api/?results=30&inc=name,login,picture"
    );

    randomUsersResults = await res.json();
    } catch (e) {
    randomUsersResults = [];
    }


    return {
        props: {
            newsResults,
            randomUsersResults,
            user: {userName: 'yashkundu', name: 'Yashasvi'}
        }
    }
}


