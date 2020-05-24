import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Table, Row, Col, Input } from 'antd';
import Create from './Create';
import PropTypes from 'prop-types';

const { Search } = Input;

export const TableList = forwardRef(({ columns, apiServices, inputVariables, searchColumn }, ref) => {
    const [fullData, setFullData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);

        try {
            const result = await apiServices.queryProducts();
            Promise.all([result]).then(() => { setFullData(result), setFilteredData(result) });

        } catch (error) {
            setIsError(true);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useImperativeHandle(ref, () => ({ fetchData }));

    return (
        <div>
            <Row>
                <Col span={12}>
                    <Create inputVariables={inputVariables} apiServices={apiServices} refreshTableList={fetchData} />
                </Col>
                <Col span={12}>
                    <div style={{ textAlign: 'right' }}>
                      <Search
                          placeholder="Search"
                          onSearch={value => {
                              const filteredData = fullData.filter(entry =>
                                  ((entry[searchColumn]).toLowerCase()).includes(value.toLowerCase())
                              );
                              setFilteredData(filteredData);
                          }}
                          style={{ height: 32, width: 200, margin: "0 0 14px 0" }}
                        />
                    </div>
                </Col>
            </Row>
            {isError && <div>Something went wrong ...</div>}
            <Table
                columns={columns}
                dataSource={filteredData}
                loading={isLoading}
            />
        </div>
    );
});

TableList.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired
        })
    ).isRequired,
    apiServices: PropTypes.object.isRequired,
    inputVariables: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(['text', 'number', 'dropdown', 'textarea']),
            name: PropTypes.string,
            label: PropTypes.string,
        })
    ).isRequired,
    searchColumn: PropTypes.string.isRequired
}
