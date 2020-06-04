import React, { useEffect, useState } from "react";
import { NetTool, APIs } from "../../tool/NetTool";

const DiaryData = ({ match }) => {
  const [movie, setMovie] = useState(null);
  const [diary, setDiary] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    NetTool.request(APIs.filmDiaryDetail(match.params.dId))
      .exec()
      .then((resultData) => {
        console.log(resultData);
        setMovie(resultData.movie);
        setDiary(resultData.diary);
        setUser(resultData.user);
      })
      .catch((error) => {
        alert(error);
      });
  });
  /*const clickUpdate = () => {
    props.history.push("/DiaryDataContainer/:dId" + props.match.params.dId);
  };

  const clickDelete = () => {
    if (window.confirm("삭제할까요?")) {
      NetTool.request(APIs.filmDiaryDelete)
        .appendFormData("dId", props.match.params.dId)
        .exec(true)
        .then(() => {
          alert("삭제 완료");
          props.history.replace("/");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };*/

  if (!diary) {
    return null;
  }

  return (
    <div id="DiaryData">
      <h1>다이어리 상세페이지.</h1>

      <h3>영화 데이터.</h3>
      <div>{JSON.stringify(movie)}</div>

      <h3>일기 데이터</h3>
      <div>{JSON.stringify(diary)}</div>

      <h3>글쓴이 정보</h3>
      <div>{JSON.stringify(user)}</div>

      <hr />
      <h3>수정, 삭제. (글쓴 사람만 할 수 있도록 처리할것)</h3>
      {/* <button onClick={clickUpdate}>일기 수정</button>
      <button onClick={clickDelete}>일기 삭제</button>*/}
    </div>
  );
};

export default DiaryData;

/*
import React from "react";
import { NetTool, APIs } from "../../tool/NetTool";

export default class DiaryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movie: null, diary: null, user: null };
    this.dId = this.props.match.params.dId;
  }

  componentDidMount() {
    //일기 상세 정보 가져온다.
    NetTool.request(APIs.filmDiaryDetail(this.dId))
      .exec()
      .then((resultData) => {
        this.setState({
          movie: resultData.movie,
          diary: resultData.diary,
          user: resultData.user,
        });
      })
      .catch((error) => {
        alert(error);
      });
  }

  clickUpdate = () => {
    this.props.history.push("/diarySave/" + this.dId);
  };

  clickDelete = () => {
    if (window.confirm("정말 삭제??")) {
      NetTool.request(APIs.filmDiaryDelete)
        .appendFormData("dId", this.dId)
        .exec(true)
        .then(() => {
          alert("삭제 완료");
          this.props.history.replace("/diaryList");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  render() {
    const { movie, diary, user } = this.state;

    if (!diary) {
      return null;
    }

    return (
      <div id="DiaryDetail">
        <h1>다이어리 상세페이지.</h1>

        <h3>영화 데이터.</h3>
        <div>{JSON.stringify(movie)}</div>

        <h3>일기 데이터</h3>
        <div>{JSON.stringify(diary)}</div>

        <h3>글쓴이 정보</h3>
        <div>{JSON.stringify(user)}</div>

        <hr />
        <h3>수정, 삭제. (글쓴 사람만 할 수 있도록 처리할것)</h3>
        <button onClick={this.clickUpdate}>일기 수정</button>
        <button onClick={this.clickDelete}>일기 삭제</button>
      </div>
    );
  }
}
*/
