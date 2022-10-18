import UserResults from "../components/users/UserResults"
import UserSearch from "../components/users/UserSearch"   


function Home() {
  return (
    <div>
        <h1 className="text-6xl">
          <UserSearch />
          <UserResults />
        </h1>
    </div>
  )
}

export default Home