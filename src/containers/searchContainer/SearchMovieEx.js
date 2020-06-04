import React from "react";
import { NetTool, APIs } from "../Tool/NetTool";
import "../App.scss";

export default class DiarySave extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: "",
      selectedMovie: null,
      searchResultArr: [],
      tagsAll: [],

      diaryData: {
        title: "",
        cover: "",
        notes: "",
        rating: "",
        tags: "",
        watchDate: "",
        createdAt: "0",
        modifiedAt: "0",
      },
    };

    //다이어리 수정모드 인가?
    this.dId = props.match.params.dId;
    this.isModify = this.dId > 0;
  }

  componentDidMount() {
    //서버에서 모든 태그 종류들 가져온다.
    this.refreshTags();

    if (this.isModify) {
      //수정할 데이터를 가져온다.
      this.refreshUpdateData(this.dId);
    }
  }

  //모든 태그들 가져온다.
  refreshTags() {
    NetTool.request(APIs.filmTags)
      .exec()
      .then((resultData) => {
        console.log("가져온 태그들 데이터 ", resultData);
        this.setState({ tagsAll: resultData });
      })
      .catch((error) => {
        alert(error);
      });
  }

  //수정모드 일경우, 수정할 데이터들 가져온다.
  refreshUpdateData(dId) {
    const url = APIs.filmDiaryDetail(dId);
    NetTool.request(url)
      .exec(true)
      .then((resultData) => {
        console.log("수정할 데이터 가져오기 완료", resultData);
        this.setState({
          selectedMovie: resultData.movie,
          diaryData: resultData.diary,
        });
      })
      .catch((error) => alert(error));
  }

  onChangeText = (event) => {
    // console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  };
  onChangeDiaryData = (event) => {
    const { diaryData } = this.state;
    diaryData[event.target.name] = event.target.value;
    this.setState({ diaryData: diaryData });
  };

  // 네이버API 이용해서 영화 데이터 검색하기.
  clickSearch = () => {
    const keyword = this.state.keyword.trim();
    if (keyword.length < 2) {
      alert("검색어 너무 짧음");
      return;
    }

    NetTool.request(APIs.filmSearch)
      .appendFormData("keyword", keyword)
      .exec(true)
      .then((resultData) => {
        console.log("영화 검색 결과", resultData);
        this.setState({ searchResultArr: resultData });
      })
      .catch((error) => {
        alert(error);
      });
  };

  //네이버 영화 검색결과 아이템 하나.
  MovieItem = ({ data }) => {
    let className = "MovieItem";
    if (this.state.selectedMovie === data) {
      className += " selected";
    }
    const clickItem = () => {
      //아이템을 선택하면, 검색결과 화면 없애버리고, 선택된것만 표시해준다.
      this.setState({ selectedMovie: data, keyword: "", searchResultArr: [] });
    };

    return (
      <div className={className} onClick={clickItem}>
        <div>
          <img src={data.image} alt="" />
        </div>
        <div dangerouslySetInnerHTML={{ __html: data.title }} />
        <div>
          ({data.pubDate} - {data.director})
        </div>
      </div>
    );
  };

  // 저장하기 버튼을 눌렀을 때.
  clickSave = () => {
    const { selectedMovie, diaryData } = this.state;
    console.log(diaryData, selectedMovie);

    if (!selectedMovie) {
      alert("영화 선택 필수.");
      return;
    }

    if (diaryData.title.trim().length === 0) {
      alert("일기 제목 필수");
      return;
    }

    //TODO: 기타 등등, Validation 유효성 검사 할것.

    //영화데이터와, 일기 데이터를 JSON 형식의 문자열로 변경한다.
    const movieJson = JSON.stringify(selectedMovie);
    const diaryJson = JSON.stringify(diaryData);

    //저장한다.
    NetTool.request(APIs.filmDiarySave)
      .appendFormData("movieJson", movieJson) //필수 데이터
      .appendFormData("diaryJson", diaryJson) //필수 데이터
      .exec(true)
      .then((jsonData) => {
        alert("데이터 저장 성공");
        this.props.history.push("/diaryList");
      })
      .catch((error) => {
        alert(error);
      });
  };

  TagTypeItem = ({ tagTypeData }) => {
    const TagItem = ({ tag }) => {
      return <div className="TagItem">{tag}</div>;
    };

    return (
      <div>
        <h3>
          태그 타입 : {tagTypeData.tagType} - 태그 설명 :{" "}
          {tagTypeData.tagTypeDesc}
        </h3>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "800px",
            margin: "auto",
          }}
        >
          {tagTypeData.tags.map((tag, index) => (
            <TagItem tag={tag} key={index} />
          ))}
        </div>
      </div>
    );
  };

  render() {
    const {
      keyword,
      selectedMovie,
      searchResultArr,
      diaryData,
      tagsAll,
    } = this.state;

    return (
      <div id="DiarySave">
        <h1>{this.isModify ? "일기 수정" : "일기 새로쓰기"}</h1>

        <div>
          <h2>네이버 영화검색</h2>
          <input name="keyword" value={keyword} onChange={this.onChangeText} />
          <button onClick={this.clickSearch}>찾기</button>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {searchResultArr.map((data, index) => (
              <this.MovieItem data={data} key={index} />
            ))}
          </div>
        </div>

        <div>
          <h3>선택된 영화</h3>
          {!selectedMovie && <strong>없음</strong>}
          {!!selectedMovie && <this.MovieItem data={selectedMovie} />}
        </div>

        <hr />
        <h2>일기 데이터.</h2>
        <div>
          일기 제목 :{" "}
          <input
            name="title"
            value={diaryData.title}
            onChange={this.onChangeDiaryData}
          />
        </div>
        <div>
          커버 이미지 주소 :{" "}
          <input
            name="cover"
            value={diaryData.cover}
            placeholder="https://"
            onChange={this.onChangeDiaryData}
          />
        </div>
        <div>
          일기 내용:{" "}
          <textarea
            name="notes"
            value={diaryData.notes}
            onChange={this.onChangeDiaryData}
          ></textarea>
        </div>
        <div>
          레이팅 (별점?) :{" "}
          <input
            name="rating"
            value={diaryData.rating}
            onChange={this.onChangeDiaryData}
          />
        </div>
        <div>
          영화 본 날짜 :{" "}
          <input
            name="watchDate"
            value={diaryData.watchDate}
            onChange={this.onChangeDiaryData}
            type="date"
          />
        </div>

        <div>
          태그 :{" "}
          <input
            style={{ width: "600px" }}
            name="tags"
            value={diaryData.tags}
            onChange={this.onChangeDiaryData}
          />
        </div>

        <div>
          전체 태그 목록에서 태그를 선택하게 하고, 선택한 모든 태그를 ','로
          묶어서 저장한다.
        </div>
        <div>ex) 우울한,기쁜,차별에 맞서는,구출하는</div>

        <h2>전체 태그 목록.</h2>
        {tagsAll.map((tagTypeData, index) => (
          <this.TagTypeItem tagTypeData={tagTypeData} key={index} />
        ))}

        <button onClick={this.clickSave}>일기 저장</button>
      </div>
    );
  }
}
