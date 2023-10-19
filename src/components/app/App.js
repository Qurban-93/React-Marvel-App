import { lazy , Suspense } from "react";
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import {ComicsPage , MainPage , SingleComicPage} from '../pages';

const Page404 = lazy(() => import('../pages/Page404'));


const App = () => {

    return (
            <Router>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Suspense>
                            <Routes>
                                <Route  path="/" element={<MainPage/>}/>
                                <Route  path="/comics" element = {<ComicsPage/>}/>
                                <Route path="/comics/:comicId" element={<SingleComicPage />}/>
                                <Route path="*" element = { <Page404 />}/>
                            </Routes>
                        </Suspense>
                    </main>
                </div>
            </Router>
    )    

}

export default App;