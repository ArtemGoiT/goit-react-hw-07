// ContactList.jsx

import { useSelector } from "react-redux";
import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import {
  selectFilteredContacts,
  selectIsLoading,
} from "../../redux/contactsSlice";
import Loader from "../Loader/Loader";

export const ContactList = () => {
  const isLoading = useSelector(selectIsLoading);
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <div className={css.subCard}>
      <div className={css.listParams}>
        <h2>Check contacts list</h2>
        <p>Length: {filteredContacts.length}</p>
      </div>

      {isLoading && <Loader />}

      <ul className={css.contactsList}>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            <Contact contact={contact} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
