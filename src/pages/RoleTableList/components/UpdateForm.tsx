import React, { FC, useEffect, useState } from 'react';
import { Modal, Form, Checkbox } from 'antd';
import { updateRoles } from '../service';

interface OperationModalProps {
  visible: boolean;
  current: any;
  onSubmit: () => void;
  onCancel: () => void;
  rights: Array<any>;
}

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { visible, current, onCancel, onSubmit, rights } = props;
  const [ids, setIds] = useState<Array<string>>([]);

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  const handleSubmit = async () => {
    await updateRoles({
      id: current.id,
      rightIds: ids,
    });
    onSubmit();
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  const onChange = (checkedValues: Array<any>) => {
    setIds(checkedValues);
  };

  const options = rights.map((right) => {
    return {
      label: right.name,
      value: right.id,
    };
  });

  const defaultValue = current ? current.rights.map((item: any) => item.id) : [];

  return (
    <Modal
      getContainer={false}
      title="权限编辑"
      width={640}
      bodyStyle={{ padding: '20px' }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      <Checkbox.Group options={options} defaultValue={defaultValue} onChange={onChange} />
    </Modal>
  );
};

export default OperationModal;
