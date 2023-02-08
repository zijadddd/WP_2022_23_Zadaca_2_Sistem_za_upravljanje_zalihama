import './Home';
import './css/Home.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeesRow from './components/EmployeesRow';
import RawMaterialsRow from './components/RawMaterialsRow';
import SuppliersRow from './components/SuppliersRow';

const Home = () => {
    const [employeesState, setEmployeesState] = useState([]);
    const [rawMaterialsState, setRawMaterialsState] = useState([]);
    const [suppliersState, setSuppliersState] = useState([]);

    useEffect(() => {
        fetchEmployees();
        fetchRawMaterials();
        fetchSuppliers();
    }, []);

    const fetchEmployees = () => {
        axios
            .get('http://localhost:3001/api/user/getallemployees', {
                headers: {
                    'access-token': `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
            })
            .then((response) => {
                setEmployeesState(response.data);
            });
    };

    const fetchRawMaterials = () => {
        axios
            .get('http://localhost:3001/api/rawmaterials/getallrawmaterials', {
                headers: {
                    'access-token': `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
            })
            .then((response) => {
                setRawMaterialsState(response.data);
            });
    };

    const fetchSuppliers = () => {
        axios
            .get('http://localhost:3001/api/suppliers/getallsuppliers', {
                headers: {
                    'access-token': `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
            })
            .then((response) => {
                setSuppliersState(response.data);
            });
    };

    return (
        <div className="w-50 m-auto">
            <h1 className="mt-5 text-start">Employees</h1>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First name</th>
                        <th scope="col">Last name</th>
                        <th scope="col">Phone number</th>
                        <th scope="col">Address</th>
                        <th scope="col">Email address</th>
                        <th scope="col">Date of employment</th>
                        <th scope="col">Date of cancellation</th>
                    </tr>
                </thead>
                <tbody>
                    {employeesState.map((data) => {
                        return <EmployeesRow employee={data} />;
                    })}
                </tbody>
            </table>
            <h1 className="mt-5 text-start">Raw Materials</h1>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Minimum amount</th>
                        <th scope="col">Price</th>
                        <th scope="col">Unit of measurement</th>
                        <th scope="col">Usable</th>
                        <th scope="col">Supplier id</th>
                    </tr>
                </thead>
                <tbody>
                    {rawMaterialsState.map((data) => {
                        return <RawMaterialsRow rawMaterial={data} />;
                    })}
                </tbody>
            </table>
            <h1 className="mt-5 text-start">Suppliers</h1>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">UID</th>
                        <th scope="col">VAT</th>
                        <th scope="col">Phone number</th>
                        <th scope="col">Contact person</th>
                        <th scope="col">Email address</th>
                        <th scope="col">Start date</th>
                        <th scope="col">End date</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliersState.map((data) => {
                        return <SuppliersRow supplier={data} />;
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
