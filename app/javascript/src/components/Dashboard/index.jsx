import React, { useState, useEffect } from "react";
import { all, isNil, isEmpty, either } from "ramda";
const logger = require("js-logger");

import Container from "components/Container";
import ListTasks from "components/Tasks/ListTasks";
import tasksApi from "apis/tasks";
import PageLoader from "components/PageLoader";
import { setAuthHeaders } from "apis/axios";
import Table from "components/Tasks/Table";

const Dashboard = ({ history }) => {
  const [tasks, setTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setAuthHeaders();
      const response = await tasksApi.list();
      const { pending, completed } = response.data.tasks;
      setPendingTasks(pending);
      setCompletedTasks(completed);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleProgressToggle = async ({ id, progress }) => {
    try {
      await tasksApi.update({ id, payload: { task: { progress } } });
      await fetchTasks();
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const destroyTask = async id => {
    try {
      await tasksApi.destroy(id);
      await fetchTasks();
    } catch (error) {
      logger.error(error);
    }
  };

  const showTask = id => {
    history.push(`/tasks/${id}/show`);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (all(either(isNil, isEmpty), [pendingTasks, completedTasks])) {
    return (
      <Container>
        <h1 className="my-5 text-xl leading-5 text-center">
          You have not created or been assigned any tasks 🥳
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      {!either(isNil, isEmpty)(pendingTasks) && (
        <Table
          data={pendingTasks}
          destroyTask={destroyTask}
          showTask={showTask}
          handleProgressToggle={handleProgressToggle}
        />
      )}
      {!either(isNil, isEmpty)(completedTasks) && (
        <Table
          type="completed"
          data={completedTasks}
          destroyTask={destroyTask}
          handleProgressToggle={handleProgressToggle}
        />
      )}
    </Container>
  );
};

export default Dashboard;
