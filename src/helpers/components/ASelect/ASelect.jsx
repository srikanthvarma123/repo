// /**
//  * Use this component for React select
//  * Component can have all React Select attributes and options
//  */
// import React from "react";
// import PropTypes from "prop-types";
// import Select from "react-select";
// const ASelect = (props) => <Select {...props} />;

// ASelect.propTypes = {
//   options: PropTypes.arrayOf(PropTypes.object), //Options should  be in the form of array of object(label and value must be present in each object)
//   onChange: PropTypes.func,
//   value: PropTypes.object,
//   isSearchable: PropTypes.bool
// };

// ASelect.defaultProps = {
//   options: [],
//   onChange: ()=>{},
//   value: {label: "", value: ""},
//   isSearchable: false
// };
// export default ASelect;

/**
 * Use this Component for  Select dropdown.
 * Component contains all react-select(CreatableSelect) attributes
 */
import { useSelector } from "react-redux";
import Select from "react-select";
import PropTypes from "prop-types";
import makeAnimated from "react-select/animated";
import { reactSelectStyles, reactSelectTheme } from "src/helpers/common_helper";
const ASelect = ({ ...props }) => {
  const darkMode = useSelector((state) => state.darkMode);
  const animatedComponents = makeAnimated();
  return (
    <Select
      components={animatedComponents}
      theme={(theme) => reactSelectTheme(theme, darkMode)}
      styles={reactSelectStyles(darkMode)}
      {...props}
    />
  );
};
ASelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object), //Options should  be in the form of array of object(label and value must be present in each object)
  onChange: PropTypes.func,
  value: PropTypes.object,
  isSearchable: PropTypes.bool,
};

ASelect.defaultProps = {
  options: [],
  onChange: () => {},
  value: { label: "", value: "" },
  isSearchable: false,
};
export default ASelect;
