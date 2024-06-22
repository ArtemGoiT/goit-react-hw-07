import {
  combineSlices,
  createSelector,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addContact, deleteContact, fetchContacts } from "./contactsOps";
import { produce } from "immer";
import { selectNameFilter } from "./filtersSlice";

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    isError: false,
  },
};

export const contactsSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        return produce(state, (draftState) => {
          draftState.contacts.items = payload;
        });
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        return produce(state, (draftState) => {
          draftState.contacts.items.push(payload);
        });
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        return produce(state, (draftState) => {
          draftState.contacts.items = draftState.contacts.items.filter(
            (items) => items.id !== payload.id
          );
        });
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending
        ),
        (state) => {
          return produce(state, (draftState) => {
            draftState.contacts.isLoading = true;
            draftState.contacts.error = false;
          });
        }
      )

      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected
        ),
        (state) => {
          return produce(state, (draftState) => {
            draftState.contacts.isLoading = false;
            draftState.contacts.error = true;
          });
        }
      );
  },
});

export const { selectContacts, selectIsLoading, selectIsError } =
  contactsSlice.selectors;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (items, { name }) =>
    items.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))
);
export const contactsReducer = combineSlices.reducers;
