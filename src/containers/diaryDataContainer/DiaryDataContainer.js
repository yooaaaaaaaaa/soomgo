import React, { Component } from "react";
import DiaryDataWrapper from "../../component/diaryData/DiaryDataWrapper";
import DiaryData from "../../component/diaryData/DiaryData";

class DiaryDataContainer extends Component {
  render() {
    const { match } = this.props;
    return (
      <DiaryDataWrapper>
        <DiaryData match={match} />
      </DiaryDataWrapper>
    );
  }
}

export default DiaryDataContainer;
