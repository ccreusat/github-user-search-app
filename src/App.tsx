import { SetStateAction, useEffect, useState } from "react";

import { Header } from "./components/Header/Header";
import { SearchInput } from './components/Search/SearchInput';
import { SearchResult } from './components/Search/SearchResult';
import { ButtonPWA } from "./pwa/button";

const url = "https://api.github.com/users";

const App = () => {
  const [data, setData] = useState(undefined || {});
  const [errors, setErrors] = useState(undefined || "");

  useEffect(() => {
    fetchUser("octocat");
  }, []);

  const fetchUser = async (user: string) => {
    try {
      const response = await fetch(`${url}/${user}`);
      const responseJSON = await response.json();
      const responseData = responseJSON;

      if (response.ok !== false) {
        setData(responseData);
      } else {
        setErrors(responseJSON.message);
      }
      
    } catch (error: any) {
      setErrors(error);
    }
  }

  return (
    <main className="app">
      <Header name="devfinder" />
      <SearchInput fetchUser={fetchUser} errors={errors} />
      <SearchResult data={data} />
      <ButtonPWA text="Add to home screen" />
    </main>
  )
}

export default App;
