import React, { Component } from "react";
import { APIs, NetTool } from "../../tool/NetTool";
import "../../App.scss";

/*const DiarySaveBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 320px;
  margin: 0 auto;
/!*  @media ${(props) => props.theme.tablet} {
    width: 100%;
    margin: 0 auto;
  }
  @media ${(props) => props.theme.desktop} {
    width: 100%;
    margin: 0 auto;
  }*!/
`;*/

class NeverSearch extends Component {
  state = {
    keyword: "",
    selectedMovie: null,
    searchResultArr: [],
  };

  handleChangeSearch = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClickSearch = () => {
    const keyword = this.state.keyword.trim();
    const pattern = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
    if (keyword.match(pattern)) {
      alert("특수 문자가 포함 됐어요");
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

  MovieItem = ({ searchResult }) => {
    let className = "MovieItem";
    if (this.state.selectedMovie === searchResult) {
      className += " selected";
    }
    const clickItem = () => {
      this.setState({
        selectedMovie: searchResult,
        keyword: "",
        searchResultArr: [],
      });
      console.log(searchResult);
    };

    return (
      <div className={className} onClick={clickItem}>
        <div>
          <img src={searchResult.image} alt="" />
        </div>
        <span dangerouslySetInnerHTML={{ __html: searchResult.title }} />(
        {searchResult.pubDate})<div>{searchResult.director}</div>
      </div>
    );
  };

  render() {
    const { keyword, selectedMovie, searchResultArr } = this.state;
    return (
      <div>
        <div className="movie_search">
          <input
            placeholder="작성하실 영화를 검색하세요"
            name="keyword"
            value={keyword}
            onChange={this.handleChangeSearch}
          />
          <button onClick={this.handleClickSearch}>찾기</button>
        </div>
        <div className="movie_search_result" style={{ width: "200px" }}>
          {searchResultArr.map((searchResult, index) => (
            <this.MovieItem searchResult={searchResult} key={index} />
          ))}
        </div>
        <div className="movie_selected">
          <h3>선택된 영화</h3>
          {!!selectedMovie && <this.MovieItem searchResult={selectedMovie} />}
        </div>
        <hr />
      </div>
    );
  }
}

export default NeverSearch;
