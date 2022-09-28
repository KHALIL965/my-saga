import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, addNextUsersBatch } from "../src/store/action/Action";

import "../src/style/styles.css";

const App = () => {
  const [isBottom, setIsBottom] = useState(false);

  const { users } = useSelector((state) => state);
  const { nextItemsBatch, isFetching, hasErrored, isEndOfCatalogue } = users;

  const dispatch = useDispatch();

  // Handle user scrolling the page
  function handleUserScroll() {
    // get scroll top value
    const scrollTop = document.documentElement.scrollTop;

    // get the entire height, including padding
    const scrollHeight = document.documentElement.scrollHeight;

    // check if user is near to the bottom of the body
    if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
      setIsBottom(true);
    }
  }

  // on mount
  useEffect(() => {
    window.addEventListener("scroll", handleUserScroll);
    return () => window.removeEventListener("scroll", handleUserScroll);
  }, []);

  // get users when page is loading
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // handle re-rendering when users get to the bottom of the page
  useEffect(() => {
    if (isBottom) {
      if (nextItemsBatch.length) {
        // render the next batch of pre-fetched users
        dispatch(addNextUsersBatch());
      } else {
        // fetch another batch
        dispatch(getUsers());
      }

      setIsBottom(false);
    }
  }, [isBottom, nextItemsBatch, dispatch, setIsBottom]);

  return (
    <>
      <div>
        <h1 className="page-title">Infinite Scrolling React-App</h1>
        {users.items.map((user) => (
          <div key={user.email} className="item-container">
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
            />
            <div style={{ marginLeft: "20px" }}>
              <h3>
                {user.name.first} {user.name.last}
              </h3>
              <p>
                <small>{user.login.username}</small>
                <br />
                <b>{user.email}</b>
              </p>
            </div>
          </div>
        ))}
      </div>
      {users.items.length && (
        <div className="users-listing">Showing {users.items.length} users</div>
      )}
      {!users.items.length && !isFetching ? (
        <p className="info-text">Couldn't find any users.</p>
      ) : isEndOfCatalogue ? (
        <p className="info-text">End of users catalogue.</p>
      ) : isFetching ? (
        <p className="info-text">Loading...</p>
      ) : hasErrored ? (
        <p className="info-text">
          There was an error while fetching users data.
        </p>
      ) : null}
    </>
  );
};

export default App;

