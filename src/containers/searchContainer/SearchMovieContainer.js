import React, { Component } from "react";
import SearchWrapper from "../../component/diarySearch/SearchWrapper";
import NeverSearch from "../../component/diarySearch/NeverSearch";
import SearchDiary from "../../component/diarySearch/SearchDiary";

class SearchMovieContainer extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <SearchWrapper>
          <NeverSearch />
          <SearchDiary match={match} />
        </SearchWrapper>
      </div>
    );
  }
}

export default SearchMovieContainer;
