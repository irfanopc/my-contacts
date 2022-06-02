import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Favourite from "./pages/Favourite";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  
  const [contacts, setcontacts] = useState([]);
  useEffect(() => {
    const getContacts = async () => {
      const contactsFormServer = await fetchContacts();
      setcontacts(contactsFormServer);
    };

    getContacts();
  }, []);
  const formSub = async (data) => {
    const res = await fetch("http://localhost:3004/contacts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    //console.log(data);
    const newdata = await res.json();
    setcontacts([...contacts, newdata]);
  };
  // get all contact
  const fetchContacts = async () => {
    const res = await fetch("http://localhost:3004/contacts");
    const data = await res.json();

    return data;
  };

  // delete contact
  const deleteContact = async (id) => {
    const res = await fetch(`http://localhost:3004/contacts/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      let newContact = contacts.filter((singleContact) => {
        return singleContact.id !== id;
      });

      setcontacts(newContact);
    }
  };
  //get single contact
  const getCon = async (id) => {
    const res = await fetch(`http://localhost:3004/contacts/${id}`);
    const data = await res.json();

    return data;
  };

  // favourite button
  const favToggle = async (id) => {
    const singleCon = await getCon(id);

    const updTask = { ...singleCon, fav: !singleCon.fav };

    const res = await fetch(`http://localhost:3004/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });
    if (res.status === 200) {
      let updatedContact = contacts.map((singleContact) => {
        return singleContact.id === id
          ? { ...singleContact, fav: !singleContact.fav }
          : singleContact;
      });
      setcontacts(updatedContact);
    }
    };
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              formSub={formSub}
              contacts={contacts}
              deleteContact={deleteContact}
              favToggle={favToggle}
            />
          }
        />
        <Route path="/Favourite" element={<Favourite contacts={contacts}
            favToggle={favToggle}
            deleteContact={deleteContact} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
