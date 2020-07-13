import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import styles from './Welcome.less';

const CodePreview: React.FC<{}> = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default (): React.ReactNode => (
  <PageHeaderWrapper>
    <Card>
      <Alert
        message="im-fe-admin 现已发布"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
      <Typography.Text>基于 Ant Design Pro 开发</Typography.Text>
      <CodePreview> yarn </CodePreview>
      <CodePreview> yarn dev</CodePreview>
      <Typography.Text strong>
        请谨慎使用管理端，避免造成影响，可以新建角色和权限进行配置
      </Typography.Text>
    </Card>
  </PageHeaderWrapper>
);
