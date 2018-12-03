import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import Slider from 'rc-slider';

// for our slider tooltip
const Handle = Slider.Handle;
const REACT_VERSION = React.version;

class Filter extends Component{

    render() {
        const handle = (props) => {
            const { value, dragging, index, ...restProps } = props;
            return (
              <Tooltip
                prefixCls="rc-slider-tooltip"
                overlay={value}
                visible={dragging}
                placement="top"
                key={index}
              >
              <Handle value={value} {...restProps} />
              </Tooltip>
            );
          };
              
        return (
            <div className="rowColumn">
                <div style= {{ marginRight: "20px" }}>Genre</div>
                <div>
                <ReactMultiSelectCheckboxes
                    style= {{ width: "300%", marginBottom: "20px", backgroundColor: "#282c34" }}
                    className="App-header"
                    onChange= {entry => { this.props.onChangeGenre( entry ) }}
                    placeholderButtonLabel="Select Genres"
                    value={this.props.selected}
                    options={this.props.options} 
                />
                </div>
                <div style= {{ marginRight: "40px" }}/>
                <div style= {{ marginRight: "20px" }}>Rating</div>
                <div>
                <Slider defaultValue={this.props.rating} min={0} max={10}
                    handle={handle}
                    style={{
                    width: 200,
                    marginTop: "15px"
                    }}
                    onChange={rating => this.props.onChangeRating({ rating })}
                />
                </div>
                <div className="react-version">React version: {REACT_VERSION}</div>

            </div>
        );
    }
  }

  export default Filter;