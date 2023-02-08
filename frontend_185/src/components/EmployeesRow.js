const EmployeesRow = ({ employee }) => {
    return (
        <tr>
            <th scope="row">{employee.id}</th>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.phoneNumber}</td>
            <td>{employee.address}</td>
            <td>{employee.emailAddress}</td>
            <td>{employee.dateOfEmployment}</td>
            <td>{employee.dateOfCancellation}</td>
        </tr>
    );
};

export default EmployeesRow;
