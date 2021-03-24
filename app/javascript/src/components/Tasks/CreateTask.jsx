import React, { useState, useEffect } from "react";
import PageLoader from "components/PageLoader";
import usersApi from "apis/users";
import Container from "components/Container";
import TaskForm from "components/Tasks/Form/TaskForm";
import tasksApi from "apis/tasks";

const CreateTask = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await tasksApi.create({ task: { title, user_id: userId } });
      history.push("/dashboard");
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await usersApi.list();
      setUsers(response.data.users);
      setUserId(response.data.users[0].id);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <TaskForm
        setTitle={setTitle}
        setUserId={setUserId}
        assignedUser={users[0]}
        loading={loading}
        handleSubmit={handleSubmit}
        users={users}
      />
    </Container>
  );
};

export default CreateTask;
