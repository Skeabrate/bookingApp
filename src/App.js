import './App.css'
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu'
import Hotels from './components/Hotels/Hotels'
import { useEffect, useState, lazy, Suspense } from 'react';
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Searchbar from './UI/Searchbar/SearchBar';
import Footer from './components/Footer/Footer';
import Layout from './components/Layout/Layout';
import ThemeButton from './UI/ThemeButton/ThemeButton';
import ThemeContext from './context/themeContext';
import AuthContext from './context/authContext';
import LoadingIcon from './UI/LoadingIcon/LoadingIcon'
import BestHotel from './components/Hotels/BestHotel/BestHotel';
import InspiringQuotes from './components/InspiringQuotes/InspiringQuotes';
import HotelNotFound from './components/HotelNotFound/HotelNotFound';
import HotelPage from './Pages/HotelPage/HotelPage';
import NotFound from './Pages/404/404'
import Login from './Pages/Auth/Login/Login';
import ErrorBoundary from './HOC/ErrorBoundary';
import Search from './Pages/Search/Search';
import AddHotel from './Pages/Profile/MyHotels/AddHotel/AddHotel';
import Register from './Pages/Auth/Register/Register';
import axios from './axiosData';
import { objectToArrayWithId } from './Helpers/objects';
import EditHotel from './Pages/Profile/MyHotels/EditHotel/EditHotel';
const  Profile = lazy(() => import('./Pages/Profile/Profile'))


function App() {
  let themeType = localStorage.getItem('theme')
  const [hotels, setHotels] = useState([])
  const [theme, setTheme] = useState('primary')
  const [token, setToken] = useState({
    isAuthenticated: JSON.parse(window.localStorage.getItem('token-data') ?? null),
  })
  const [loading, setLoading] = useState(true)
  const darkTheme = 'danger'
  const lightTheme = 'primary'

  useEffect(() => {
    if(localStorage){
      themeType = localStorage.getItem('theme')
    }
    if(themeType === lightTheme || themeType === darkTheme){
      setTheme(themeType)
    }
  }, [])

  const changeTheme = () => {
    if(themeType === darkTheme) {
      localStorage.setItem('theme', 'primary')
      themeType = lightTheme
      setTheme(themeType)
    } else {
      localStorage.setItem('theme', 'danger')
      themeType = darkTheme
      setTheme(themeType)
    }
    
  }

  const fetchHotels = async (e) => {
    
    try {
      const res = await axios.get('/hotels.json')
      const newHotel = objectToArrayWithId(res.data).filter(x => parseInt(x.status) === 1)
      
      setHotels(newHotel)

    }catch (ex) {
      console.log(ex.response)
    }

    setLoading(false)
  } 

  useEffect(() => {
    fetchHotels()
  }, [])

  const header = (
    <Header>
      <InspiringQuotes />
      <Searchbar />
      <ThemeButton />
    </Header>
  )

  const menu = (
    <Menu />
  )

  const content = (
    <>
      <Suspense fallback={<p>Ładowanie...</p>}>
        <Switch>
          <Route path="/profil/hotele/edytuj/:id">
            {token.isAuthenticated ? <EditHotel hotel={hotels}/> : <Redirect to="/zaloguj" />}
          </Route>

          <Route path="/profil/hotele/dodaj" >
            {token.isAuthenticated ? <AddHotel /> : <Redirect to="/zaloguj" />}
          </Route>

          <Route path="/wyszukaj/:term?" >
            <Search />
          </Route>

          <Route path="/hotele/:id">
            <HotelPage hotels={hotels} />
          </Route>

          <Route path="/profil">
            {token.isAuthenticated ? <Profile /> : <Redirect to="/zaloguj" />}
          </Route>

          <Route exact path="/">
            <BestHotel hotels={hotels} />
            {hotels.length > 0 ? <Hotels hotels={hotels} /> : <HotelNotFound />}
          </Route>

          <Route path="/zaloguj" component={Login}></Route>

          <Route path="/rejestracja" component={Register}></Route>

          <Route component={NotFound} />

        </Switch>
      </Suspense>
    </>
  )
    

  const footer = (
    <Footer />  
  )

  return (
    <Router>
      <AuthContext.Provider value={{
        isAuthenticated: token.isAuthenticated,
        login: (user) => { setToken({ isAuthenticated: user }) },
        logout: () => { setToken({ isAuthenticated: null }) }
      }}>
        <ThemeContext.Provider value={{
          color: theme,
          changeTheme: changeTheme,
        }}>

          <ErrorBoundary>
            <Layout
              header={header}
              menu={menu}
              content={loading ? <LoadingIcon/> : content}
              footer={footer}
            />
          </ErrorBoundary>
          
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </Router>
  )

}

export default App;
