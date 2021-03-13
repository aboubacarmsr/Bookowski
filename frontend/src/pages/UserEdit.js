import React, { useEffect, useState } from "react";
import { getUserDetails, updateUser } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

const UserEdit = ({ isOpen }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { user, isLoading, error } = useSelector((state) => state.userDetails);
  const { isLoading: isLoadingUpdate, error: errorUpdate, success: successUpdate } = 
    useSelector((state) => state.userUpdate);

  useEffect(() => {
      if(successUpdate) {
          dispatch({ type: "USER_UPDATE_RESET" })
          history.push('/admin/userlist')
      } else {
          //Si l'utilisateur n'a pas été chargé ou si utilisateur chargé différent de l'utilisateur désiré
          if (!user.name || user._id !== id) {
            dispatch(getUserDetails(id));
          } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
          }
      }
  }, [dispatch, history, id, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: id, name, email, isAdmin }))
  };

  return (
    <div className={isOpen ? "user-edit open" : "user-edit"}>
      <div className="edit-form">
        <h3>Edit User</h3>
        {isLoadingUpdate && <p>Loading...</p>}
        {errorUpdate && <p>{errorUpdate}</p>}
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <form onSubmit={submitHandler}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="checkbox">
              <input
                type="checkbox"
                id="adminCheck"
                name="adminCheck"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <label htmlFor="adminCheck"> Is Admin </label>
            </div>
            <button type="submit">Save Changes</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserEdit;
