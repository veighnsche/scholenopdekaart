import * as React from "react";
import { connect } from "react-redux";
import FilterSelection from "./FilterSelection";
import { filters } from "../../constants";
import { toggleFilter, resetFilters } from "../../actions/filters";
import FilterSelectionButtons from './FilterSelectionButtons';

class FilterSelectionContainer extends React.PureComponent {
  handleToggle = filter => {
    this.props.toggleFilter(filter)
  };

  handleResetFilters = () => {
      this.props.resetFilters();
  }
    
  render() {
    return (
      <div>
        <FilterSelection filters={filters} handleToggle={this.handleToggle} selectedFilters={this.props.selectedFilters}/>
        <FilterSelectionButtons handleResetFilters={this.handleResetFilters}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedSchools: state.selectedSchools,
  selectedFilters: state.selectedFilters
});

export default connect(
  mapStateToProps,
  {toggleFilter, resetFilters}
)(FilterSelectionContainer);
