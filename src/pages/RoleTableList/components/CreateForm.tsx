import React from 'react';
import { Modal, Checkbox, Form, Input, message } from 'antd';
import { createRoles } from '../service';

interface CreateFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  rights: Array<any>;
}

const { TextArea } = Input;

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { onCancel, visible, rights, onSubmit } = props;

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  const handleFinish = (values: { [key: string]: any }) => {
    createRoles({
      name: values.name,
      keyName: values.keyName,
      desc: values.desc,
      rightIds: values.rightIds,
    })
      .then(() => {
        onSubmit();
      })
      .catch((data) => {
        message.error(data.errorMessage);
      });
  };

  const formLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  };

  const options = rights.map((right) => {
    return {
      label: right.name,
      value: right.id,
    };
  });

  return (
    <Modal getContainer={false} title="新建角色" visible={visible} width={640} {...modalFooter}>
      {props.children}
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
    </Modal>
  );
};

export default CreateForm;
