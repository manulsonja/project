import { Container, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { connect } from "react-redux";
import { mapsearch } from "../../../actions/map";

function SearchBar({mapsearch, searchstring}) {

  return (
      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchstring}
        size="small"
        style={{ paddingLeft:'10px', paddingRight:'10px'}}
        onChange={(event) =>{mapsearch(event.target.value)}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon/>
            </InputAdornment>
          ),
        }}
      />
  );
}

const mapStateToProps = state => ({
    searchstring: state.map.searchstring,
});
export default connect(mapStateToProps, {mapsearch})(SearchBar)