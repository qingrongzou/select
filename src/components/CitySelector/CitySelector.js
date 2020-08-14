import React, { Component } from 'react';
import './CitySelector.less';

function ProvinceList(props) {
  const onclick = values => {
    props.onRef(values);
  };
  const province = props.province;
  const listItems = province.map((item, index) => (
    <li
      className={props.city.find(i => i === item.city) ? 'ac' : ''}
      key={index}
      onClick={e => onclick(item, e)}
    >
      {item.city}
    </li>
  ));
  return <ul>{listItems}</ul>;
}

export default class CitySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: [],
      show: false,
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onRef = ref => {
    if (this.props.mode === 'multiple') {
      let city = this.state.city;
      let index = this.state.city.findIndex(item => item === ref.city);
      if (index > -1) {
        city.splice(index, 1);
      } else {
        city = [...this.state.city, ref.city];
      }
      this.setState({
        city,
      });
      this.props.onModel(city);
    } else {
      this.setState({ city: [ref.city] });
      this.props.onModel(ref.city);
      this.onBlur();
    }
  };

  onFocus() {
    this.setState({ show: true });
  }

  onBlur() {
    this.setState({ show: false });
  }

  onChange() {
    return;
  }

  handleClick = e => {
    // 阻止事件冒泡
    e.stopPropagation();
  };

  render() {
    let list;
    let model;
    if (this.state.show) {
      list = (
        <div className="CitySelectorList">
          <ProvinceList
            province={this.props.province}
            onRef={this.onRef}
            city={this.state.city}
          />
        </div>
      );
      model = <div className="CitySelectorModel" onClick={this.onBlur}></div>;
    }
    return (
      <div id="CitySelector" onClick={e => this.handleClick(e)}>
        {model}
        <input
          className="CitySelectorInput"
          placeholder="请选择城市名称"
          value={this.state.city}
          onChange={this.onChange}
          onFocus={this.onFocus}
        />
        {list}
      </div>
    );
  }
}
