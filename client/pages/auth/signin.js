import Link from "next/link"
import Header from "../../components/Form/Header"
import Login from "../../components/Form/Login"

const Signin = ({...props}) => {


    return (
        <div className="bg-[#f98b88] w-screen h-screen flex items-center justify-center">
            <div className="bg-white rounded-[15px] max-w-md w-full space-y-8 py-8 px-8">
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            <Login/>
            </div>
        </div>
    )
}


export default Signin



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
            user: null
        }
    }
}

