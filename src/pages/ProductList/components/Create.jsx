import React, { useState } from 'react';
import { Drawer, Form, Button, Input, Select, InputNumber, message } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
};

export default function Create({ inputVariables, apiServices, refreshTableList }) {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const onFinish = async values => {
        const hide = message.loading('Adding new product...');
        try {
            let response = await apiServices.addProduct(values);
            hide();
            if (response.isSuccess) {
                message.success('Product has been added successfully');
                onClose();
                form.resetFields();
                refreshTableList();
            } else {
                message.error(response.message);
            }
        } catch (error) {
            hide();
            message.error('Error while adding product');
            console.error(error);
        }
    };
    return (
        <>
            <Button style={{ borderColor: "blue", color: "blue", margin: "0 0 14px 14px" }} onClick={() => showDrawer()}>Add</Button>
            <Drawer
                title="Add New"
                width={480}
                onClose={() => onClose()}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form {...layout} form={form} onFinish={onFinish}>
                    {inputVariables.map((inputVariable, index) => {
                        switch (inputVariable.type) {
                            case "text":
                                return <Form.Item
                                    key={index}
                                    name={inputVariable.name}
                                    label={inputVariable.label}
                                    rules={inputVariable.rules}
                                >
                                    <Input placeholder={inputVariable.placeholder}/>
                                </Form.Item>
                            case "number":
                                return <Form.Item
                                    key={index}
                                    name={inputVariable.name}
                                    label={inputVariable.label}
                                    rules={inputVariable.rules}
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
                                >
                                    <Select placeholder={inputVariable.placeholder}>
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

Create.propTypes = {
    inputVariables: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(['text', 'number', 'dropdown', 'textarea']),
            name: PropTypes.string,
            label: PropTypes.string,
        })
    ).isRequired,
    apiServices: PropTypes.object.isRequired,
    refreshTableList: PropTypes.func.isRequired
}
