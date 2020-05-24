import React, { useState } from 'react';
import { Drawer, Form, Button, Input, Select, InputNumber, message } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
};

export default function Edit({ inputVariables, apiServices, record, refreshTableList }) {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const onFinish = async values => {
        let editedProduct = { ...record, ...values };
        const hide = message.loading('Editing product...');
        try {
            let response = await apiServices.editProduct(editedProduct);
            hide();
            if (response.isSuccess) {
                message.success('Product has been edited successfully');
                onClose();
                refreshTableList();
            } else {
                message.error(response.message);
            }
        } catch (error) {
            hide();
            message.error('Error while editing product');
            console.error(error);
        }
    };
    return (
        <>
            <Button onClick={() => showDrawer()}>Edit</Button>
            <Drawer
                title="Edit"
                width={480}
                onClose={() => onClose()}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form {...layout} onFinish={onFinish}>
                    {inputVariables.map((inputVariable, index) => {
                        switch (inputVariable.type) {
                            case "text":
                                return <Form.Item
                                    key={index}
                                    name={inputVariable.name}
                                    label={inputVariable.label}
                                    rules={inputVariable.rules}
                                    initialValue={record[inputVariable.name]}
                                >
                                    <Input placeholder={inputVariable.placeholder} />
                                </Form.Item>
                            case "number":
                                return <Form.Item
                                    key={index}
                                    name={inputVariable.name}
                                    label={inputVariable.label}
                                    rules={inputVariable.rules}
                                    initialValue={record[inputVariable.name]}
                                >
                                    <InputNumber
                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        step={inputVariable.numberDecimal}
                                    />
                                </Form.Item>
                            case "dropdown":
                                return <Form.Item
                                    key={index}
                                    name={inputVariable.name}
                                    label={inputVariable.label}
                                    rules={inputVariable.rules}
                                    initialValue={record[inputVariable.name]}
                                >
                                    <Select placeholder={inputVariable.placeholder} >
                                        {inputVariable.dropdownOptions.map((dropdownOption, index) =>
                                            <Option key={index} value={dropdownOption}>{dropdownOption}</Option>
                                        )}
                                    </Select>
                                </Form.Item>
                            case "textarea":
                                return <Form.Item
                                    key={index}
                                    name={inputVariable.name}
                                    label={inputVariable.label}
                                    rules={inputVariable.rules}
                                    initialValue={record[inputVariable.name]}
                                >
                                    <Input.TextArea placeholder={inputVariable.placeholder}/>
                                </Form.Item>
                        }
                    })}
                    <div style={{ textAlign: 'right' }} >
                        <Button onClick={() => onClose()} style={{ marginRight: 8 }}>Cancel</Button>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </div>
                </Form>
            </Drawer>
        </>
    );
};

Edit.propTypes = {
    inputVariables: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(['text', 'number', 'dropdown', 'textarea']),
            name: PropTypes.string,
            label: PropTypes.string,
        })
    ).isRequired,
    apiServices: PropTypes.object.isRequired,
    record: PropTypes.object.isRequired,
    refreshTableList: PropTypes.func.isRequired
}
