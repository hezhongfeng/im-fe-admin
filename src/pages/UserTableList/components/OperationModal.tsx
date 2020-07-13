import React, { FC, useEffect } from 'react';
import { Modal, Checkbox, Form, message } from 'antd';
import { TableListItem } from '../data.d';
import { updateUserRoles } from '../service';

interface OperationModalProps {
  visible: boolean;
  roles: Array<any>;
  current: Partial<TableListItem> | undefined;
  onDone: () => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { visible, current, onCancel, roles, onDone } = props;
  if (current) {
    current.roleIds = current.roles ? current.roles.map((role: any) => role.id) : [];
  }

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = async (values: { [key: string]: any }) => {
    // 更新
    if (current) {
      updateUserRoles({
        id: current.id ? current.id : 0,
        roleIds: values.roleIds || [],
      }).then(() => {
        message.success('编辑成功');
        onDone();
      });
    }
  };

  const options = roles.map((role) => {
    return {
      label: role.name,
      value: role.id,
    };
  });

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  const getModalContent = () => {
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item name="roleIds" label="角色">
          <Checkbox.Group options={options} />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={`${current ? '编辑' : '添加'}角色`}
      width={640}
      bodyStyle={{ padding: '28px 0 0' }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
