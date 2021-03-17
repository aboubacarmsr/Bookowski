import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, deleteUser } from '../actions/userActions'
import { Link, useHistory } from 'react-router-dom'
import Loading from '../components/Loading'

const UserList = ({ isOpen }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { users, isLoading, error } = useSelector((state) => state.userList);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { success: successDelete } = useSelector((state) => state.userDelete);

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/');
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Do you want to delete that user ?')) {
            dispatch(deleteUser(id));
        }
    }

    return (
        <div className={ isOpen ? "users-list open" : "users-list"}>
            <h2>Users</h2>
            { isLoading ? (<Loading />) : error ? ( <p className="error"> {error} </p>) : users.length === 0 ? 
            (<p>The list is empty</p>) : 
            (<div style={{ overflowX: "auto" }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}> 
                                        <td> {user._id} </td>
                                        <td> {user.name} </td>
                                        <td> {user.email} </td>
                                        <td> {user.isAdmin ? 'Admin' : ' - '} </td>
                                        <td> <Link to={`/admin/user/${user._id}/edit`}> <button> Edit </button> </Link></td>
                                        <td> <button onClick={() => deleteHandler(user._id)}> Delete </button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>)
            }
        </div>
    )
}

export default UserList
