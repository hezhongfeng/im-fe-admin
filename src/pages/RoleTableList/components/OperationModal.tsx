import React, { FC, useEffect } from 'react';
import { Modal, Checkbox, Form, Input, message } from 'antd';
import { ListItemDataType } from '../data.d';
import { updateRoles, createRoles } from '../service';

interface OperationModalProps {
  visible: boolean;
  rights: Array<any>;
  current: Partial<ListItemDataType> | undefined;
  onDone: () => void;
  onCancel: () => void;
}

const { TextArea } = Input;
const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { visible, current, onCancel, rights, onDone } = props;
  if (current) {
    current.rightIds = current.rights ? current.rights.map((right) => right.id) : [];
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
      updateRoles({
        id: current.id ? current.id : 0,
        name: values.name,
        keyName: values.keyName,
        desc: values.desc,
        rightIds: values.rightIds,
      }).then(() => {
        message.success('编辑成功');
        onDone();
      });
    } else {
      createRoles({
        name: values.name,
        keyName: values.keyName,
        desc: values.desc,
        rightIds: values.rightIds,
      })
        .then(() => {
          message.success('创建成功');
          onDone();
        })
        .catch((data) => {
          message.error(data.errorMessage);
        });
    }
  };

  const options = rights.map((right) => {
    return {
      label: right.name,
      value: right.id,
    };
  });

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  const getModalContent = () => {
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="角色名称"
          rules={[{ required: true, message: '请输入角色名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="keyName"
          label="关键字"
          rules={[{ required: true, message: '请输入关键字' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="desc"
          label="描述"
          rules={[{ message: '请输入至少五个字符的描述！', min: 5 }]}
        >
          <TextArea rows={4} placeholder="请输入至少五个字符" />
        </Form.Item>
        <Form.Item name="rightIds" label="权限">
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
