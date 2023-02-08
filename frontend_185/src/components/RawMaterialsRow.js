const RawMaterialsRow = ({ rawMaterial }) => {
    return (
        <tr>
            <th scope="row">{rawMaterial.id}</th>
            <td>{rawMaterial.name}</td>
            <td>{rawMaterial.minAmount}</td>
            <td>{rawMaterial.price}</td>
            <td>{rawMaterial.unitOfMeasurement}</td>
            <td>{rawMaterial.usable}</td>
            <td>{rawMaterial.supplierId}</td>
        </tr>
    );
};

export default RawMaterialsRow;
