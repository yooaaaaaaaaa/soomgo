import React, { Component } from "react";
import { NetTool, APIs } from "../../../tool/NetTool";
import { withRouter } from "react-router-dom";

const PAGE_SIZE = 10;

class DiaryList extends Component {
  state = {
    diaryArr: [],
    page: 0,
    totalPage: 0,
    totalCount: 0,
  };

  componentDidMount() {
    this.refreshDiaryArr(1);
  }

  refreshDiaryArr(page) {
    NetTool.request(APIs.filmDiaryList(page, PAGE_SIZE))
      .exec()
      .then((resultData) => {
        this.setState({
          page: page,
          totalPage: resultData.totalPage,
          totalCount: resultData.totalCount,
          diaryArr: resultData.diaryArr,
        });
      })
      .catch((error) => {
        alert(error);
      });
  }

  DiaryItem = (data) => {
    const clickedItem = () => {
      this.props.history.push("/DiaryDataContainer/" + data.dId);
    };
    return (
      <div className="diary" onClick={clickedItem}>
        <img src={data.cover} alt="" />
        <div className="diary_content">
          <span>일기 제목 : {data.title}</span>
          <span>닉네임 : {data.nickname}</span>
          <div>영화 제목 : {data.movieTitle}</div>
          <div>태그들 : {data.tags}</div>
          <div>레이팅 : {data.rating}</div>
          <div>본 날짜 : {data.watchDate}</div>
        </div>
      </div>
    );
  };

  render() {
    const { totalPage, totalCount, page, diaryArr } = this.state;
    return (
      <div>
        <h1>다이어리 리스트</h1>
        <div>
          {diaryArr.map((data, index) => (
            <this.DiaryItem data={data} key={index} />
          ))}
        </div>
        <footer>
          <div className="totalPage">
            {page} / {totalPage}
          </div>
          <div className="savePage">{totalCount}</div>
        </footer>
      </div>
    );
  }
}

export default withRouter(DiaryList);
