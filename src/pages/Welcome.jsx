import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';
import styles from './Welcome.less';

const { Paragraph, Text } = Typography;
const CardParagraph = ({ children }) => (
    <pre className={styles.pre}>
        <code>
            <Typography.Text>{children}</Typography.Text>
        </code>
    </pre>
);

export default () => (
    <PageHeaderWrapper>
        <Card title="CHEE BOON LIM"
            extra={
                <div>
                    <a href="https://www.linkedin.com/in/cheeboon-lim/">LinkedIn </a>
                    <Text>|</Text>
                    <a href="https://github.com/CheeBoonLim/"> GitHub </a>
                    <Text>|</Text>
                    <a href="http://programmingcode.net/"> Blog</a>
                </div>
            }>

            <Typography.Text strong style={{ color: '#06bda4', fontSize: '20px' }}>
                Introduction
            </Typography.Text>
            <CardParagraph>
                <Paragraph>
                    A statistic professional is seeking to make a mark in contributing to the Software industry.
                </Paragraph>
                <Paragraph>
                    Worked as a data analyst for more than five years in the market research company.
                </Paragraph>
                <Paragraph>
                    Find my enthusiasm for programming and have worked as a <Text strong>contract developer</Text> for more than 6 months.
                </Paragraph>
                <Paragraph>
                    I would like to take on challenges in any new cutting-edge technologies and be competent in software development.
                </Paragraph>
            </CardParagraph>

            <Typography.Text strong style={{ color: '#06bda4', fontSize: '20px' }}>
                Skills & Experience In
            </Typography.Text>
            <CardParagraph>
                <Text strong>WEB TECHNOLOGIES</Text>
                <ul>
                    <li>React</li>
                    <li>ASP.Net</li>
                    <li>MVC</li>
                    <li>Bootstrap 4</li>
                    <li>Semantic UI</li>
                    <li>REST</li>
                    <li>HTML5, Javascript, jQuery</li>
                </ul>
                <Text strong>.NET FRAMEWORK</Text>
                <ul>
                    <li>C#</li>
                    <li>.NET Core</li>
                    <li>LINQ</li>
                    <li>Entity Framework</li>
                    <li>Java</li>
                </ul>
                <Text strong>DATABASES</Text>
                <ul>
                    <li>Microsoft SQL Server</li>
                    <li>MongoDB</li>
                    <li>Firebird</li>
                </ul>
                <Text strong>TOOLS/LIBRARIES</Text>
                <ul>
                    <li>Visual Studio 2017</li>
                    <li>Git</li>
                    <li>Heroku</li>
                    <li>Postman</li>
                    <li>Jira</li>
                </ul>
                <Text strong>OTHERS</Text>
                <ul>
                    <li>Blockchain</li>
                    <li>Crypto-Economy</li>
                    <li>Web3</li>
                    <li>Power BI</li>
                </ul>
            </CardParagraph>
        </Card>
    </PageHeaderWrapper>
);
