import './App.css';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import LandingPage from './screens/LandingPage/LandingPage';
import { BrowserRouter, Route } from 'react-router-dom'
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import CreateNote from './screens/CreateNote/CreateNote';
import SingleNote from './screens/SingleNote/SingleNote';
import { useState } from 'react';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

const App = () => {

  const [search, setSearch] = useState("")
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main style={{ minHeight: "93vh" }}>
        <Route path='/' component={LandingPage} exact></Route>
        <Route path='/login' component={LoginScreen} exact></Route>
        <Route path='/profile' component={ProfileScreen} exact></Route>
        <Route path='/register' component={RegisterScreen} ></Route>
        <Route path='/createnote' component={CreateNote} ></Route>
        <Route path='/note/:id' component={SingleNote} ></Route>
        <Route path='/mynotes' component={() => <MyNotes search={search} />}></Route>
      </main>
      <Footer />
    </BrowserRouter>

  )
} 

export default App;
