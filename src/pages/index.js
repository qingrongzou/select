import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import { getCitys } from '../service/api';
import styles from './index.less';
import CitySelector from '../components/CitySelector/CitySelector';

export default () => {
  const [province1, setProvince1] = useState([]);
  const [province2, setProvince2] = useState([]);

  useEffect(() => {
    getCitys({ province: '四川省' }).then(res => {
      setProvince1(res.list);
    });
    getCitys({ province: '广东省' }).then(res => {
      setProvince2(res.list);
    });
  }, []);

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onModel1 = value => {
    console.log('城市列表:', value);
  };
  const onModel2 = value => {
    console.log('城市:', value);
  };

  return (
    <div style={{ padding: 100 }}>
      <h1 className={styles.title}>Practice</h1>
      <p>
        请参照Ant
        Design的Select、Form组件相关文档，实现一个城市下拉选择组件CitySelector。
      </p>
      <ul>
        <li>要求1：CitySelector需为受控组件。</li>
        <li>
          要求2：CitySelector需从父组件接收名为province的props，根据province获取城市列表；每当province改变时，城市列表也应更新。
        </li>
        <li>要求3：CitySelector可从父组件接收props，实现其单选/多选的定制。</li>
        <li>
          要求4：CitySelector可以与Form组件一起使用，即组件的值可被Form收集并校验。
        </li>
      </ul>
      <Form
        className={styles.form}
        name="practice"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <CitySelector province={province1} onModel={onModel1} />
        <CitySelector mode="multiple" province={province2} onModel={onModel2} />
      </Form>
    </div>
  );
};
