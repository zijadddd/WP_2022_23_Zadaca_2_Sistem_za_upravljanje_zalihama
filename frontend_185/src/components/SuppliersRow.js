const SuppliersRow = ({ supplier }) => {
    return (
        <tr>
            <th scope="row">{supplier.id}</th>
            <td>{supplier.name}</td>
            <td>{supplier.uid}</td>
            <td>{supplier.vat}</td>
            <td>{supplier.phoneNumber}</td>
            <td>{supplier.contactPerson}</td>
            <td>{supplier.emailAddress}</td>
            <td>{supplier.startDate}</td>
            <td>{supplier.endDate}</td>
        </tr>
    );
};

export default SuppliersRow;
