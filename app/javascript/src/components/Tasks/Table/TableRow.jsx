import React from "react";
import PropTypes from "prop-types";

const TableRow = ({ data, destroyTask, updateTask, showTask }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map(rowData => (
        <tr key={rowData.title}>
          <td className="px-6 py-4 text-sm font-medium leading-5 text-bb-gray whitespace-no-wrap">
            {rowData.title}
          </td>
          <td className="px-6 py-4 text-sm font-medium leading-5 text-bb-gray whitespace-no-wrap">
            {rowData.user_id}
          </td>
          <td className="px-6 py-4 text-sm font-medium leading-5 text-right cursor-pointer">
            <a className="text-bb-purple" onClick={() => showTask(rowData.id)}>
              Show
            </a>
          </td>
          <td className="px-6 py-4 text-sm font-medium leading-5 text-right cursor-pointer">
            <a
              className="text-indigo-600 hover:text-indigo-900"
              onClick={() => updateTask(rowData.id)}
            >
              Edit
            </a>
          </td>
          <td className="px-6 py-4 text-sm font-medium leading-5 text-right cursor-pointer">
            <a
              className="text-bb-red text-opacity-70 hover:text-opacity-100"
              onClick={() => destroyTask(rowData.id)}
            >
              Delete
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
  destroyTask: PropTypes.func,
  updateTask: PropTypes.func,
};

export default TableRow;
