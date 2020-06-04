import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyAccount from "../../tool/MyAccount";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import "./header.scss";

class Header extends Component {
  state = {
    search: "",
  };

  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  render() {
    const { search } = this.state;
    const { isLogin } = this.props;
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <div className="header">
              <Link to="/" className="header_name">
                Fogos
              </Link>
              <form className="header_search" noValidate autoComplete="off">
                <TextField
                  id="standard-basic"
                  placeholder="영화 제목, 아이디"
                  onChange={this.handleChange}
                  value={search}
                />
                <Link className="header_search_icon" to="/DiaryDataContainer">
                  <SearchRoundedIcon />
                </Link>
              </form>
              <div className="header_menu">
                <Link className="header_write" to="/SearchMovieContainer">
                  <EditRoundedIcon />
                  <span>Write</span>
                </Link>
                {/*<Link className="header_myPage" to="/MyPageContainer">
                  <FavoriteBorderRoundedIcon />
                  <span>MyPage</span>
                </Link>*/}
                <Link className="header_login" to="/Login">
                  <AccountCircleRoundedIcon />
                  {isLogin ? MyAccount.nickname : "Login"}
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Header;
