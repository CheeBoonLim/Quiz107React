import React, { useRef } from 'react';
import { queryProducts, addProduct, editProduct } from './service';
import { TableList } from './components/TableList';
import Edit from './components/Edit';

export default function ProductList() {
    const childRef = useRef();
    const apiServices = {
        queryProducts: queryProducts,
        addProduct: addProduct,
        editProduct: editProduct,
    };
    const inputVariables = [
        {
            type: "text",
            name: "name",
            label: "Name",
            rules: [{ required: true, message: "Name is required." }],
            placeholder: "Name"
        },
        {
            type: "number",
            name: "unitPrice",
            label: "Unit Price",
            rules: [{
                type: "number",
                required: true,
                validateMessages: {
                    required: "Unit Price is required.",
                    types: {
                        number: "Unit Price is not a validate number.",
                    },
                    number: {
                        range: "Unit Price must be 0 or greater.",
                    },
                },
                min: 0
            }],
            numberDecimal: 0.01,
        },
        {
            type: "dropdown",
            name: "type",
            label: "Type",
            rules: [{ required: true, message: "Type is required." }],
            dropdownOptions: ["Hardware", "Software"],
            placeholder: "Type"
        },
        {
            type: "textarea",
            name: "description",
            label: "Description",
            placeholder: "Description",
            rules: [{ max: 200, message: "Maximum length is 200." }],
        },
    ];
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => { return a.name.localeCompare(b.name) },
            sortDirections: ['ascend', 'descend', 'ascend'],
        },
        {
            title: 'Unit Price',
            dataIndex: 'unitPrice',
            sorter: (a, b) => a.unitPrice - b.unitPrice,
            sortDirections: ['ascend', 'descend', 'ascend'],
            render: (record) => {
                return '$ ' + record.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: (a, b) => { return a.type.localeCompare(b.type) },
            sortDirections: ['ascend', 'descend', 'ascend'],
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            ellipsis: true,
            render: (record) => (
                <Edit
                    inputVariables={inputVariables}
                    apiServices={apiServices}
                    record={record}
                    refreshTableList={childRef.current.fetchData} />
            ),
        },
    ];
    const searchColumn = "name";

    return (
        <TableList
            ref={childRef}
            columns={columns}
            apiServices={apiServices}
            inputVariables={inputVariables}
            searchColumn={searchColumn}
        />
    );
};
